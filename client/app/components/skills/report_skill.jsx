import React from 'react'
import TextArea from 'react-textarea-autosize'
import imagePath from '../../helpers/image_path'

const PostSkillField = React.createClass({
  render() {
    const { skill, onChange, onRemoveSkill } = this.props
    return (
      <div className='skill-field'>
        <div className='skill-label'>
          <img className='icon' src={imagePath('skill/label.png')} />
          {skill.name}
        </div>
        <TextArea className='input' placeholder='По тому что...' maxRows={3} onChange={onChange} />
        <div className='remove' onClick={onRemoveSkill}>×</div>
      </div>
    )
  }
})

export default PostSkillField
