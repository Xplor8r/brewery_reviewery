class UsersController < ApplicationController
  before_action :b_user, only: [:show, :destroy]

  def show
    @brewery_threads = BreweryThread.where(user: @user).sorted.includes(:user, :brewery_state)
  end

  def index
    redirect_to_root
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash[:message] = "You must give a valid name and a unique email."
      render :new
    end
  end

  private
    def b_user
      @user = User.find(params[:id])
    end

    def user_params
      params.require(:user).permit(:name, :admin, :password, :email)
    end
end
