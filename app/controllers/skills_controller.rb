class SkillsController < ApplicationController
  def index
    set_local_frontend_initial_state
  end

  private

  def set_local_frontend_initial_state
    skills_facade = SkillsFacade.new
    @frontend_initial_state[:skill_groups] = skills_facade.skill_groups
    return unless logged_in?

    user_facade = UserFacade.new(current_user)
    @frontend_initial_state[:user][:user_skills] = user_facade.user_skills
  end
end
