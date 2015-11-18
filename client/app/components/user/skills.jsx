import React from 'react'
import SkillsGroupTabs from '../skills/group_tabs'
import SkillsList from './skills/list'

const UserSkills = React.createClass({
  selectGroup(id) {
    this.props.skillsSetActiveGroup(id)
  },

  addSkillToReport(id, resources) {
    this.props.skillsReportFormAddSkill(id, resources)
  },

  render() {
    const { groupIds, groups, activeGroupId, skills, images } = this.props
    return (
      <div className='user-skills-container'>
        <SkillsGroupTabs groupIds={groupIds} groups={groups} images={images}
          active={activeGroupId} onSelectGroup={this.selectGroup} />
        <SkillsList skills={skills} images={images}
          onAddSkillToReport={this.addSkillToReport} />
      </div>
    )
  }
})

import userSkillsSelector from '../../selectors/user_skills'
import { skillsSetActiveGroup } from '../../actions/skills'
import { skillsReportFormAddSkill } from '../../actions/skills_report'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function actions(dispatch) {
  return bindActionCreators({
    skillsSetActiveGroup, skillsReportFormAddSkill
  }, dispatch)
}

export default connect(userSkillsSelector, actions)(UserSkills)
