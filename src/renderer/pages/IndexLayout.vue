<template>
  <v-app id="admin-page">
    <side-bar :display='sidebar_display' :items="sidebar_item" @barChange="barChange"></side-bar>
    <tool-bar :sideIconCilck='toggleSidebar' :powerIconCilck="logout" :homeIconCilck="toHome"></tool-bar>
    <main class='main-container'>
      <v-container>
        <router-view></router-view>
        <v-snackbar :timeout="3000" :bottom="true" :right="true" 
                    v-model="$store.state.noticeDisplay" @input="noticeToggle">
          {{$store.state.noticeInfo}}
          <v-btn flat class="red--text" @click.native="">关闭</v-btn>
        </v-snackbar>
      </v-container>
    </main>
  </v-app> 
</template>

<script>
  import sidebar from '@/components/Index/Sidebar'
  import toolbar from '@/components/Index/Toolbar'
  export default {
    name: 'MainPage',
    components: {
      'side-bar': sidebar,
      'tool-bar': toolbar
    },
    data: () => ({
      sidebar_display: true,
      sidebar_item: [{
        title: '首页',
        avatar: 'home',
        route: '/'
      }, {
        title: '文章',
        avatar: 'description',
        items: [{
          title: '文章列表',
          avatar: 'list',
          route: '/posts'
        }, {
          title: '发表文章',
          avatar: 'add',
          route: '/new'
        }, {
          title: '草稿箱',
          avatar: 'inbox',
          route: '/draftbox'
        }]
      }, {
        title: '图片',
        avatar: 'photo',
        items: [{
          title: '相册管理',
          avatar: 'photo_album',
          route: '/photography'
        }, {
          title: '文章插图管理',
          avatar: 'picture_in_picture',
          route: '/post-image'
        }]
      }, {
        title: '评论',
        avatar: 'comment',
        route: '/admin/comments'
      }, {
        title: '编辑关于页面',
        avatar: 'face',
        route: '/about'
      },
      {
        title: '设置',
        avatar: 'settings',
        route: '/admin'
      }]
    }),
    methods: {
      toggleSidebar () {
        this.sidebar_display = !this.sidebar_display
      },
      barChange (e) {
        if (this.sidebar_display !== e) {
          this.sidebar_display = e
        }
      },
      logout () {
        this.$http.get('/admin/logout').then((res) => {
          if (res.data.success) {
            localStorage.removeItem('touko-blog-token')
            this.$router.push('/admin/login')
          }
        })
      },
      toHome () {
        this.$router.push('/')
      },
      noticeToggle (event) {
        if (event === false) {
          this.$store.commit('noticeOff')
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #admin-page {
    height: 100%;
    font-family: 'Roboto', 'Source Han Sans';
    background-color: #eee;
    
    .main-container {
      overflow: auto;
      height: 100%;
      width: 100%;
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
