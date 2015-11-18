class SkillsReportFinder < BaseFinder
  model SkillsReport

  def for_today_by(user)
    new(for_today).by_user(user)
  end

  def by_user(user)
    scope.where(author: user)
  end

  def for_today()
    scope.where('created_at > ?', previous_skill_report_time_constraint)
  end

  private

  # skill report points refreshes at 4:00 (Moscow)
  def previous_skill_report_time_constraint
    decrement = Time.zone.now.hour == 0 ? 1 : 0
    Time.zone.now.beginning_of_day - decrement.days + 1.hours
  end
end
