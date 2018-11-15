class ApplicationController < ActionController::Base
    helper_method :is_admin?

    def is_admin_or_author?(object)
      is_admin? || object.user == current_user
    end
    helper_method :is_admin_or_author?
  
    def is_admin?
      current_user.respond_to?(:admin) && current_user.admin?
    end
  
    def require_admin_or_author_for_post!
      unless is_admin_or_author?(@post)
        redirect_to_root
      end
    end
  
    def require_admin_or_author_for_thread!
      unless is_admin_or_author?(@brewery_thread)
        redirect_to_root
      end
    end
  
    private
  
    def redirect_to_root
      redirect_to root_path, alert: "Hey, you can't do that."
    end 
end
