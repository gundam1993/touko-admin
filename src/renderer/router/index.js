import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: require('@/pages/LoginPage')
    },
    {
      path: '/',
      name: 'index',
      component: require('@/pages/Index'),
      children: [
        {
          path: 'posts',
          name: 'post-list-page',
          component: require('@/pages/posts')
        },
        {
          path: 'draftbox',
          name: 'draft-box-page',
          component: require('@/pages/draftbox')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('touko-token')
  if (token && to.name === 'login-page') {
    next('/')
  } else if (!token && to.name !== 'login-page') {
    next('/login')
  } else {
    next()
  }
})

export default router
