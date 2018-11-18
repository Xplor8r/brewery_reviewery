module PostsHelper
   
    def brewery_state_link(state)
       link_to state.name, brewery_state_brewery_threads_path(state)
    end

    def author_link(author)
        link_to author, author_brewery_threads_path(author)
    end

end
