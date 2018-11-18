module PostsHelper
   
    def brewery_state_link(state)
       link_to state.name, brewery_state_brewery_threads_path(state)
    end

    def user_link(user)
        link_to user.name, user_path(user.id)
    end

end
