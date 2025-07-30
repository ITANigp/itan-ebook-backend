class Api::V1::Authors::KycController < ApplicationController
  before_action :authenticate_author!

  def update_step
    kyc_step = params[:author][:kyc_step]
    accepted_terms = params[:author][:accepted_terms]
    if current_author.update(kyc_step: kyc_step, accepted_terms: accepted_terms)
      render json: { status: 200, kyc_step: current_author.kyc_step, accepted_terms: current_author.accepted_terms }
    else
      render json: { status: 422, errors: current_author.errors.full_messages }, status: :unprocessable_entity
    end
  end
end