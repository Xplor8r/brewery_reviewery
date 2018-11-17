module PostsHelper
   
    def brewery_state_link(state)
       link_to state.name, brewery_state_brewery_threads_path(state)
    end

end
