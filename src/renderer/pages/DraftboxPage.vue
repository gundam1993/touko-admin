<template>
  <div id="post-list-page">
    <div id="table-block">
      <v-card class="paper-block">
        <v-card-title>
          草稿箱
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="搜索"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-card-title>
        <v-card-row>
          <PostListTable :info='tableInfo'>
            <template slot="buttons" scope="props">
              <v-btn
                @click.native="$router.push(`/edit/${item.id}`)"
                v-tooltip:bottom="{ html: '编辑' }"
                icon class="blue--text text--darken-2"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                @click.native="publish(item.id, index)"
                v-tooltip:bottom="{ html: '发布文章' }"
                icon class="amber--text text--lighten-1"
              >
                <v-icon>publish</v-icon>
              </v-btn>
              <v-btn
                @click.native="showDeleteDialog(item.id, index)"
                v-tooltip:bottom="{ html: '删除' }"
                icon class="red--text text--lighten-2"
              >
                <v-icon>delete_forever</v-icon>
              </v-btn>
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
      search: '',
      ready: false
    }),
    watch: {
      search (newVal, oldVal) {
        this.getTableInfo(this.pageSize, 0, newVal)
      }
    },
    components: {
      PostListTable
    },
    created: function () {
      this.tableInfo = this.$store.getters.unpublishedPost
    },
    methods: {
      getTableInfo (pageSize, page, search) {
        let res = this.$ipcRenderer.sendSync('getPostList', {
          pageSize: pageSize,
          page: page,
          search: search,
          display: 'false'
        })
        if (res.success) {
          this.tableInfo = res.posts
          this.total = res.total
          this.ready = true
        }
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
      publish (id, index) {
        this.chosenId = id
        this.chosenIndex = index
        let res = this.$ipcRenderer.sendSync('publishPost', {chosenId: id})
        this.removePost(res)
      },
      showDeleteDialog (id, index) {
        event.cancelBubble = true
        this.chosenId = id
        this.chosenIndex = index
        this.modal = true
      }
    }
  }
</script>

<style lang='scss' scoped>
  #post-list-page {
    height: 100%;

    .paper-block {
      margin: auto;
    }

    #table-block {
      height: 100%;

      .loading {
        height: 550px;
        width: 100%;
        text-align: center;
      }

      .datatable.table {
        tbody tr td.title {
          width: 50%;
          cursor: pointer;

          a {
            color: rgba(0,0,0,.87);
            text-decoration: none;
          }
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
      .pagination {
        float: right;
        .pagination__item--active {
          background-color: #e57373 !important;
        }
      }
    }
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
