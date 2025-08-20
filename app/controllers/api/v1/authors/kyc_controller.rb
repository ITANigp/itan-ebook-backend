class Api::V1::Authors::KycController < ApplicationController
  before_action :authenticate_author!

  def update_step
    author_params = params.require(:author).permit(:kyc_step, :accepted_terms)
    # Only update accepted_terms if present, otherwise keep the current value
    author_params.delete(:accepted_terms) if author_params[:accepted_terms].nil?
    if current_author.update(author_params)
      render json: { status: 200, kyc_step: current_author.kyc_step, accepted_terms: current_author.accepted_terms }
    else
      render json: { status: 422, errors: current_author.errors.full_messages }, status: :unprocessable_content
    end
  end
end