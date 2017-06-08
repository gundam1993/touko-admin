import Vue from 'vue'
import axios from 'axios'
import vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'
const {ipcRenderer} = require('electron')

Vue.use(vuetify)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.ipcRenderer = Vue.prototype.$ipcRenderer = ipcRenderer

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
