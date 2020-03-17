import * as ACT from './actionTypes';

export default {
  // 更新token
  [ACT.UPDATETOKEN](state, token) {
    state.token = token
  },
  [ACT.SETAGENT](state, obj) {
    state.agent = { ...obj }
  },
  [ACT.SETCURRENTADD](state, obj) {
    state.selectAddress = { ...state.selectAddress, ...obj }
  },
  //用户信息
  [ACT.UPDATEUSERINFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [ACT.UPDATEDLOCATION](state, obj) {
    state.location = { ...state.location, ...obj }
  },
  [ACT.UPDATEADDRESS](state, obj) {
    state.addAddress.lat = obj.lat;
    state.addAddress.lnt = obj.lnt;
    state.addAddress.addr = obj.addr;
    state.addAddress.province = obj.province;
    state.addAddress.city = obj.city;
    state.addAddress.country = obj.country;
  },
  [ACT.SETPROID](state, obj) {
    state.preferentialObj.id = obj.id;
    state.preferentialObj.ticketName = obj.ticketName;
  }
}
