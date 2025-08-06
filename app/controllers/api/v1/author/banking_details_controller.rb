class Api::V1::Author::BankingDetailsController < ApplicationController
  before_action :authenticate_author!

  def show
    banking_detail = current_author.author_banking_detail

    # Find the latest batch_id for this author (if any)
    latest_batch_id = AuthorRevenue.where(author_id: current_author.id)
      .where.not(payment_batch_id: nil)
      .order(paid_at: :desc)
      .limit(1)
      .pluck(:payment_batch_id)
      .first

    render json: (banking_detail ? banking_detail.as_json.merge(batch_id: latest_batch_id) : {})
  end

  def update
    banking_detail = current_author.author_banking_detail || current_author.build_author_banking_detail

    # First update the banking details
    if banking_detail.update(banking_detail_params)
      # Always verify the account for banking details updates
      if banking_detail.verify_account!
        render json: {
          success: true,
          banking_detail: banking_detail.as_json,
          account_name: banking_detail.resolved_account_name,
          verified: true,
          message: 'Banking details updated and account verified successfully'
        }
      else
        render json: {
          success: false,
          banking_detail: banking_detail.as_json,
          verified: false,
          errors: banking_detail.errors.full_messages
        }, status: :unprocessable_entity
      end
    else
      render json: {
        success: false,
        errors: banking_detail.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def verify
    banking_detail = current_author.author_banking_detail

    unless banking_detail
      render json: { error: 'Banking details not found' }, status: :not_found
      return
    end

    if banking_detail.verify_account!
      render json: {
        success: true,
        account_name: banking_detail.resolved_account_name,
        message: 'Account verified successfully'
      }
    else
      render json: {
        success: false,
        errors: banking_detail.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def banks
    Rails.logger.info 'Fetching banks from Paystack...'
    response = PaystackService.list_banks

    if response['status'] == true && response['data'].present?
      filtered_banks = response['data'].map do |bank|
        { name: bank['name'], code: bank['code'] }
      end
      render json: { banks: filtered_banks }, status: :ok
    else
      error_message = response['message'] || 'Could not fetch banks'
      Rails.logger.error "Failed to fetch banks: #{error_message}"
      render json: {
        error: error_message,
        banks: []
      }, status: :service_unavailable
    end
  end

  # New endpoint for real-time account verification during form filling
  def verify_account_preview
    account_number = params[:account_number]
    bank_code = params[:bank_code]

    if account_number.blank? || bank_code.blank?
      render json: {
        success: false,
        error: 'Account number and bank code are required'
      }, status: :bad_request
      return
    end

    begin
      Rails.logger.info "Previewing account verification: #{account_number}, #{bank_code}"
      response = PaystackService.resolve_account(account_number, bank_code)

      if response['status'] == true
        render json: {
          success: true,
          account_name: response['data']['account_name'],
          account_number: account_number,
          bank_code: bank_code,
          message: 'Account verified successfully'
        }
      else
        error_message = response['message'] || 'Unknown error'
        render json: {
          success: false,
          error: error_message
        }, status: :unprocessable_entity
      end
    rescue StandardError => e
      Rails.logger.error "Exception during account preview: #{e.message}"
      render json: {
        success: false,
        error: "Verification service error: #{e.message}"
      }, status: :service_unavailable
    end
  end

  private

  def banking_detail_params
    params.require(:banking_detail).permit(:bank_name, :account_number, :account_name, :bank_code, :currency)
  end

  def authenticate_author!
    return if current_author

    render json: { error: 'Unauthorized' }, status: :unauthorized
    nil
  end
end
