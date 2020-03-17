import { apiRequest } from './api'
export default {
  actionRequest({ commit }, data) {
    return apiRequest(data)
  }
}

