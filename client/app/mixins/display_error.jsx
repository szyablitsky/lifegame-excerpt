const DisplayError = {
  getInitialState() {
    return {error: null}
  },

  componentDidUpdate() {
    $('.auth-form > .error').fadeOut('fast')
    $('.auth-form > .error').fadeIn()
  },

  errorMessage() {
    if (this.state.error) {
      return <div className='error' style={{display: 'none'}}>{this.state.error}</div>
    }
  }
}

export default DisplayError
