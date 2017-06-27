const {ipcRenderer} = require('electron')

const state = {
  images: [],
  usage: 0
}

const getters = {
  imgUsage: state => state.usage,
  images: state => state.images
}

const mutations = {
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
    state.images.unshift(payload)
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
  }
  // addImage({ commit }, payload) {
    // let
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
