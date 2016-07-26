import request from './base'

const HackEndpoint = {
  submitComment(id, params) {
    return request(`/api/businesshacks/${id}/comments`, params)
  },
}

export default HackEndpoint
