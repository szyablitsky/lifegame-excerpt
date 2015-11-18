const SkillsReportEndpoint = {
  submitSkillsReport(skills, content) {
    return Promise.resolve(
      $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          skills_report: {
            content,
            skills_report_skills_attributes: skills
          }
        }),
        url: 'api/skills_reports'
      })
    )
  }
}

export default SkillsReportEndpoint
