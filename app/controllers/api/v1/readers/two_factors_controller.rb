# app/controllers/api/v1/readers/two_factors_controller.rb
require 'twilio-ruby'

class Api::V1::Readers::TwoFactorsController < ApplicationController
  before_action :authenticate_reader!

  # === 1) Get 2FA status ===
  # GET /api/v1/readers/2fa/status
  def status
    render json: {
      status: { code: 200 },
      data: {
        two_factor_enabled: current_reader.two_factor_enabled,
        preferred_method: current_reader.preferred_2fa_method,
        phone_number: current_reader.phone_number,
        phone_verified: current_reader.phone_verified
      }
    }
  end

  # === 2) Enable 2FA via email ===
  def enable_email
    current_reader.update(
      two_factor_enabled: true,
      preferred_2fa_method: 'email'
    )

    # Generate email code
    code = generate_two_factor_code(current_reader)

    # Send code via email
    ReaderMailer.with(reader: current_reader, code: code).two_factor_code_email.deliver_later

    render json: {
      status: { code: 200, message: 'Two-factor authentication enabled via email. Code sent to email.' }
    }
  end

  # === 3) Generate a 2FA code (can be reused for email or SMS) ===
  def generate_code
    code = generate_two_factor_code(current_reader)

    if current_reader.preferred_2fa_method == 'sms' && current_reader.phone_number.present?
      send_sms(current_reader.phone_number, code)
      message = 'Verification code sent via SMS'
    else
      ReaderMailer.with(reader: current_reader, code: code).two_factor_code_email.deliver_later
      message = 'Verification code sent via email'
    end

    render json: {
      status: { code: 200, message: message }
    }
  end

  # === 4) Verify 2FA code ===
  def verify_code
    input_code = params[:code]
    if current_reader.two_factor_code == input_code && current_reader.two_factor_expires_at&.future?
      current_reader.update(two_factor_code: nil, two_factor_expires_at: nil)

      render json: {
        status: { code: 200, message: '2FA verified successfully' }
      }
    else
      render json: {
        status: { code: 422, message: 'Invalid or expired code' }
      }, status: :unprocessable_entity
    end
  end

  # === 5) Setup SMS 2FA ===
  def setup_sms
    current_reader.update(phone_number: params[:phone_number])
    code = generate_two_factor_code(current_reader)

    begin
      send_sms(current_reader.phone_number, code)
      render json: { status: { code: 200, message: 'Verification code sent via SMS' } }
    rescue StandardError => e
      render json: { status: { code: 422, message: "Failed to send SMS: #{e.message}" } }, status: :unprocessable_entity
    end
  end

  # === 6) Verify SMS code ===
  def verify_sms
    if current_reader.two_factor_code == params[:verification_code] && current_reader.two_factor_expires_at&.future?
      current_reader.update(
        phone_verified: true,
        two_factor_enabled: true,
        preferred_2fa_method: 'sms',
        two_factor_code: nil,
        two_factor_expires_at: nil
      )

      render json: {
        status: { code: 200, message: 'Phone verified and 2FA enabled' },
        data: { reader: current_reader.slice(:id, :email, :two_factor_enabled, :preferred_2fa_method, :phone_verified) }
      }
    else
      render json: { status: { code: 422, message: 'Invalid or expired code' } }, status: :unprocessable_entity
    end
  end

  # === 7) Disable 2FA ===
  def disable
    current_reader.update(two_factor_enabled: false, preferred_2fa_method: nil)
    render json: { status: { code: 200, message: 'Two-factor authentication disabled' } }
  end

  private

  # Generate 6-digit code and save expiration
  def generate_two_factor_code(reader)
    code = rand(100_000..999_999).to_s
    reader.update(two_factor_code: code, two_factor_expires_at: 10.minutes.from_now)
    code
  end

  # Send SMS via Twilio
  def send_sms(phone_number, code)
    client = Twilio::REST::Client.new(
      ENV.fetch('TWILIO_ACCOUNT_SID', nil),
      ENV.fetch('TWILIO_AUTH_TOKEN', nil)
    )
    client.messages.create(
      from: ENV.fetch('TWILIO_PHONE_NUMBER', nil),
      to: phone_number,
      body: "Your Itan verification code is: #{code}"
    )
  end
end
