const BusinesshackEndpoint = {
  saveBusinesshack(id, data) {
    return Promise.resolve(
      $.ajax({
        type: 'patch',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({ businesshack: data }),
        url: `/api/businesshacks/${id}`
      })
    )
  }
}

export default BusinesshackEndpoint
