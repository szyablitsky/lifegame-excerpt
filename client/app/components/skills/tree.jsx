import React from 'react'
import SkillsBranch from './branch'

const SkillsTree = React.createClass({
  render() {
    return <div className='skills-tree'>{this.renderSkills()}</div>
  },

  renderSkills() {
    const { skills, selected, images, onSelectSkill } = this.props
    let items = []
    skills.forEach(skill => {
      items.push(
        <SkillsBranch key={skill.id} skill={skill} selected={selected}
          images={images} onClick={onSelectSkill} />
      )
      items.push(<div key={`s${skill.id}`} className='separator' />)
    })
    items.pop()
    return items
  }
})

export default SkillsTree
