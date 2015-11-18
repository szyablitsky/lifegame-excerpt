import React from 'react'

const SkillsGroupTab = React.createClass({
  render() {
    const { image, name, active, displayName, onClick } = this.props
    const className = `skill-group-item${active ? ' -active' : ''}`
    const nameTag = displayName ? <div className='name'>{name}</div> : ''
    return (
      <div className={className} onClick={onClick}>
        <img src={image} />
        {nameTag}
      </div>
    )
  }
})

export default SkillsGroupTab
