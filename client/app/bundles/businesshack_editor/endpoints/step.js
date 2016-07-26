import request from 'shared/endpoints/base'

const StepEndpoint = {
  create(businesshackId, params) {
    return request(
      `/api/businesshacks/${businesshackId}/steps`, params
    )
  },

  update(businesshackId, id, params) {
    return request(
      `/api/businesshacks/${businesshackId}/steps/${id}`, params, 'patch'
    )
  },

  delete(businesshackId, id) {
    return request(
      `/api/businesshacks/${businesshackId}/steps/${id}`, null, 'delete'
    )
  },

  sort(businesshackId, params) {
    return request(
      `/api/businesshacks/${businesshackId}/steps/sort`, params
    )
  },
}

export default StepEndpoint
