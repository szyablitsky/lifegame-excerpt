import React from 'react'
import SkillsGroupTab from './group_tab'

const SkillsGroupTabs = React.createClass({
  render() {
    const { groupIds, groups, images, active, displayNames, onSelectGroup } = this.props
    return (
      <div className='skill-group-selector'>
        {groupIds.map((id) => {
          return (
            <SkillsGroupTab key={id} image={images[groups[id].image]}
              name={groups[id].name} active={active == id}
              displayName={displayNames} onClick={onSelectGroup.bind(null, id)} />
          )
        })}
      </div>
    )
  }
})

export default SkillsGroupTabs
