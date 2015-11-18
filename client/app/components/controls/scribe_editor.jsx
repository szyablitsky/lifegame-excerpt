import React from 'react'
import Scribe from 'scribe-editor'
import scribePluginToolbar from 'scribe-plugin-toolbar'
import scribePluginLinkPromptCommand from 'scribe-plugin-link-prompt-command'
import scribePluginIntelligentUnlinkCommand from 'scribe-plugin-intelligent-unlink-command'
import scribePluginSmartLists from 'scribe-plugin-smart-lists'
import scribePluginImageUploadCommand from './scribe_plugin_image_upload_command'
import scribePluginYoutubeVideoCommand from './scribe_plugin_youtube_video_command'

const ScribeEditor = React.createClass({
  getInitialState() {
    return {
      active: false,
      placeholder: true,
      image: null,
      progressWidth: 0
    }
  },

  fixHTML(html) {
    return html.replace(/>[^<]*<\/iframe/, '></iframe')
  },

  componentDidMount() {
    const scribeElement = this.refs.scribe
    const scribe = new Scribe(scribeElement)
    scribe.use(scribePluginToolbar(this.refs.toolbar))
    scribe.use(scribePluginLinkPromptCommand())
    scribe.use(scribePluginIntelligentUnlinkCommand())
    scribe.use(scribePluginSmartLists())
    scribe.use(scribePluginImageUploadCommand({
      fileUploadElement: this.refs.file,
      imageElement: this.refs.image,
      progressElement: this.refs.progress,
      url: this.props.imagesUploadUrl
    }))
    scribe.use(scribePluginYoutubeVideoCommand())
    scribe.on('content-changed', () => {
      const html = this.fixHTML(scribe.getHTML())
      this.props.onChange({ target: { value: html } })
      if (html == '<p><br></p>' || html == '') {
        this.setState({ placeholder: true })
      } else {
        this.setState({ placeholder: false })
      }
    })
    scribe.on('image-upload', (image) => this.setState({ image, progressWidth: 0 }))
    scribe.on('upload-progress', (progress) => this.setState({ progressWidth: 180 * progress }))
    scribe.setContent(this.props.content)

    scribeElement.addEventListener('blur', () => this.setState({ active: false }))
    scribeElement.addEventListener('focus', () => this.setState({ active: true }))
  },

  render() {
    return (
      <div className='scribe-editor'>
        <div ref='toolbar' className={`editor-toolbar${this.state.active ? ' -active' : ''}`}>
          <button className='button' data-command-name='bold'><i className='fa fa-bold' /></button>
          <button className='button' data-command-name='italic'><i className='fa fa-italic' /></button>
          <button className='button' data-command-name='removeFormat'><i className='fa fa-eraser' /></button>
          <button className='button' data-command-name='linkPrompt'><i className='fa fa-link' /></button>
          <button className='button' data-command-name='unlink'><i className='fa fa-unlink' /></button>
          <button className='button' data-command-name='insertUnorderedList'><i className='fa fa-list-ul' /></button>
          <button className='button' data-command-name='insertOrderedList'><i className='fa fa-list-ol' /></button>
          <button className='button' data-command-name='imageUpload'><i className='fa fa-image' /></button>
          <button className='button' data-command-name='insertYoutubeVideo'><i className='fa fa-film' /></button>
        </div>
        <input type='file' ref='file' accept='image/jpeg,image/png,image/gif' style={{display: 'none'}} />
        <div className={`placeholder${this.state.placeholder ? ' -show' : ''}`}>
          {this.props.placeholder}
        </div>
        <div className={`scribe-overlay${this.state.image ? ' -show' : ''}`}>
          <div className='preview'>
            <img ref='image' className='image' src={this.state.image} />
            <div className='progress-container'>
              <div ref='progress' className='progress-bar' style={{width: this.state.progressWidth}} />
            </div>
          </div>
        </div>
        <div contentEditable='true' ref='scribe' className='editor-content' />
      </div>
    )
  }
})

export default ScribeEditor
