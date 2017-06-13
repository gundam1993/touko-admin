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
      component: require('@/pages/IndexLayout'),
      children: [
        {
          path: 'posts',
          name: 'post-list-page',
          component: require('@/pages/PostListPage')
        },
        {
          path: 'draftbox',
          name: 'draft-box-page',
          component: require('@/pages/DraftboxPage')
        },
        {
          path: 'post/:postId',
          name: 'post-preview-page',
          component: require('@/pages/PostPreviewPage')
        },
        {
          path: 'new',
          name: 'new-post-page',
          component: require('@/pages/NewPostPage')
        },
        {
          path: 'edit/:postId',
          name: 'post-edit-page',
          component: require('@/pages/PostEditPage')
        },
        {
          path: 'about',
          name: 'about-page',
          component: require('@/pages/AboutPage')
        },
        {
          path: 'photography',
          name: 'photography-page',
          component: require('@/pages/Photography')
        },
        {
          path: 'post-image',
          name: 'post-image-page',
          component: require('@/pages/PostImagePage')
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
