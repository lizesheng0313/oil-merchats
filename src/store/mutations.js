import * as ACT from './actionTypes';

export default {
  // 更新token
  [ACT.UPDATETOKEN](state, token) {
    state.token = token
  }
}
