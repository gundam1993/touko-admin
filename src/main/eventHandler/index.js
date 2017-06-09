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
  console.log(global.sharedObject)
  let res = await axios.get(`${url}/api/admin/posts?pageSize=${payload.pageSize}&page=${payload.page}&search=${payload.search}`)
  console.log(res.data)
  if (res.data.success === 1) {
    event.sender.send('update-posts', res.data)
  }
}

export default {
  login,
  getPosts
}
