class PostsController < ApplicationController
  skip_before_action :not_authenticated

  def index
    @posts = PostFinder.for_list(params, current_user)
    if params[:page] && params[:page].to_i > 1
      render @posts
    else
      set_local_frontend_initial_state
    end
  end

  def show
    @post = Post.find(params[:id])
    add_breadcrumb 'Лента', posts_path
  end

  private

  def set_local_frontend_initial_state
    skills_facade = SkillsFacade.new
    @frontend_initial_state[:skill_groups] = skills_facade.skill_groups
    return unless logged_in?

    user_facade = UserFacade.new(current_user)
    @frontend_initial_state[:user][:user_skills] = user_facade.user_skills
    @frontend_initial_state[:user][:used_skill_ids] = user_facade.used_skill_ids
    @frontend_initial_state[:user][:used_all_skill_points] = user_facade.used_all_skill_points
  end
end
