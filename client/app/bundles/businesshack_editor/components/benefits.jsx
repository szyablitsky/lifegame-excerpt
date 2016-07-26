import React from 'react'
import map from 'lodash/map'
import debounce from 'lodash/debounce'
import TextArea from 'react-autosize-textarea'

import Switcher from '../containers/switcher'

import css from './input.sass'

export default class Benefits extends React.Component {
  constructor(props) {
    super(props)
    this.save = debounce(props.save, 500)
  }

  handleChange(i, e) {
    this.props.changeBenefit(i, e.target.value)
    this.save()
  }

  render() {
    const { benefits2 } = this.props

    return (
      <div className='hack-benefits'>
        <Switcher />
        <div className='content'>
          <div className='hack-benefits-title'>Польза</div>
          <ul className='hack-benefits-list'>
            {map(benefits2, (benefit, i) =>
              <li key={i} className='hack-benefit'>
                <TextArea placeholder={`Польза ${i + 1}`} className={css.input}
                          value={benefit} onChange={this.handleChange.bind(this, i)} />
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

Benefits.propTypes = {
  benefits2: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  changeBenefit: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
}
