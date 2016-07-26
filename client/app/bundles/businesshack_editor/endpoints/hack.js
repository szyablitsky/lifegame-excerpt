import request from 'shared/endpoints/base'

const HackEndpoint = {
  update(params) {
    return request(`/api/businesshacks/${params.id}`, params, 'patch')
  },
}

export default HackEndpoint
