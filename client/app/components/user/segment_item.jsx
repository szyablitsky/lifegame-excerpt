import React from 'react'

const UserSegmentItem = React.createClass({
  displayName: 'UserSegmentItem',

  mouseEnter() { this.props.onMouseEnter() },

  mouseLeave() { this.props.onMouseLeave() },

  click() { this.props.onClick() },

  className() { return 'segment-item' + (this.props.active ? ' -active' : '') },

  hover() {
    if (this.props.hover) {
      return <div className='hover' />
    }
  },

  render() {
    const segment = this.props.segment
    return (
      <div className={this.className()} key={this.props.key} onMouseEnter={this.mouseEnter}
            onMouseLeave={this.mouseLeave} onClick={this.click}>
        <img src={segment.image} className='image' />
        {this.hover()}
        <div className='number'>{'0' + (segment.id + 1)}</div>
        <div className='name'>{segment.name}</div>
      </div>
    )
  }
})

export default UserSegmentItem
