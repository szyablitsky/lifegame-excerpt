import React from 'react'

const SkillsBranch = React.createClass({
  getInitialState() {
    return { hover: false }
  },

  showName() {
    this.setState({ hover: true })
  },

  hideName() {
    this.setState({ hover: false })
  },

  render() {
    const { skill, selected, images, onClick } = this.props

    const branchName = skill.root && skill.branchName ?
      <div className='branch-name'><div className='text'>{skill.branchName}</div></div> : null

    const children = skill.children.length > 0 ?
      <div className='children'>{this.renderChildren(skill.children)}</div> : null

    const locked = skill.unlocked ? null :
      <div className='lock'><img src={images['skill/lock.png']}/></div>

    const name = this.state.hover ?
      <div className='name-container'><span className='name'>{skill.name}</span></div> : null

    return (
      <div className={`skills-branch-container${skill.root ? ' -root' : ''}`}>
        {branchName}
        <div className='skills-branch'>
          {name}
          <div className={`image${skill.id === selected ? ' -selected' : ''}`}
               onClick={onClick.bind(null, skill.id)}
               onMouseEnter={this.showName} onMouseLeave={this.hideName}>
            <img src={skill.thumb || images['skill/default.png']} />
            {locked}
          </div>
          {children}
        </div>
      </div>
    )
  },

  renderChildren(children) {
    const { selected, images, onClick } = this.props
    let items = []
    children.forEach(skill => {
      items.push(
        <SkillsBranch key={skill.id} skill={skill} selected={selected}
          images={images} onClick={onClick} />
      )
      items.push(<div key={`s${skill.id}`} className='separator' />)
    })
    items.pop()
    return items
  }
})

export default SkillsBranch
