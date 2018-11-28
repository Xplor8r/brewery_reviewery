class SessionsController < ApplicationController

    def new
      @user = User.new
    end

    def create
      @user = User.find_by(email: params[:user][:email])
        if @user && @user.authenticate(params[:user][:password])
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          flash[:error] = "Sorry, that email and password don't match our records. Please sign up."
          redirect_to new_user_url
        end
    end
    
    def destroy
      session[:user_id] = nil
      redirect_to root_path
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
