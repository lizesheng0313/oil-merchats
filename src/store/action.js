import { apiRequest, apiRquestImage } from './api'
export default {
  actionRequest({ commit }, data) {
    return apiRequest(data)
  },
  actionRquestImage() {
    return apiRquestImage()
  }
}

