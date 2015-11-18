import React from 'react'
import UserSegmentItem from './segment_item'
import imagePath from '../../helpers/image_path'

const BUSINESS_OWNER_DESCRIPTION = 'Есть работающий бизнес, приносящий прибыль. Хочу расти и развивать свой проект.'
const SERIAL_ENTREPRENEUR_DESCRIPTION = 'Недавно начал или хочу начать бизнес, пока нет устойчивой прибыли. Совершил массу попыток, но так и не вышло.'
const PERSONAL_DEVELOPMENT_FAN_DESCRIPTION = 'Интересно саморазвитие в целом. Читаю книги, статьи или посещаю тренинги личностного роста.'

const SEGMENTS = [
  { id: 0, image: imagePath('user/segment0.png'), name: 'Предприниматель', description: BUSINESS_OWNER_DESCRIPTION },
  { id: 1, image: imagePath('user/segment1.png'), name: 'Стартапер', description: SERIAL_ENTREPRENEUR_DESCRIPTION },
  { id: 2, image: imagePath('user/segment2.png'), name: 'Активный', description: PERSONAL_DEVELOPMENT_FAN_DESCRIPTION }
]

const UserSegmentSelect = React.createClass({
  displayName: 'UserSegmentSelect',

  getInitialState() {
    return {hover: null}
  },

  enter(i) { this.setState({hover: i}) },

  leave()  { this.setState({hover: null}) },

  click(i) { this.props.onChange(i) },

  segmentDescription() {
    const segment = this.state.hover !== null ? this.state.hover : this.props.value
    return (
      <div className='segment-description'>
        <div className='name'>{SEGMENTS[segment].name}</div>
        <div className='description'>{SEGMENTS[segment].description}</div>
      </div>
    )
  },

  render() {
    return (
      <div>
        <div className='segment-select'>
          {SEGMENTS.map(function(segment) {
            return <UserSegmentItem segment={segment} key={segment.id}
              hover={this.state.hover === segment.id}
              active={this.props.value === segment.id}
              onMouseEnter={this.enter.bind(this, segment.id)}
              onMouseLeave={this.leave}
              onClick={this.click.bind(this, segment.id)} />;
          }.bind(this))}
        </div>
        {this.segmentDescription()}
      </div>
    )
  }
})

export default UserSegmentSelect
