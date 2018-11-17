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
          redirect_to new_user_url
        end
      else
        @user = User.new
        redirect_to new_user_url
      end  
    end
    
    def google
        auth = request.env['omniauth.auth']
        if auth
          @user = User.find_or_create_by(uid: auth['uid']) do |user|
            user.name = auth['info']['name']
            user.email = auth['info']['email']
            user.password = params[:code][0..71]
          end
          session[:user_id] = @user.id
          redirect_to user_path(@user)
        else
          @user = User.new
          redirect_to new_user_url
        end
      end
  end
