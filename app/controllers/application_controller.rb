class ApplicationController < ActionController::Base
    helper_method :is_admin?
    helper_method :is_admin_or_author?
    protect_from_forgery with: :exception
    helper_method :current_user

    def logged_in?
      !!current_user
    end


    def is_admin_or_author?(object)
      is_admin? || object.user == current_user
    end
  
    def is_admin?
      current_user.respond_to?(:admin) && current_user.admin?
    end
  
    def require_admin_or_author_for_post!
      unless is_admin_or_author?(@post)
        please_log_in
      end
    end
  
    def require_admin_or_author_for_thread!
      unless is_admin_or_author?(@brewery_thread)
        please_log_in
      end
    end

    private
      def please_log_in
        if !logged_in?
          redirect_to root_path
        end
      end

      def current_user
        if session[:user_id]
          @current_user ||= User.find(session[:user_id])
        end
      end
  
      def redirect_to_root
        flash[:message] = "Hey, you can't do that!"
        redirect_to root_path 
      end 
end
