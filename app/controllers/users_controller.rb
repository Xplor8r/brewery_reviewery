class UsersController < ApplicationController
  before_action :b_user, only: [:show]

  def show
    @brewery_threads = BreweryThread.where(user: @user).sorted.includes(:user, :brewery_state)
  end

  def index
    redirect_to root_path
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
      flash[:message] = "You must give a valid name, email and password."
      redirect_to new_user_path
    end
  end

  private
    def b_user
      @user = User.friendly.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      flash[:message] = "Sorry, something went wrong."
      redirect_to root_path 
    end

    def user_params
      params.require(:user).permit(:name, :admin, :password, :email)
    end
end
