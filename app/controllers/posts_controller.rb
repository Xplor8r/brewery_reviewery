class PostsController < ApplicationController
  before_action :current_user
  before_action :b_thread
  before_action :b_post, only: [:edit, :update]
  before_action :require_admin_or_author_for_post!, only: [:edit, :update]


  def create
    @post = @brewery_thread.posts.new(post_params)
    @post.user_id = current_user.id
    if @post.save
      flash[:message] = "Post Created Successfully!"
      respond_to do |format|
        format.html {redirect_to brewery_thread_path(@brewery_thread, anchor: "post_#{@post.id}")}
        format.json {render json: @post}
      end
    else
      render template: "brewery_threads/show"
    end
  end

  def edit
  end

  def update
    if @post.update(post_params)
      flash[:message] = "Post Updated Successfully!"
      redirect_to brewery_thread_path(@brewery_thread)
    else
      render action: :edit
    end
  end

  private

    def b_thread
      @brewery_thread = BreweryThread.friendly.find(params[:brewery_thread_id])
    rescue ActiveRecord::RecordNotFound
      flash[:error] = "Sorry, something went wrong."
      redirect_to root_path 
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
