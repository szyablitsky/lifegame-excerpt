import React from 'react'
import classNames from 'classnames'
import throttle from 'lodash/throttle'
import Scribe from 'scribe-editor'
import scribePluginToolbar from 'scribe-plugin-toolbar'
import scribePluginLinkPromptCommand from 'scribe-plugin-link-prompt-command'
import scribePluginIntelligentUnlinkCommand from 'scribe-plugin-intelligent-unlink-command'
import scribePluginSmartLists from 'scribe-plugin-smart-lists'

import scribePluginImageUploadCommand from './scribe_plugin_image_upload_command'
import scribePluginYoutubeVideoCommand from './scribe_plugin_youtube_video_command'

import css from './scribe_editor.sass'

function fixHTML(html) {
  return html.replace(/>[^<]*<\/iframe/, '></iframe')
}

export default class ScribeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toolbar: { fixed: false },
      focus: false,
      showPlaceholder: true,
      image: null,
      progressWidth: 0,
    }
    this.handleScroll = throttle(this.handleScroll.bind(this), 100)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  componentDidMount() {
    const scribeElement = this._scribe
    const scribe = new Scribe(scribeElement)

    scribe.use(scribePluginToolbar(this._toolbar))
    scribe.use(scribePluginLinkPromptCommand())
    scribe.use(scribePluginIntelligentUnlinkCommand())
    scribe.use(scribePluginSmartLists())
    if (this.props.imagesUploadUrl) {
      scribe.use(scribePluginImageUploadCommand({
        fileUploadElement: this._file,
        imageElement: this._image,
        progressElement: this._progress,
        url: this.props.imagesUploadUrl,
      }))
      scribe.use(scribePluginYoutubeVideoCommand())
    }

    scribe.on('content-changed', () => {
      const html = fixHTML(scribe.getHTML())
      this.props.onChange(html)
      if (html == '<p><br></p>' || html == '') {
        this.setState({ showPlaceholder: true })
      } else {
        this.setState({ showPlaceholder: false })
      }
    })

    scribe.on('image-upload', (image) => this.setState({ image, progressWidth: 0 }))
    scribe.on('upload-progress', (progress) => this.setState({ progressWidth: 180 * progress }))

    scribe.setContent(this.props.content)

    if (typeof window !== 'undefined') {
      $(window).on('scroll', this.handleScroll)
      $(window).on('resize', this.handleScroll)
      $(this._scribe).on('focus', this.handleFocus)
      $(this._scribe).on('blur', this.handleBlur)
    }
  }

  componentWillUnmount() {
    $(window).off('scroll', this.handleScroll)
    $(window).off('resize', this.handleScroll)
    $(this._scribe).off('focus', this.handleFocus)
    $(this._scribe).off('blur', this.handleBlur)
  }

  handleScroll() {
    const offset = 45
    const rect = this._editor.getBoundingClientRect()
    const { fixed, left, right } = this.state.toolbar
    if (rect.top < offset && rect.bottom > offset) {
      if (fixed !== true || left !== rect.left || right !== rect.right)
        this.setState({
          toolbar: {
            fixed: true,
            left: rect.left,
            width: rect.right - rect.left,
          },
        })
    } else if (fixed !== false) {
      this.setState({ toolbar: { fixed: false } })
    }
  }

  handleFocus() { this.setState({ focus: true }) }

  handleBlur() { this.setState({ focus: false }) }

  render() {
    const { showPlaceholder, focus, image, progressWidth } = this.state
    const { placeholder, imagesUploadUrl } = this.props
    const { fixed, left, width } = this.state.toolbar

    const toolbarClassName = classNames(css.toolbar, {
      [css.fixed]: fixed && focus,
      [css.focus]: focus,
    })
    const toolbarStyle = fixed && focus ? { left, width } : {}
    const placeholderClassName = classNames(css.placeholder, { show: showPlaceholder })
    const overlayClassName = classNames(css.overlay, { show: image })

    return (
      <div className={css.editor} ref={(c) => { this._editor = c }}>
        <div className={toolbarClassName} style={toolbarStyle}
             ref={(c) => { this._toolbar = c }}>
          <button className={css.button} data-command-name='bold'><i className='fa fa-bold' /></button>
          <button className={css.button} data-command-name='italic'><i className='fa fa-italic' /></button>
          <button className={css.button} data-command-name='removeFormat'><i className='fa fa-eraser' /></button>
          <button className={css.button} data-command-name='linkPrompt'><i className='fa fa-link' /></button>
          <button className={css.button} data-command-name='unlink'><i className='fa fa-unlink' /></button>
          <button className={css.button} data-command-name='insertUnorderedList'><i className='fa fa-list-ul' /></button>
          <button className={css.button} data-command-name='insertOrderedList'><i className='fa fa-list-ol' /></button>
          {imagesUploadUrl ? <button className={css.button} data-command-name='imageUpload'><i className='fa fa-image' /></button> : null}
          {imagesUploadUrl ? <button className={css.button} data-command-name='insertYoutubeVideo'><i className='fa fa-film' /></button> : null}
        </div>
        <input type='file' accept='image/jpeg,image/png,image/gif'
               style={{ display: 'none' }} ref={(c) => { this._file = c }} />
        <div className={placeholderClassName}>{placeholder}</div>
        <div className={overlayClassName}>
          <div className={css.preview}>
            <img className={css.image} src={image}
                 ref={(c) => { this._image = c }} />
            <div className={css.progressContainer}>
              <div className={css.progressBar} style={{ width: progressWidth }}
                   ref={(c) => { this._progress = c }} />
            </div>
          </div>
        </div>
        <div contentEditable='true' className={css.content}
             ref={(c) => { this._scribe = c }} />
      </div>
    )
  }
}

ScribeEditor.propTypes = {
  placeholder: React.PropTypes.string,
  content: React.PropTypes.string.isRequired,
  imagesUploadUrl: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
}
