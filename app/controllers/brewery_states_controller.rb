class BreweryStatesController < ApplicationController
    before_action :b_state
    before_action :current_user
    
    def index
      @brewery_threads = BreweryThread.where(brewery_state: @brewery_state) if @brewery_state.present?
      @brewery_threads = @brewery_threads.sorted.includes(:user, :brewery_state)
      render "brewery_threads/index"
    end
  
    private
      def b_state
        @brewery_state = BreweryState.friendly.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        redirect_to brewery_threads_path
      end
end
