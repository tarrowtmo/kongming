import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token') || '',
    // information: JSON.parse(sessionStorage.getItem('information')) || {}
    information: sessionStorage.getItem('userInfo') || '',
    userImg: sessionStorage.getItem('userImg') || '',
    actived: (sessionStorage.getItem('actived') - 0) || 0,
    formUser: sessionStorage.getItem('formUser') || ''
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
    // 保存steps的actived
    setActived(state, actived) {
      sessionStorage.setItem('actived', actived)
      if (actived > 2) {
        actived = 0
      }
      state.actived = actived
    },
    // 保存需要更改的用户
    setFormUser(state, formUser) {
      sessionStorage.setItem('formUser', formUser)
      state.formUser = formUser
    },
    // 删除steps的计数
    deleteActived(state) {
      sessionStorage.removeItem('actived')
      state.actived = 0
    },
    // 删除需要更改的用户
    deleteFormUser(state) {
      sessionStorage.removeItem('formUser')
      state.formUser = ''
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
    // 更新actived
    updataActived(context, value) {
      context.commit('setActived', value)
    },
    removeToken(context) {
      context.commit('deleteToken')
    },
    removeInformation(context) {
      context.commit('deleteUserInfo')
    },
    removeUserImg(context) {
      context.commit('deleteUserImg')
    },
    // 删除需要更改的用户
    removeActived(context) {
      context.commit('deleteActived')
    },
    removeFormUser(context) {
      context.commit('deleteFormUser')
    }
  }
})

export default store
