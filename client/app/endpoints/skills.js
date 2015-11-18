const SkillsEndpoint = {
  unlockSkill(skillId) {
    return Promise.resolve(
      $.ajax({
        type: 'post',
        contentType: 'application/json',
        url: `api/skills/${skillId}/unlock`
      })
    )
  }
}

export default SkillsEndpoint
