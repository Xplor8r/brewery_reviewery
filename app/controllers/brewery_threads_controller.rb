class BreweryThreadsController < ApplicationController
  before_action :b_thread, only: [:show, :edit, :update]
  before_action :require_admin_or_author_for_thread!, only: [:edit, :update]
  before_action :current_user

  def index
    @brewery_threads = BreweryThread.sorted.includes(:user, :brewery_state)
  end

  def author
    @brewery_threads = BreweryThread.where(user: current_user).sorted.includes(:user, :brewery_state)
    render action: :index
  end

  def participant
    @brewery_threads = BreweryThread.includes(:user, :brewery_state).joins(:posts).where(posts: { user_id: current_user.id }).distinct(posts: :id).sorted
    render action: :index
  end

  def show
    @post = Post.new
    @post.user = current_user
  end

  def new
    @brewery_thread = BreweryThread.new
    @brewery_thread.posts.new
  end

  def create
    @brewery_thread = current_user.brewery_threads.new(brewery_thread_params)
    @brewery_thread.posts.each { |post| post.user_id = current_user.id }
    if @brewery_thread.save
      redirect_to brewery_thread_path(@brewery_thread)
    else
      render action: :new
    end
  end

  def edit
  end

  def update
    if @brewery_thread.update(brewery_thread_params)
      redirect_to brewery_thread_path(@brewery_thread), notice: "Thread Updated Successfully."
    else
      render action: :edit
    end
  end

  private

    def b_thread
      @brewery_thread.friendly.find(params[:id])
    end

    def brewery_thread_params
      params.require(:brewery_thread).permit(:brewery, :brewery_state_id, posts_attributes: [:body])
    end
end
