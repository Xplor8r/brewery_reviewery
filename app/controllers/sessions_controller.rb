class SessionsController < ApplicationController

    def destroy
      session[:user_id] = nil
      redirect_to root_path
    end
  
    def new
      @user = User.new
      @users = User.all
    end
  
    def create
      if @user = User.find_by(name: params[:user][:name])
        if @user && @user.authenticate(params[:user][:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          redirect_to signin_path
        end
      else
        @user = User.new
        redirect_to signin_path
      end  
    end
  
  end