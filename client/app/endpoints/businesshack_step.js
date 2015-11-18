const BusinesshackStepEndpoint = {
  createStep(businesshackId, title) {
    return Promise.resolve(
      $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ step: { title } }),
        url: `/api/businesshacks/${businesshackId}/steps`
      })
    )
  },

  saveStep(businesshackId, id, data) {
    return Promise.resolve(
      $.ajax({
        type: 'patch',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ step: data }),
        url: `/api/businesshacks/${businesshackId}/steps/${id}`
      })
    )
  },

  deleteStep(businesshackId, id) {
    return Promise.resolve(
      $.ajax({
        type: 'delete',
        contentType: 'application/json',
        url: `/api/businesshacks/${businesshackId}/steps/${id}`
      })
    )
  }
}

export default BusinesshackStepEndpoint
