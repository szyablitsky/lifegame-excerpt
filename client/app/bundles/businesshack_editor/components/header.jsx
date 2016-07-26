import React from 'react'
import TextArea from 'react-autosize-textarea'
import classNames from 'classnames'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

import { messages } from '../constants/status'
import Loader from 'shared/components/loader'

import css from './header.sass'
import inputCss from './input.sass'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = { fixed: false }
    this.save = debounce(props.save, 500)
    this.handleScroll = throttle(this.handleScroll.bind(this), 100)
  }

  componentDidMount() {
    if (typeof window !== 'undefined') $(window).on('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    $(window).off('scroll', this.handleScroll)
  }

  handleScroll() {
    const rect = this._header.getBoundingClientRect()
    const { fixed } = this.state
    if (rect.top < 0) {
      if (fixed !== true) this.setState({ fixed: true })
    } else if (fixed !== false) {
      this.setState({ fixed: false })
    }
  }

  handleChange(key, e) {
    this.props.change(key, e.target.value)
    this.save()
  }

  handleClick() {
    const event = new MouseEvent('click')
    this.refs.image.dispatchEvent(event)
  }

  handleSelect() {
    this.props.uploadImage(this.refs.image.files[0])
  }


  render() {
    const { status, subtitle, description2, darken, image, uploading } = this.props
    const { fixed } = this.state

    const style = image ? { backgroundImage: `url(${image})` } : null
    const className = classNames(css.status, { [css.fixed]: fixed })

    return (
      <header className='hack-header' style={style}
              ref={(c) => { this._header = c }}>
        <div className={`hack-header-overlay ${css.editor}`}
             style={{ backgroundColor: `rgba(0,0,0,${darken / 100})` }}>
          <div className={className}>{messages[status]}</div>
          <div className='hack-header-spacer' />
          <h1>
            <TextArea placeholder='Заголовок хака' value={subtitle}
                      className={`hack-title ${inputCss.input}`}
                      onChange={this.handleChange.bind(this, 'subtitle')} />
          </h1>
          <div>
            <TextArea placeholder='Описание хака' value={description2}
                      className={`hack-description ${inputCss.input}`}
                      onChange={this.handleChange.bind(this, 'description2')} />
          </div>
          <div className='hack-header-spacer' />
          <div>Затемнение фонового изображения</div>
          <div className={css.darken}>
            <input type='range' value={darken}
                   onChange={this.handleChange.bind(this, 'darken')} />
          </div>
          <div className={css.uploader} onClick={this.handleClick.bind(this)}>
            <input type='file' ref='image' accept='image/jpeg,image/png,image/gif'
                   style={{ display: 'none' }} onChange={this.handleSelect.bind(this)} />
            {uploading ? <Loader color='primary' /> : // eslint-disable-line operator-linebreak
              <div className={css.uploaderText}>
                <i className='fa fa-camera' />
                {image ? 'изменить' : 'загрузить'} фоновое изображение
              </div>
            }
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  status: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string,
  description2: React.PropTypes.string,
  darken: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  image: React.PropTypes.string,
  uploading: React.PropTypes.bool.isRequired,
  change: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  uploadImage: React.PropTypes.func.isRequired,
}
