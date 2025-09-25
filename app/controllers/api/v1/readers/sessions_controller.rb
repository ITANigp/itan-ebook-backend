class Api::V1::Readers::SessionsController < Devise::SessionsController
  respond_to :json
  skip_before_action :verify_signed_out_user, only: :destroy

  def create
    # Extract credentials from params
    reader_email = params.dig(:reader, :email) || params.dig(:session, :reader, :email)
    reader_password = params.dig(:reader, :password) || params.dig(:session, :reader, :password)
    
    # First check if the reader exists by email
    reader = Reader.find_by(email: reader_email)
    
    unless reader
      render json: { status: { code: 401, message: 'Invalid email or password.' } }, status: :unauthorized
      return
    end
    
    # Then authenticate with password
    unless reader.valid_password?(reader_password)
      render json: { status: { code: 401, message: 'Invalid email or password.' } }, status: :unauthorized
      return
    end
    
    self.resource = reader
    
    # Generate JWT token
    token = generate_jwt_token(resource)

    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: ReaderSerializer.new(resource).serializable_hash[:data][:attributes].merge(
        id: ReaderSerializer.new(resource).serializable_hash[:data][:id],
        token: token
      )
    }
  rescue StandardError => e
    render json: {
      status: { code: 401, message: 'Invalid email or password.' }
    }, status: :unauthorized
  end

  def destroy
    begin
      reader = current_reader
      
      if reader
        # Update the JTI to invalidate existing tokens
        new_jti = SecureRandom.uuid
        reader.update_column(:jti, new_jti)
      end
      
      # Always sign out regardless of JTI update success
      sign_out(current_reader)
      
      render json: {
        status: { code: 200, message: 'Logged out successfully.' }
      }
    rescue => e
      render json: {
        status: { code: 500, message: 'An error occurred during logout.' }
      }, status: :internal_server_error
    end
  end

  private

  def generate_jwt_token(reader)
    payload = {
      sub: reader.id,
      email: reader.email,
      jti: reader.jti,  # Include JTI in the token payload - critical for JTIMatcher strategy
      exp: 1.day.from_now.to_i,
      iat: Time.current.to_i
    }

    JWT.encode(payload, ENV.fetch('DEVISE_JWT_SECRET_KEY', nil), 'HS256')
  end
end
