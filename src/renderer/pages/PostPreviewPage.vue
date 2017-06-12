<template>
  <div id="post-preview-page">
    <div id="preview-block">
      <v-card class="paper-block">
        <v-card-row>
          <div class="createdAt">
            {{dateTransform(post.createdAt)}}
          </div>
        </v-card-row>
        <v-card-title>
          <h3>{{post.title}}</h3>
        </v-card-title>
        <v-card-row>
          <PostDisplayer :content="post.content"></PostDisplayer>
        </v-card-row>
      </v-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import PostDisplayer from '@/components/PostDisplayer'
  export default {
    name: 'PostPreviewtPage',
    components: {
      PostDisplayer
    },
    data: () => ({
      post: {
        title: '',
        content: '',
        createdAt: ''
      }
    }),
    created () {
      this.getPost()
    },
    methods: {
      getPost () {
        let id = this.$route.params.postId
        let res = this.$ipcRenderer.sendSync('getPostById', {postId: id})
        if (res.success === 1) {
          this.post = res.post
        }
      },
      dateTransform (date) {
        return moment(date).format('MMMM Do YYYY')
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-preview-page {
    height: 100%;
    
    .paper-block {
      margin: auto;
      padding: 1rem;
    }

    .createdAt {
      color: #979797;
      font-weight: bold;
      font-size: 1.3rem;
    }

    .main-content  {
      padding: 0 16px;
      width: 100%;
    }
    
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
