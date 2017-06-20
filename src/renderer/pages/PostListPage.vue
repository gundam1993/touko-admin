<template>
  <div id="post-list-page">
    <div id="table-block">
      <v-card class="paper-block">
        <v-card-title>
          文章列表
          <v-spacer></v-spacer>
          <v-text-field class='search'
            append-icon="search"
            label="搜索"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-card-row>
         <PostListTable :info='tableInfo'>
          <template slot="line" scope="props">
            <tr>
              <td class="text-xs-center title" @click="$router.push(`/post/${props.item.id}`)">{{ props.item.title }}</td>
              <td class="text-xs-center">{{ dateTransform(props.item.createdAt) }}</td>
              <td class="text-xs-center">{{ props.item.pv }}</td>
              <td class="text-xs-right">
                <v-btn
                  @click.native="$router.push(`/edit/${props.item.id}`)"
                  v-tooltip:bottom="{ html: '编辑' }"
                  icon class="blue--text text--darken-2"
                >
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn
                  @click.native="moveToDraftBox(props.item.id, index)"
                  v-tooltip:bottom="{ html: '移至草稿箱' }" 
                  icon class="amber--text text--lighten-1"
                >
                  <v-icon>move_to_inbox</v-icon>
                </v-btn>
                <v-btn
                  @click.native="showDeleteDialog(props.item.id, index)"
                  v-tooltip:bottom="{ html: '删除' }" 
                  icon class="red--text text--lighten-2"
                >
                  <v-icon>delete_forever</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
         </PostListTable>
        </v-card-row>
      </v-card>
      <v-dialog v-model="modal" title="Alert Dialog">
          <v-card>
            <v-card-title>确认要删除文章吗？</v-card-title>
            <v-card-text>
            </v-card-text>
            <v-card-row actions>
              <v-spacer></v-spacer>
              <v-btn flat v-on:click.native="modal = false" class="primary--text">取消</v-btn>
              <v-btn flat v-on:click.native="deletePost()" class="primary--text">确认</v-btn>
            </v-card-row>
          </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
  import PostListTable from '@/components/PostListTable'
  export default {
    name: 'PostListPage',
    data: () => ({
      tableInfo: [],
      chosenId: '',
      chosenIndex: 0,
      modal: false,
      total: 0,
      page: 0,
      pageSize: 10,
      pageSizeList: [5, 10, 15, 20, 25, 30, 'All'],
      search: '',
      ready: false
    }),
    computed: {
      paginationPage () {
        return this.page + 1
      },
      paginationLength () {
        if (this.pageSize !== 'All') {
          return Math.ceil(this.total / this.pageSize)
        } else {
          return 1
        }
      }
    },
    watch: {
      search (newVal, oldVal) {
        this.getTableInfo(this.pageSize, 0, newVal)
      }
    },
    components: {
      PostListTable
    },
    created () {
      // this.getTableInfo(this.pageSize, 0, '')
      this.tableInfo = this.$store.getters.publishedPost
      this.total = this.tableInfo.length
    },
    beforeDestroy () {

    },
    methods: {
      getTableInfo (pageSize, page, search) {
        let res = this.$ipcRenderer.sendSync('getPostList', {
          pageSize: pageSize,
          page: page,
          search: search
        })
        if (res.success) {
          this.tableInfo = res.posts
          this.total = res.total
          this.ready = true
        }
      },
      dateTransform (date) {
        let newDate = new Date(date)
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
      },
      deletePost () {
        let res = this.$ipcRenderer.sendSync('deletePosts', {chosenId: this.chosenId})
        this.removePost(res)
      },
      removePost (res) {
        if (res.success) {
          this.tableInfo.splice(this.chosenIndex, 1)
          this.total --
          this.modal = false
            // this.$store.commit('noticeChange', { msg: '删除成功' })
            // this.$store.commit('noticeOn')
        }
      },
      moveToDraftBox (id, index) {
        this.chosenId = id
        this.chosenIndex = index
        let res = this.$ipcRenderer.sendSync('moveToDraftbox', {chosenId: id})
        this.removePost(res)
      },
      showDeleteDialog (id, index) {
        event.cancelBubble = true
        this.chosenId = id
        this.chosenIndex = index
        this.modal = true
      },
      pageSizeChange (item) {
        this.pageSize = item
        this.page = 0
        this.getTableInfo(this.pageSize, this.page, this.search)
      },
      pageChange (event) {
        this.page = event - 1
        this.getTableInfo(this.pageSize, event - 1, this.search)
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-list-page {
    height: 100%;

    .paper-block {
      width: 100%;
      height: 100%;
      margin: auto;
    }

    #table-block {
      height: 100%;

      .loading {
        height: 550px;
        width: 100%;
        text-align: center;
      }
    }
  }
  .search {
    margin: 0.3rem 0;
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
