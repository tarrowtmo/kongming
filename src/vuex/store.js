import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    // information: JSON.parse(sessionStorage.getItem('information')) || {}
    information: sessionStorage.getItem('userInfo') || '',
    userImg: sessionStorage.getItem('userImg') || ''
  },
  mutations: {
    // 保存token
    setToken(state, token) {
      sessionStorage.setItem('token', token)
      state.token = token
    },
    // 保存用户登录信息
    setUserInfo(state, information) {
      sessionStorage.setItem('userInfo', information)
      state.information = information
    },
    // 保存用户头像
    setUserImg(state, userImg) {
      sessionStorage.setItem('userImg', userImg)
      state.userImg = userImg
    },
    // 删除token
    deleteToken(state) {
      sessionStorage.removeItem('token')
      state.token = ''
    },
    // 删除用户登录信息
    deleteUserInfo(state) {
      sessionStorage.removeItem('userInfo')
      state.information = ''
    },
    // 删除用户头像
    deleteUserImg(state) {
      sessionStorage.removeItem('userImg')
      state.userImg = ''
    }
  },
  actions: {
    updatetoken(context, value) {
      context.commit('setToken', value)
    },
    updateInformation(context, value) {
      context.commit('setUserInfo', value)
    },
    updateUserImg(context, value) {
      context.commit('setUserImg', value)
    },
    removeToken(context) {
      context.commit('deleteToken')
    },
    removeInformation(context) {
      context.commit('deleteUserInfo')
    },
    removeUserImg(context) {
      context.commit('deleteUserImg')
    }
  }
})

export default store
