module PostsHelper
    def avatar_tag(email)
       gravatar_image_tag(email, gravatar: { size: 40 }, class: "rounded avatar")
    end
    
    def brewery_state_link(state)
       link_to state.name, brewery_state_brewery_threads_path(state)
    end
end
