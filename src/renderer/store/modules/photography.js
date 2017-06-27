const {ipcRenderer} = require('electron')

const state = {
  photos: [],
  usage: 0
}

const getters = {
  photoUsage: state => state.usage,
  photos: state => state.photos
}

const mutations = {
  GET_PHOTOS (state, payload) {
    state.photos = payload
  },
  GET_PHOTO_USAGE (state, payload) {
    state.usage = payload
  },
  DELETE_PHOTO (state, payload) {
    state.photos.splice(payload, 1)
  }
}

const actions = {
  getPhotos ({ commit }) {
    let res = ipcRenderer.sendSync('getImgInfo', {type: 'photo'})
    if (res.success) {
      commit('GET_PHOTOS', res.fileList)
    }
  },
  getPhotoUsage ({ commit }) {
    let res = ipcRenderer.sendSync('getImgUsage', {type: 'photo'})
    if (res.success) {
      commit('GET_PHOTO_USAGE', res.usage)
    }
  },
  deletePhoto ({ commit }, payload) {
    let res = ipcRenderer.sendSync('deleteImg', {type: 'photo', image: payload.name})
    if (res.success) {
      commit('DELETE_PHOTO', payload.index)
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
