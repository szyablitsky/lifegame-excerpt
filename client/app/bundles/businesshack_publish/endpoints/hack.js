import request from 'shared/endpoints/base'

const HackEndpoint = {
  publish(id, params) {
    return request(`/api/businesshacks/${id}/publish`, params)
  },
}

export default HackEndpoint
