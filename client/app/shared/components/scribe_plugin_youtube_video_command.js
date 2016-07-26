const scribePluginYoutubeVideoCommand = function() {
  return function(scribe) {
    const youtubeVideoCommand = new scribe.api.Command('insertYoutubeVideo')

    const TEST = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/
    const TEMPLATE = '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'

    youtubeVideoCommand.execute = () => {
      const url = window.prompt('Ссылка на видео:')
      const html = url.replace(TEST, TEMPLATE)
      scribe.insertHTML(html)
    }

    youtubeVideoCommand.queryEnabled = () => true

    scribe.commands.insertYoutubeVideo = youtubeVideoCommand
  }
}

export default scribePluginYoutubeVideoCommand
