const scribePluginYoutubeVideoCommand = function(options) {
  return function(scribe) {
    const youtubeVideoCommand = new scribe.api.Command('insertYoutubeVideo')

    const TEST = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    const TEMPLATE = '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'

    youtubeVideoCommand.execute = () => {
      // saveSelection()
      const url = window.prompt('Ссылка на видео:')
      const html = url.replace(TEST, TEMPLATE)
      scribe.insertHTML(html)
    }

    youtubeVideoCommand.queryEnabled = () => {
      return true;
    };

    scribe.commands.insertYoutubeVideo = youtubeVideoCommand

    function saveSelection() {
      const selection = new scribe.api.Selection()
      selection.placeMarkers()
    }

    function restoreSelection() {
      const selection = new scribe.api.Selection()
      selection.selectMarkers()
    }

    function insertImage(picture) {
      const { id, thumb, full } = picture
      scribe.insertHTML(`<a href="${full}" data-lightbox="image-${id}"><img src="${thumb}"></a>`)
    }
  }
}

export default scribePluginYoutubeVideoCommand
