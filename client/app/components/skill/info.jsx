import React from 'react'
import simpleFormat from '../../helpers/simple_format'

const RESOURCES = { time: 'Время', energy: 'Энергия', money: 'Деньги' }

const SkillInfo = React.createClass({
  render() {
    const { skill } = this.props
    const image = skill.image ?
      <div className='image'><img src={skill.image} /></div> : null

    return (
      <div className='skill-info' key={skill.id}>
        <div className='header'>{skill.name}</div>
        {image}
        <div className='description'>{simpleFormat(skill.description)}</div>
        {this.renderExamples()}
        {this.renderResources()}
      </div>
    )
  },

  renderExamples() {
    const { examples } = this.props.skill
    if (examples) {
      return [
          <div key='ex-h'>Примеры</div>,
          <div key='ex-d' className='description'>{simpleFormat(examples)}</div>
      ]
    }
  },

  renderResources() {
    const { skill, images } = this.props
    const { resources } = skill
    if (Object.keys(resources).map(key => resources[key]).some(val => val !== 0)) {
      return [
        <div key='res-h'>Ресурсы</div>,
        <div key='res-d' className='resources'>
          {Object.keys(resources).map(key => {
            const value = resources[key]
            return value !== 0 ?
              <span className='resource' key={key}>
                <img className='icon' src={images[`resource/${key}.png`]} />
                {RESOURCES[key]}
                <span className='value'>{value > 0 ? `+${value}` : value}</span>
              </span> : null
          })}
        </div>
      ]
    }
  }
})

export default SkillInfo
