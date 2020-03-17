import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

import mutations from './mutations'
import actions from './action'


export default new Vuex.Store({
  state: {
    preferentialObj: {
      id: "",
      ticketName: ""
    },
    token: '',
    userInfo: {},
    location: {
      province: "",
      longitude: "",
      city: "",
      country: "",
      latitude: "",
      content: ""
    },
    //添加修改地址
    addAddress: {
      lat: "",
      lnt: "",
      addr: "",
      adcode: ""
    },
    selectAddress: {
      phone: "",
      receiver: "",
      addr: ""
    },
    agent: {}
  },
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, value) => wx.setStorageSync(key, value),
      removeItem: key => function () {
        wx.removeStorageSync(key)
      }
    }
  })]
})
