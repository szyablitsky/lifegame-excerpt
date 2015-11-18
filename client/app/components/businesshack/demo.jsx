import React from 'react'

class BusinesshackDemo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { html: 'Загрузка...' }
    const url = `/businesshacks/${this.props.id}/demo`
    $.get(url, (html) => this.setState({ html }))
  }

  render() {
    const html = { __html: this.state.html }
    return <div className='businesshack-demo' dangerouslySetInnerHTML={html} />
  }
}

export default BusinesshackDemo
