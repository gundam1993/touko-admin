'use strict'

import axios from 'axios'
import md5 from 'md5'
const url = 'http://localhost:3000'
const loginHandler = async (event, payload) => {
  let res = await axios.post(`${url}/admin/login`, {
    username: payload.username,
    password: md5(payload.password)
  })
  console.log(res)
}

export default {
  loginHandler
}
