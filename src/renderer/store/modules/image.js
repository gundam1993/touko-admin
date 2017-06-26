const {ipcRenderer} = require('electron')

const state = {
  images: [],
  usage: 0,
  option: {
    token: '',
    policy: '',
    date: ''
  }
}

const getters = {
  imgUsage: state => state.usage,
  images: state => state.images
}

const mutations = {
  UPDATE_IMAGE_TOKEN_AND_POLICY (state, payload) {
    state.imageToken = payload.token
    state.imagepolicy = payload.policy
  },
  GET_IMAGES (state, payload) {
    state.images = payload
  },
  GET_USAGE (state, payload) {
    state.usage = payload
  },
  DELETE_IMAGE (state, payload) {
    state.images.splice(payload, 1)
  },
  ADD_IMAGE (state, payload) {
    state.images = payload
  }
}

const actions = {
  getImages ({ commit }) {
    let res = ipcRenderer.sendSync('getImgInfo', {type: 'image'})
    if (res.success) {
      commit('GET_IMAGES', res.fileList)
    }
  },
  getImageUsage ({ commit }) {
    let res = ipcRenderer.sendSync('getImgUsage', {type: 'image'})
    if (res.success) {
      commit('GET_USAGE', res.usage)
    }
  },
  deleteImage ({ commit }, payload) {
    let res = ipcRenderer.sendSync('deleteImg', {type: 'image', image: payload.name})
    if (res.success) {
      commit('DELETE_IMAGE', payload.index)
      return true
    }
  },
  getImageTokenAndPolicy ({ commit }, payload) {
    let res = ipcRenderer.sendSync('getImgToken', {type: 'image'})
    if (res.success) {
      commit('UPDATE_IMAGE_TOKEN_AND_POLICY', res)
      return true
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
