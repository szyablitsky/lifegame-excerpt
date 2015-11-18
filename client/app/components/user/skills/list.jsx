import React from 'react'
import SkillsListItem from './list_item'
import SkillInfo from '../../skill/info'

const SkillsList = React.createClass({
  getInitialState() {
    return { hover: null }
  },

  hover(index) {
    this.setState({ hover: index })
  },

  leave() {
    this.setState({ hover: null })
  },

  render() {
    const skills = (this.props.skills.length > 0) ? this.renderSkillsList() : this.renderEmptyMessage()
    return <div className='user-skills-list'>{skills}{this.renderSkillInfo()}</div>
  },

  renderSkillsList() {
    const { skills, onAddSkillToReport, images } = this.props
    return skills.map((skill, index) => {
      return (
        <SkillsListItem key={skill.id} skill={skill} images={images}
          onMouseEnter={this.hover.bind(null, index)} onMouseLeave={this.leave}
          onClick={() => { if (!skill.unavailable) onAddSkillToReport(skill.id, skill.resources) }} />
      )
    })
  },

  renderEmptyMessage() {
    return (
      <div className='user-skill -disabled'>
        Нет открытых навыков в этой группе
      </div>
    )
  },

  renderSkillInfo() {
    if (this.state.hover !== null) {
      const { skills, images } = this.props
      return (
        <div className='user-skill-info'>
          <SkillInfo skill={skills[this.state.hover]} images={images} />
        </div>
      )
    }
  }
})

export default SkillsList
