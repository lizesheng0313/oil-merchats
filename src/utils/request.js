import store from '../store'
var Fly = require("flyio/dist/npm/wx");
const $fly = new Fly()
$fly.interceptors.request.use((request) => {
  request.headers = {
    "X-Tag": "flyio",
    'content-type': 'application/json'
  };
  if (store.state.token) {
    request.headers['Cookie'] = store.state.token
    request.headers['Token'] = store.state.token
  }
  let dataMsg = {
    Head: {
      channel: "06",
      version: "1.0",
      appCode: "shop",
      service: "dataQuery",
      sid: "",
      cReqTime: ""
    },
    Body: request.body
  }
  if (request.body && request.body.head) {
    dataMsg.Head = { ...dataMsg.Head, ...request.body.head }
    delete dataMsg.Body.head
  }
  request.body = dataMsg;
  wx.showNavigationBarLoading()
  return request
})

$fly.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading();
    if (response.data.Head.service === 'userLogin') {
      if (response.data.Head.state !== 'succ') {
        wx.showToast({
          title: response.data.Head.msg,
          icon: 'none'
        })
      }
      return promise.resolve(response)
    }
    // if (response.data.Head.code === 'pi1003') {
    //   wx.reLaunch({
    //     url: '/pages/login/main'
    //   })
    // }

    if (response.data.Head.state !== 'succ') {
      wx.showToast({
        title: response.data.Head.msg,
        icon: 'none'
      })
    }
    else {
      wx.hideLoading();
      return promise.resolve(response.data)
    }
  },
  (err, promise) => {
    console.log(err)
    if (err.request.url === '/imageCode1Base64') {
      return promise.resolve(err)
    }
    else {
      wx.hideNavigationBarLoading();
      wx.showToast({
        title: err.message,
        icon: 'none'
      })
      return promise.reject()
    }
  }
)

$fly.config.baseURL = BASE_URL;
export default $fly
