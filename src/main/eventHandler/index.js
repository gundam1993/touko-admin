'use strict'

import axios from 'axios'
import md5 from 'md5'
const host = 'http://localhost:3000'

const request = async (event, url, method, data = {}) => {
  let res = await axios({
    method: method,
    url: `${host}${url}`,
    headers: {'X-Token': global.sharedObject.userToken},
    data: data
  })
  event.returnValue = res.data
}

const login = async (event, payload) => {
  let res = await axios.post(`${host}/admin/login`, {
    username: payload.username,
    password: md5(payload.password)
  })
  event.returnValue = res.data
}

const getPostList = async (event, payload) => {
  let url = `/api/admin/posts?display=${payload.display}&pageSize=${payload.pageSize}&page=${payload.page}&search=${payload.search}`
  request(event, url, 'get')
}

const deletePosts = async (event, payload) => {
  let url = `/api/admin/post/delete/${payload.chosenId}`
  request(event, url, 'get')
}

const moveToDraftbox = async (event, payload) => {
  let url = `/api/admin/post/move_to_draft/${payload.chosenId}`
  request(event, url, 'get')
}

const publishPost = async (event, payload) => {
  let url = `/api/admin/post/publish/${payload.chosenId}`
  request(event, url, 'get')
}

const getPostById = async (event, payload) => {
  let url = `/api/post/${payload.postId}`
  request(event, url, 'get')
}

const getImgToken = async (event, payload) => {
  let url = `/api/admin/get_img_token/${payload.type}`
  request(event, url, 'get')
}

const submitPost = async (event, payload) => {
  let url = `/api/admin/posts/new`
  request(event, url, 'post', payload)
}

const getPost = async (event, payload) => {
  let url = `/api/admin/post/${payload.postId}`
  request(event, url, 'get')
}

const submitEdit = async (event, payload) => {
  let url = `/api/admin/post/${payload.id}`
  request(event, url, 'post', payload)
}

export default {
  login,
  getPostList,
  deletePosts,
  moveToDraftbox,
  publishPost,
  getPostById,
  getImgToken,
  submitPost,
  getPost,
  submitEdit
}
