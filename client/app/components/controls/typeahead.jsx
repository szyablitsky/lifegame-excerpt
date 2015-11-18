import React from 'react'
import { select, map, includes } from 'lodash'

const KeyUp = 38
const KeyDown = 40
const KeyEnter = 13

class Typeahead extends React.Component {
  constructor(props) {
    super(props)
    this.state = { index: 0 }
  }

  handleKeyDown(e) {
    const matches = this.matches()
    const { index } = this.state

    switch (e.keyCode) {
      case KeyUp:
        e.preventDefault()
        if (includes([0, 1], index)) {
          this.setState({ index: matches.length })
        } else {
          this.setState({ index: index - 1 })
        }

        break
      case KeyDown:
        e.preventDefault()
        if (includes([0, matches.length], index)) {
          this.setState({ index: 1 })
        } else {
          this.setState({ index: index + 1 })
        }

        break
      case KeyEnter:
        if (index > 0) {
          this.setState({ index: 0 })
          this.handleClick(matches[index - 1])
        } else {
          this.props.onKeyDown(e)
        }

        break
      default:
        this.setState({ index: 0 })
        this.props.onKeyDown(e)
    }
  }

  handleClick(value) {
    this.props.onChange({ target: { value } })
    setTimeout(() => this.props.onKeyDown({ keyCode: 13, preventDefault: () => {} }))
  }

  matches() {
    const { variants, value } = this.props
    const regex = new RegExp(value, 'i')
    if (value === '') return []
    return select(variants, (variant) => variant.match(regex) && variant !== value)
  }

  render() {
    return (
      <div className='typeahead'>
        <input type='text' {...this.props}
               onKeyDown={this.handleKeyDown.bind(this)} />
        {this.renderMatches()}
      </div>
    )
  }

  renderMatches() {
    const matches = this.matches()
    if (matches.length > 0) return (
      <div className='typeahead-matches'>
        {map(this.matches(), (variant, i) => {
          const className = `variant${i + 1 === this.state.index ? ' -selected' : ''}`
          return (
            <div key={variant} className={className} onClick={this.handleClick.bind(this, variant)}>
              {variant}
            </div>
          )
        })}
      </div>
    )
  }
}

export default Typeahead
