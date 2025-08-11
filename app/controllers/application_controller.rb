class ApplicationController < ActionController::API
  protected

  # Centralized admin authentication
  def authenticate_admin!
    unless current_admin
      render json: { error: 'Unauthorized' }, status: :unauthorized
      return
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
