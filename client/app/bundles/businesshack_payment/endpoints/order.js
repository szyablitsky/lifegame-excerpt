import request from 'shared/endpoints/base'

const OrderEndpoint = {
  create(params) {
    return request('/orders', params)
  },
}

export default OrderEndpoint
