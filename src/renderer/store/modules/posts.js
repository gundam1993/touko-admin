const {ipcRenderer} = require('electron')

const state = {
  posts: []
}

const getters = {
  publishedPost: state => {
    return state.posts.filter(post => post.display)
  }
}

const mutations = {
  UPDATE_ALL_POSTS (state, payload) {
    state.posts = payload.posts
  },
  ADD_NEW_POST (state, payload) {
    state.posts.push(payload.post)
  },
  DELETE_POST (state, payload) {
    state.posts.splice(payload.index, 1)
  },
  MOVE_TO_DRAFTBOX (state, payload) {
    state.posts[payload.index].display = false
  },
  PUBLISH_POST (state, payload) {
    state.posts[payload.index].display = true
  },
  EDIT_POST (state, payload) {
    state.posts[payload.index] = payload.post
  }
}

const actions = {
  updateAllPosts ({ commit }) {
    let res = ipcRenderer.sendSync('getPostList', {
      pageSize: 10,
      page: 0,
      search: ''
    })
    if (res.success) {
      commit('UPDATE_ALL_POSTS', {posts: res.posts})
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
