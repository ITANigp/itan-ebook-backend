class Api::V1::Admin::ReadersController < ApplicationController
    before_action :authenticate_admin!

    def index
        page = params[:page] || 1
        per_page = params[:per_page] || 20

        @reader = Reader.order(created_at: :desc).page(page).per(per_page)        
    
        render_readers_json(@reader)        
    end

    def render_readers_json(readers, message = nil, status_code = 200)
        response = {
        status: { code: status_code }
        }
        response[:status][:message] = message if message

        # Pagination metadata
        if readers.respond_to?(:current_page)
        response[:meta] = {
            current_page: readers.current_page,
            total_pages: readers.total_pages,
            total_count: readers.total_count,
            per_page: readers.limit_value
        }
        end

        response[:data] = if readers.is_a?(Reader)
                            ReaderSerializer.new(readers).serializable_hash[:data][:attributes]
                        else
                            ReaderSerializer.new(readers).serializable_hash[:data].map { |reader| reader[:attributes] }
                        end

        render json: response
    end
end