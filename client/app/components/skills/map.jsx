import React from 'react'
import SkillsGroupTabs from './group_tabs'
import SkillsTree from './tree'

const SkillsMap = React.createClass({
  render() {
    const { groupIds, groups, activeGroupId, skills, selectedSkillId, images,
            skillsSetActiveGroup, skillSelect } = this.props
    return (
      <div className='skills-map-container'>
        <SkillsGroupTabs groupIds={groupIds} groups={groups} images={images}
          active={activeGroupId} displayNames={true} onSelectGroup={skillsSetActiveGroup} />
        <SkillsTree skills={skills} images={images} selected={selectedSkillId}
          onSelectSkill={skillSelect} />
      </div>
    )
  }
})

import skillsMapSelector from '../../selectors/skills_map'
import { skillsSetActiveGroup, skillSelect } from '../../actions/skills'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

function actions(dispatch) {
  return bindActionCreators({
    skillsSetActiveGroup, skillSelect
  }, dispatch)
}

export default connect(skillsMapSelector, actions)(SkillsMap)
