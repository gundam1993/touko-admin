<template>
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title class="pb-1">
        <v-text-field
          label="标题"
          hide-details
          v-model="post.title"
        ></v-text-field>
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          v-model="post.content"
          :token="token"
          :policy="policy"
          imgUploadUrl="http://v0.api.upyun.com/touko-blog-img"
          imgBaseUrl="https://touko-blog-img.b0.upaiyun.com"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large @click.native="resetPost">重置</v-btn>
        <v-btn class='mr-3 white--text'  warning dark large :disabled="post.title===''" @click.native="submitEdit(false)">存草稿</v-btn>
        <v-btn class='white--text' error dark large :disabled="post.title===''" @click.native="submitEdit(true)">修改</v-btn>
      </v-card-row>
    </v-card>
    <v-dialog v-model="alert">
      <v-card>
        <v-card-row>
          <v-card-text>{{msg}}</v-card-text>
        </v-card-row>
        <v-card-row actions>
          <v-btn class="red--text darken-1" flat="flat" @click.native="alert = false">确认</v-btn>
        </v-card-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import markdownEditor from '@/components/markdownEditor'
  export default {
    name: 'editPostPage',
    data: () => ({
      msg: '',
      alert: false,
      token: '',
      policy: ''
    }),
    computed: {
      postRaw () {
        return this.$store.getters.getPostById(this.$route.params.postId)
      },
      post () {
        return Object.assign({}, this.postRaw)
      }
    },
    components: {
      markdownEditor
    },
    created () {
      this.getImgToken()
    },
    methods: {
      getImgToken () {
        let res = this.$ipcRenderer.sendSync('getImgToken', {type: 'image'})
        if (res.success) {
          this.token = res.token
          this.policy = res.policy
        }
      },
      resetPost () {
        this.post.title = ''
        this.post.content = ''
      },
      submitEdit (display) {
        this.post.display = display
        let res = this.$store.dispatch('editPost', this.post)
        if (res) {
          if (display) {
            // this.$store.commit('noticeChange', { msg: '发布成功' })
            // this.$store.commit('noticeOn')
            this.$router.push('/posts')
          } else {
            // this.$store.commit('noticeChange', { msg: '保存成功' })
            // this.$store.commit('noticeOn')
          }
        } else {
          console.log('error')
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #new-post-page {
    height: 100%;

    .dialog__container {
      display: block;
    }
  }
</style>
