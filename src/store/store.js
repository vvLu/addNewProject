import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
// import mutations from './mutations'

Vue.use(Vuex)

const state = {
  userTag: '',
  isLogin: null
}

const actions = {
  getTag (context) {
    context.commit('GETTAG')
  },
  Login ({commit}) {
    commit('SET_LOGININFO', true)
  }
}

const mutations = {
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
  [types.LOGIN] (state, data) {
    localStorage.isLogin = data
    state.isLogin = data
  },
  [types.LOGOUT] (state, data) {
    state.isLogin = null
    localStorage.removeItem('isLogin')
  }
}

const getters = {
  GET_LOGININFO (state) {
    console.log(window.localStorage.getItem('loginInfo'))
    let loginInfo = state.isLogin
    if (!loginInfo) {
      loginInfo = JSON.parse(window.localStorage.getItem('loginInfo') || null)
    }
    return loginInfo
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
