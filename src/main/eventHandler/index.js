'use strict'

import axios from 'axios'
import md5 from 'md5'
const url = 'http://localhost:3000'
const login = async (event, payload) => {
  let res = await axios.post(`${url}/admin/login`, {
    username: payload.username,
    password: md5(payload.password)
  })
  if (res.data.success === 1) {
    event.sender.send('login-success', res.data)
  } else {
    event.sender.send('login-fail', res.data)
  }
}

const getPosts = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/posts?display=${payload.display}&pageSize=${payload.pageSize}&page=${payload.page}&search=${payload.search}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  if (res.data.success === 1) {
    event.sender.send('update-posts', res.data)
  }
}

const deletePosts = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/post/delete/${payload.chosenId}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  if (res.data.success === 1) {
    event.sender.send('delete-success', res.data)
  }
}

export default {
  login,
  getPosts,
  deletePosts
}
