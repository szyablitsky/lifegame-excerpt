import React from 'react'

const SkillsListItem = React.createClass({
  render() {
    const { skill, onClick, onMouseEnter, onMouseLeave, images } = this.props
    const className = `user-skill${skill.unavailable ? ' -disabled' : ''}`
    return (
      <div className={className} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className='name'>{skill.name}</div>
        <div className='count'>{skill.count}</div>
        <img className='add' src={images['skill/add.png']} onClick={onClick} />
      </div>
    )
  }
})

export default SkillsListItem
