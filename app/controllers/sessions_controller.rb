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
      if @user = User.find_by(email: params[:email])
        if @user && @user.authenticate(params[:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          flash[:message] = "No one here by that name. Please sign up."
          redirect_to new_user_url
        end
      else
        @user = User.new
        redirect_to new_user_url
      end  
    end

    def auth
      request.env["omniauth.auth"]
    end

    def google
      if auth
        @user = User.find_or_create_by(uid: auth['uid']) do |u|
          u.name = auth['info']['name']
          u.email = auth['info']['email']
          u.password = params[:code][0..71]
        end
        session[:user_id] = @user.id
        redirect_to user_path(@user)
      else
        @user = User.new
        redirect_to new_user_url
      end
    end
  end
