<template>
  <div id="post_picture" class="masonry">
    <v-card class="title-block item">
      <v-card-title>
        插图管理
        <v-subheader v-text="`已用空间: ${(this.usage / 1024 / 1024).toFixed(3)}M`"></v-subheader>
      </v-card-title>
    </v-card>
    <v-card class="item"v-for="(file, index) in fileList" :key="index">
      <v-card-row class="title-picture">
        <img :src="`https://touko-blog-img.b0.upaiyun.com/${file.name}!preview`" alt="">
        <div class="img-mark">
          <div class="img-info">
            <div class="img-name title">{{file.name}}</div>
            <div class="img-size">
              {{(file.size / 1024 > 1024) ? `${(file.size / 1024 / 1024).toFixed(3)}M` : `${(file.size / 1024).toFixed(2)}K`}}</div>
            <div class="img-date">{{getFormatDate(file.updatedAt)}}</div>
          </div>
        </div>
      </v-card-row>
      <v-divider></v-divider>
      <v-card-row actions>
        <v-btn class="blue--text text--lighten-2" icon @click.native.stop="showPreviewDia(index)">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn class="red--text text--lighten-2" icon @click.native.stop='showDeleteDia(index)'>
          <v-icon>delete_forever</v-icon>
        </v-btn>
      </v-card-row>
    </v-card>
    <v-dialog v-model="modal">
        <v-card>
          <v-card-title>确认要删除图片吗？</v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-row actions>
            <v-spacer></v-spacer>
            <v-btn flat v-on:click.native="modal = false" class="primary--text">取消</v-btn>
            <v-btn flat v-on:click.native="deleteImg()" class="primary--text">确认</v-btn>
          </v-card-row>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
  const {BrowserWindow} = require('electron').remote
  export default {
    name: 'PostPic',
    layout: 'admin',
    head: () => ({
      title: '插图管理'
    }),
    data: () => ({
      modal: false,
      chosenIndex: 0
    }),
    computed: {
      usage () {
        return this.$store.getters.imgUsage
      },
      fileList () {
        return this.$store.getters.images
      }
    },
    created () {
      this.$store.dispatch('getImages')
      this.$store.dispatch('getImageUsage')
    },
    methods: {
      getFormatDate (sec) {
        let date = new Date(Date(sec))
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      },
      showPreviewDia (index) {
        let win = new BrowserWindow({width: 800, height: 600, titleBarStyle: 'hidden-inset'})
        win.on('closed', () => {
          win = null
        })
        win.loadURL(`https://touko-blog-img.b0.upaiyun.com/${this.fileList[index].name}`)
      },
      showDeleteDia (index) {
        this.chosenIndex = index
        this.modal = true
      },
      deleteImg () {
        let image = this.fileList[this.chosenIndex].name
        let res = this.$store.dispatch('deleteImage', {index: this.chosenIndex, name: image})
        if (res) {
          this.$store.dispatch('getImageUsage')
          this.modal = false
          // this.$store.commit('noticeChange', { msg: '删除成功' })
          // this.$store.commit('noticeOn')
        } else {
          // this.$store.commit('noticeChange', { msg: '删除失败' })
          // this.$store.commit('noticeOn')
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post_picture {
    height: 100%;
  }
  .masonry {
    column-gap: 1.5rem;
    column-count: 3;

    .item {
      display: inline-block;
      background: #fff;
      margin: 0 0 .5em;
      width: 100%;
    }
  }

  @media all and (max-width: 960px) {
    .masonry {
      column-count: 2;
    }
  }

  @media all and (max-width: 921.6px) {
    .masonry {
      column-count: 1;
    }
  }
  .title-picture {
    position: relative;
    min-height: 65px;
    img {
      width: 100%;
      vertical-align: bottom;
    }

    .img-mark {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.5));

      .img-info {
        width: 100%;
        bottom: 0;
        position: absolute;
        color: white;
        padding: 0 1rem;
      }
    }
  }
</style>
