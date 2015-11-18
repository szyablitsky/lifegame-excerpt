import React from 'react'

const UserRecource = React.createClass({
  render() {
    const { icon, name, value } = this.props
    const truncated_value = value > 50 ? 50 : value < -50 ? -50 : value
    const left = (280 - 4) * (truncated_value + -(-50)) / (50 - (-50))
    return (
      <div className='user-resource'>
        <div className='header'><img className='icon' src={icon} />{name}</div>
        <div className='resource-scale'>
          <div className='track' />
          <div className='pointer' style={{left: left}}/>
          <div className='legend'>
            <div className='min'>-50</div>
            <div className='value'>{value}</div>
            <div className='max'>50</div>
          </div>
        </div>
      </div>
    )
  }
})

export default UserRecource
