import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'querystring'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    selectedUser: {},
    users: [],
    isAuthenticated: false,
    error_message: ''
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    register_success (state, user) {
      state.status = 'success'
      state.isAuthenticated = false
      state.user = user
    },
    auth_success (state, token) {
      state.status = 'success'
      state.token = token
      state.isAuthenticated = true
    },
    auth_error (state, error) {
      state.status = 'error'
      state.error_message = error
    },
    auth_isEnabled (state) {
      state.isActivated = false
    },
    logout (state) {
      state.status = ''
      state.token = ''
      state.isAuthenticated = false
    },
    listUser (state, users) {
      state.users = users
    },
    deleteUser (state, id) {
      state.users[id] = null
    },
    updateUser (state, id1, user) {
      state.users[id1] = user
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        console.log(user)
        delete axios.defaults.headers.common['Authorization']
        commit('auth_request')
        axios({
          method: 'post',
          url: 'http://localhost:8081/oauth/token',
          data: qs.stringify(user),
          headers: {
            'authorization': 'Basic Z29wYWw6ZGV2Z2xhbi1zZWNyZXQ='
          }
        })
          .then(resp => {
            const token = resp.data.access_token
            localStorage.setItem('token', token)
            // Add the following line:
            console.log('login successful')
            commit('auth_success', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.state.token
            console.log(resp)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err.response.data.error_description)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({ url: 'http://localhost:8081/user', data: user, method: 'POST' })
          .then(resp => {
            commit('register_success', resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    listUser ({ commit }) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8081/users', method: 'GET' })
          .then(resp => {
            console.log(resp.data)
            commit('listUser', resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    getUser ({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8081/username/' + user, method: 'GET' })
          .then(resp => {
            console.log(resp.data)
            commit('listUser', resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    updateUser ({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8081/user/' + user.id,
          method: 'PUT',
          data: user
        })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    deleteUser ({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios({ url: 'http://localhost:8081/user/' + id,
          method: 'DELETE'
        })
          .then(resp => {
            console.log(resp.data)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        console.log('logout called')
        resolve()
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    isAuth: state => state.isAuthenticated,
    userListStore: state => state.users,
    user: state => state.user,
    errorMsg: state => state.error_message
  }
})
