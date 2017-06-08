import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// router.beforeEach((to, from, next) => {
//   console.log(to)
// })

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login-page',
      component: require('@/components/LoginPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
