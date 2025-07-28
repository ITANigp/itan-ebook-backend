class Api::V1::Authors::KycController < ApplicationController
  before_action :authenticate_author!

  def update_step
    kyc_step = params[:author].try(:[], :kyc_step) || params[:kyc].try(:[], :author).try(:[], :kyc_step)
    if current_author.update(kyc_step: kyc_step)
      render json: { status: 200, kyc_step: current_author.kyc_step }
    else
      render json: { status: 422, errors: current_author.errors.full_messages }, status: :unprocessable_entity
    end
  end
end