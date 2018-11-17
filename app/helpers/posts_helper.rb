module PostsHelper
    def avatar_tag(email)
       gravatar_image_tag(email, gravatar: { size: 40 }, class: "rounded avatar")
    end
    
    def brewery_state_link(state)
       link_to state.name, brewery_state_brewery_threads_path(state)
    end

    def post_classes(post)
        klasses = ["post", "card", "mb-3"]
        klasses << "thread-author" if post.user == @brewery_thread.user
        klasses
    end
    
    def user_badge(user)
        if user.respond_to?(:admin) && user.admin?
          content_tag :span, "Admin", class: "badge badge-default"
        end
    end
end
