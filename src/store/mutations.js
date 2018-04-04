import * as types from './types'

export default {
  [types.TAG] (state) {
    if (document.cookie.length > 0) {
      var arr = document.cookie.split('; ')
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split('=') // 再次切割
        console.log(arr2)
        // 判断查找相对应的值
        if (arr2[0] === 'userTag') {
          state.userTag = arr2[1]
        }
      }
    }
  },
  SET_LOGININFO (state, data) {
    state.isLogin = data
  }
}
