class ApplicationController < ActionController::API
  attr_reader :current_reader # This is the method to access the current reader instance variable in authenticate_reader method. This method makes current_reader globally accessible.

  protected

  # Helper method to generate appropriate file URL
  def generate_file_url(attachment, use_direct: false, reader: nil)
    return nil unless attachment&.attached?

    if use_direct
      # Determine expiration based on reader's access level
      expiration_time = if reader&.owns_book?(attachment.record)
                          24.hours # Full day for owned books
                        elsif reader&.trial_active?
                          4.hours # Trial limitation
                        else
                          2.hours # Default fallback
                        end

      # Generate presigned GET URL using AWS SDK directly
      generate_presigned_s3_url(attachment.blob, expiration_time)
    else
      # Use Active Storage redirect URL (existing behavior)
      Rails.application.routes.url_helpers.rails_blob_url(attachment, only_path: false)
    end
  rescue StandardError => e
    Rails.logger.error "Error generating file URL: #{e.message}"
    Rails.logger.error "Error backtrace: #{e.backtrace.join("\n")}"
    # Fallback to Active Storage URL
    Rails.application.routes.url_helpers.rails_blob_url(attachment, only_path: false)
  end

  private

  def generate_presigned_s3_url(blob, expires_in)
    # Get S3 client from the service
    s3_client = blob.service.instance_variable_get(:@client)&.client

    if s3_client
      # Generate presigned GET URL using AWS SDK Presigner
      require 'aws-sdk-s3'
      signer = Aws::S3::Presigner.new(client: s3_client)
      signer.presigned_url(:get_object, {
                             bucket: blob.service.bucket.name,
                             key: blob.key,
                             expires_in: expires_in.to_i,
                             response_content_disposition: "inline; filename=\"#{blob.filename}\"",
                             response_content_type: blob.content_type
                           })
    else
      # Fallback to service URL if S3 client not available
      blob.service.url(blob.key, expires_in: expires_in, disposition: 'inline')
    end
  end

  # Centralized admin authentication
  def authenticate_admin!
    return if current_admin

    render json: { error: 'Unauthorized' }, status: :unauthorized
    nil
  end

  # Centralized author authentication
  def authenticate_author!
    return if current_author

    render json: { error: 'Unauthorized' }, status: :unauthorized
    nil
  end

  # Centralized reader authentication
  def authenticate_reader!
    token = extract_token_from_request

    if token.present?
      begin
        # Use the same secret key as used for token generation
        secret = ENV.fetch('DEVISE_JWT_SECRET_KEY', nil)
        decoded_token = JWT.decode(token, secret, true, { algorithm: 'HS256' })

        # Extract token data
        reader_id = decoded_token[0]['sub']
        token_jti = decoded_token[0]['jti']
        token_email = decoded_token[0]['email']

        @current_reader = Reader.find_by(id: reader_id)

        if @current_reader.nil?
          render json: { error: 'Unauthorized' }, status: :unauthorized
          return false
        end

        # Check if the token's JTI matches the one in the database
        # This is critical for the JTIMatcher strategy to work properly
        unless token_jti.present? && @current_reader.jti.present? && token_jti == @current_reader.jti
          render json: { error: 'Token has been revoked' }, status: :unauthorized
          return false
        end

        # ADDITIONAL SECURITY CHECK: Verify email matches
        # This ensures the token belongs to the correct user
        if token_email.present? && token_email != @current_reader.email
          render json: { error: 'Authentication failed' }, status: :unauthorized
          return false
        end
      rescue JWT::DecodeError
        render json: { error: 'Invalid token' }, status: :unauthorized
        return false
      end
    else
      render json: { error: 'Authentication required' }, status: :unauthorized
      return false
    end
    true
  end

  def extract_token_from_request
    request.headers['Authorization']&.split&.last
  end
end
