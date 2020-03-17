
import $fly from '@/utils/request'


export function apiRequest(data) {
  return $fly.request({
    method: "post",
    url: '/dataService',
    body:data
  })
}
