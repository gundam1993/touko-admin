<template>
  <div id="new-post-page">
    <v-card class="paper-block">
      <v-card-title>
        编辑关于页面
      </v-card-title>
      <v-card-text class='pt-0'>
        <markdownEditor 
          :rows="19"
          v-model="about.content"
          :token="token"
          :policy="policy"
          imgUploadUrl="http://v0.api.upyun.com/touko-blog-img"
          imgBaseUrl="http://touko-blog-img.b0.upaiyun.com/"></markdownEditor>
      </v-card-text>
      <v-divider />
      <v-card-row actions >
        <v-btn class="mr-3" default dark large @click.native="resetPost">重置</v-btn>
        <v-btn  error light large :disabled="about.content===''" @click.native="submitAbout()">保存</v-btn>
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
    name: 'editAboutPage',
    data: () => ({
      about: {
        content: ''
      },
      msg: '',
      alert: false,
      token: '',
      policy: ''
    }),
    components: {
      markdownEditor
    },
    created () {
      this.getAboutInfo()
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
        this.about.content = ''
      },
      getAboutInfo () {
        let res = this.$ipcRenderer.sendSync('getAbout')
        if (res.success) {
          this.about = {content: res.content}
        }
      },
      submitAbout () {
        let res = this.$ipcRenderer.sendSync('submitAbout', this.about)
        if (res.success) {
          // this.$store.commit('noticeChange', { msg: '保存成功' })
          // this.$store.commit('noticeOn')
          console.log('success')
        } else {
          this.msg = res.msg
          this.alert = true
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
