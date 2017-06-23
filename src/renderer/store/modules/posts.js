const {ipcRenderer} = require('electron')

const state = {
  posts: []
}

const getters = {
  publishedPost: state => {
    return state.posts.filter(post => post.display)
  },
  unpublishedPost: state => {
    return state.posts.filter(post => !post.display)
  },
  getPostById: state => {
    return (id) => (
      state.posts.filter(post => post.id === parseInt(id))[0]
    )
  }
}

const mutations = {
  UPDATE_ALL_POSTS (state, payload) {
    state.posts = payload.posts
  },
  ADD_NEW_POST (state, payload) {
    state.posts.push(payload)
  },
  DELETE_POST (state, payload) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === payload.id) {
        state.posts.splice(i, 1)
        return
      }
    }
  },
  MOVE_TO_DRAFTBOX (state, payload) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === payload.id) {
        state.posts[i].display = false
        return
      }
    }
  },
  PUBLISH_POST (state, payload) {
    for (let i = 0; i < state.posts.length; i++) {
      if (state.posts[i].id === payload.id) {
        state.posts[i].display = true
        return
      }
    }
  },
  EDIT_POST (state, payload) {
    state.posts[payload.index] = payload.post
  }
}

const actions = {
  updateAllPosts ({ commit }, payload) {
    let res = ipcRenderer.sendSync('getPostList', { search: payload })
    if (res.success) {
      commit('UPDATE_ALL_POSTS', {posts: res.posts})
    }
  },
  moveToDraftbox ({ commit }, payload) {
    let res = ipcRenderer.sendSync('moveToDraftbox', payload)
    if (res.success) {
      commit('MOVE_TO_DRAFTBOX', payload)
    }
  },
  publishPost ({ commit }, payload) {
    let res = ipcRenderer.sendSync('publishPost', payload)
    if (res.success) {
      commit('PUBLISH_POST', payload)
    }
  },
  deletePost ({ commit }, payload) {
    let res = ipcRenderer.sendSync('deletePost', payload)
    if (res.success) {
      commit('DELETE_POST', payload)
    }
  },
  addNewPost ({ commit }, payload) {
    let res = ipcRenderer.sendSync('submitPost', payload)
    console.log(res)
    if (res.success) {
      commit('ADD_NEW_POST', res.post)
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
