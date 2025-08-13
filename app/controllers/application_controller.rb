class ApplicationController < ActionController::API
  protected

  # Helper method to generate appropriate file URL
  def generate_file_url(attachment, use_direct: false, reader: nil)
    return nil unless attachment&.attached?
    
    if use_direct
      # Determine expiration based on reader's access level
      expiration_time = if reader && reader.owns_book?(attachment.record)
                          24.hours  # Full day for owned books
                        elsif reader && reader.trial_active?
                          4.hours   # Trial limitation
                        else
                          2.hours   # Default fallback
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
      blob.service.url(blob.key, expires_in: expires_in, disposition: "inline")
    end
  end

  # Centralized admin authentication
  def authenticate_admin!
    unless current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end

    # Security patch: If multiple user types are in session, clear non-admin sessions
    # Only clear other sessions if we're actually in an admin context
    if current_admin && session['warden.user.reader.key'].present?
      Rails.logger.info "Clearing reader session for admin authentication"
      session.delete('warden.user.reader.key')
    end

    # DON'T clear author session if we're just checking admin auth
    # Only clear if there's actually an admin logged in AND an author
    if current_admin && session['warden.user.author.key'].present?
      Rails.logger.info "Clearing author session for admin authentication"
      session.delete('warden.user.author.key')
    end
  end

  # Centralized author authentication
  def authenticate_author!
    unless current_author
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end

  # Centralized reader authentication  
  def authenticate_reader!
    unless current_reader
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
    end
  end
end
