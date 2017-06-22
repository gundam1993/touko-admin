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
                @click.native="publish(props.item.id)"
                v-tooltip:bottom="{ html: '发布文章' }"
                icon class="amber--text text--lighten-1"
              >
                <v-icon>publish</v-icon>
              </v-btn>
              <v-btn
                @click.native="showDeleteDialog(props.item.id)"
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
      chosenId: '',
      modal: false,
      search: ''
    }),
    watch: {
      search (newVal, oldVal) {
        this.$store.dispatch('updateAllPosts', newVal)
      }
    },
    computed: {
      tableInfo () {
        return this.$store.getters.unpublishedPost
      }
    },
    components: {
      PostListTable
    },
    methods: {
      deletePost () {
        this.$store.dispatch('deletePost', {id: this.chosenId})
        this.modal = false
      },
      publish (id) {
        this.$store.dispatch('publishPost', {id: id})
      },
      showDeleteDialog (id) {
        event.cancelBubble = true
        this.chosenId = id
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
    }
  }
  h2 {
    text-align: center;
  }
  .info_title:hover {
    text-decoration: underline;
  }

</style>
