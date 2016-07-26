import { notifyError } from 'shared/components/notifier'

const scribePluginImageUploadCommand = function(options) {
  return function(scribe) {
    const imageUploadCommand = new scribe.api.Command('imageUpload')

    options.fileUploadElement.addEventListener('change', handleFile)

    imageUploadCommand.execute = () => {
      saveSelection()
      simulateFileInputClick()
    }

    imageUploadCommand.queryEnabled = () => true

    scribe.commands.imageUpload = imageUploadCommand

    function saveSelection() {
      const selection = new scribe.api.Selection()
      selection.placeMarkers()
    }

    function restoreSelection() {
      const selection = new scribe.api.Selection()
      selection.selectMarkers()
    }

    function simulateFileInputClick() {
      const event = new MouseEvent('click')
      options.fileUploadElement.dispatchEvent(event)
    }

    function handleFile(e) {
      e.preventDefault()

      scribe.el.focus()
      restoreSelection()

      if (this.files.legth === 0) return

      const tempImageUrl = window.URL.createObjectURL(this.files[0])
      scribe.trigger('image-upload', [tempImageUrl])
      setTimeout(() => { window.URL.revokeObjectURL(tempImageUrl) }, 1000)

      uploadFile(this.files[0])
    }

    function uploadFile(file) {
      let data = new FormData()
      data.append('picture[image]', file)

      const request = new XMLHttpRequest()

      request.upload.addEventListener('progress', (e) => {
        scribe.trigger('upload-progress', [e.loaded / e.total])
      })
      request.addEventListener('readystatechange', () => {
        if (request.readyState != 4) return
        scribe.trigger('image-upload', [null])
        if (request.status != 200) {
          notifyError('Ошибка загрузки файла')
        } else {
          insertImage(JSON.parse(request.responseText).picture)
        }
      })

      const token = document.querySelector('meta[name=\'csrf-token\']').content
      request.open('POST', options.url, true)
      request.setRequestHeader('X-CSRF-Token', token)
      request.send(data);
    }

    function insertImage(picture) {
      const { id, thumb, full } = picture
      scribe.insertHTML(`<a href="${full}" data-lightbox="image-${id}"><img src="${thumb}"></a>`)
    }
  }
}

export default scribePluginImageUploadCommand
