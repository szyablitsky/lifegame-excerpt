import React from 'react'
import debounce from 'lodash/debounce'

import ScribeEditor from 'shared/components/scribe_editor'

export default class Closing extends React.Component {
  constructor(props) {
    super(props)

    this.save = debounce(props.save, 500)
  }

  handleChange(value) {
    if (this.props.closing === value) return
    this.props.change('closing', value)
    this.save()
  }

  render() {
    const { closing } = this.props

    return (
      <div className='hack-step closing'>
        <ScribeEditor content={closing} placeholder='Вывод'
                      onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

Closing.propTypes = {
  status: React.PropTypes.string.isRequired,
  closing: React.PropTypes.string,
  change: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
