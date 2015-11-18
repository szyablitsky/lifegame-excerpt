import React from 'react'
import moment from 'moment'

class TimeAgo extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => { this.forceUpdate() }, 60 * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { time, className } = this.props
    moment.locale('ru')

    return (
      <time className={className} dateTime={time} title={moment(time).format('LLLL')}>
        {moment(time).fromNow()}
      </time>
    )
  }
}

export default TimeAgo
