const {ipcRenderer} = require('electron')

const state = {
  about: {}
}

const getters = {
  aboutInfo: state => {
    return state.about
  }
}

const mutations = {
  UPDATE_ABOUT_INFO (state, payload) {
    state.about = payload
  }
}

const actions = {
  updateAboutInfo ({ commit }, payload) {
    let res = ipcRenderer.sendSync('getAbout')
    if (res.success) {
      commit('UPDATE_ABOUT_INFO', {content: res.content})
    }
  },
  editAboutInfo ({ commit }, payload) {
    let res = ipcRenderer.sendSync('submitAbout', payload)
    if (res.success) {
      commit('UPDATE_ABOUT_INFO', payload)
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
