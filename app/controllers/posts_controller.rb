class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :b_thread
  before_action :b_post, only: [:edit, :update]
  before_action :require_admin_or_author_for_post!, only: [:edit, :update]


  def create
    @post = @brewery_thread.posts.new(post_params)
    @post.user_id = current_user.id

    if @post.save
      redirect_to brewery_thread_path(@brewery_thread, anchor: "post_#{@post.id}")
    else
      render template: "brewery_threads/show"
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      redirect_to brewery_thread_path(@brewery_thread)
    else
      render action: :edit
    end
  end

  private

    def b_thread
      @brewery_thread = ForumThread.friendly.find(params[:forum_thread_id])
    end

    def b_post
      if is_admin?
        @post = @brewery_thread.posts.find(params[:id])
      else
        @post = current_user.posts.find(params[:id])
      end
    end

    def post_params
      params.require(:post).permit(:body)
    end
end
