import React from 'react'
import TagsInput from 'react-tagsinput'
import Typeahead from '../controls/typeahead'

function renderInput(props) {
  const { onChange, value, ...other } = props
  return (
    <Typeahead onChange={onChange} value={value} {...other} />
  )
}

class BusinesshackTagsForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { sending: false, tags: this.props.businesshack.tags }
  }

  save(tags) {
    if (this.state.sending) return
    this.setState({ sending: true })
    $.ajax({
      type: 'patch',
      dataType: 'json',
      contentType: 'application/json',
      data: JSON.stringify({ tags }),
      url: `/api/businesshacks/${this.props.businesshack.id}/tags`
    })
    .done(() => {
      this.setState({ sending: false, tags })
    })
    .fail(() => {
      this.setState({ sending: false })
      Growlyflash.error('Ошибка обработки. Попробуйте перезагрузить страницу.')
    })
  }

  render() {
    const inputProps = {
      placeholder: 'Добавьте тег',
      className: 'react-tagsinput-input',
      variants: this.props.tags
    }
    return (
      <section className={`businesshack-tags-section${this.state.sending ? ' -sending' : ''}`}>
        <h1 className='title'>Тэги</h1>
        <TagsInput value={this.state.tags} onChange={this.save.bind(this)}
                   renderInput={renderInput} inputProps={inputProps} />
      </section>
    )
  }
}

const Factory = (props) => <BusinesshackTagsForm {...props} />

export default Factory
