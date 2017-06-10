'use strict'

import axios from 'axios'
import md5 from 'md5'
const url = 'http://localhost:3000'
const login = async (event, payload) => {
  let res = await axios.post(`${url}/admin/login`, {
    username: payload.username,
    password: md5(payload.password)
  })
  event.returnValue = res.data
}

const getPosts = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/posts?display=${payload.display}&pageSize=${payload.pageSize}&page=${payload.page}&search=${payload.search}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  event.returnValue = res.data
}

const deletePosts = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/post/delete/${payload.chosenId}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  event.returnValue = res.data
}

const moveToDraftbox = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/post/move_to_draft/${payload.chosenId}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  event.returnValue = res.data
}

const publishPost = async (event, payload) => {
  let res = await axios({
    method: 'get',
    url: `${url}/api/admin/post/publish/${payload.chosenId}`,
    headers: {'X-Token': global.sharedObject.userToken}
  })
  event.returnValue = res.data
}

export default {
  login,
  getPosts,
  deletePosts,
  moveToDraftbox,
  publishPost
}
