// import $ from 'jquery';

const API_URL = 'api/users/';

const UserEndpoint = {
  getUser(userId) {
    return Promise.resolve(
      $.getJSON(API_URL + userId)
    )
  }
}

export default UserEndpoint
