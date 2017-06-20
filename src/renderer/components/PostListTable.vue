<template>
  <table class="datatable table">
    <thead style="border-bottom: 1px solid #e0e0e0">
      <tr>
        <th class='column sortable text-xs-center' v-for="item in headers">{{item.text}}</th>
      </tr> 
    </thead>
    <tbody>
      <tr v-for="(item, index) in displayInfo">
        <td class="text-xs-center title" @click="$router.push(`/post/${item.id}`)">{{ item.title }}</td>
        <td class="text-xs-center">{{ dateTransform(item.createdAt) }}</td>
        <td class="text-xs-center">{{ item.pv }}</td>
        <td class="text-xs-right">
          <v-btn
            @click.native="$router.push(`/edit/${item.id}`)"
            v-tooltip:bottom="{ html: '编辑' }"
            icon class="blue--text text--darken-2"
          >
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn
            @click.native="moveToDraftBox(item.id, index)"
            v-tooltip:bottom="{ html: '移至草稿箱' }" 
            icon class="amber--text text--lighten-1"
          >
            <v-icon>move_to_inbox</v-icon>
          </v-btn>
          <v-btn
            @click.native="showDeleteDialog(item.id, index)"
            v-tooltip:bottom="{ html: '删除' }" 
            icon class="red--text text--lighten-2"
          >
            <v-icon>delete_forever</v-icon>
          </v-btn>
        </td>
      </tr>
      <tr v-if="search === '' && info.length === 0">
        <td  class="text-xs-center" colspan="100%">暂无文章</td>
      </tr>
      <tr v-if="search !== '' && info.length === 0">
        <td  class="text-xs-center" colspan="100%">无相似文章</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="100%">
          <div class="datatable__actions">
            <div class="datatable__actions__select">
              Rows per page:
              <v-menu offset-y>
                <div class="input-group input-group--dirty input-group--light input-group--append-icon input-group--hide-details input-group--text-field input-group--select" slot="activator">
                  <div class="input-group__selections__comma">{{pageSize}}</div>
                  <i class="material-icons icon input-group__append-icon">arrow_drop_down</i>
                </div>
                <v-list>
                  <v-list-item v-for="item in pageSizeList" :key="item" @click="pageSizeChange(item, item.id, index)">
                    <v-list-tile>
                      <v-list-tile-title>{{ item }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div v-if="info.length > 0" class="datatable__actions__pagination">{{1 + pageSize * page}}-{{pageSize * page + displayInfo.length}} of {{total}}</div>
            <div v-else class="datatable__actions__pagination">0-0 of 0</div>
            <v-pagination class="pagination" v-bind:length.number="paginationLength" v-model="paginationPage" @input="pageChange" />
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
  export default {
    name: 'PostListTable',
    data: () => ({
      headers: [{text: '标题'}, {text: '日期'}, {text: '阅读'}, {text: '操作'}],
      pageSize: 10,
      page: 0,
      pageSizeList: [5, 10, 15, 20, 25, 30, 'All']
    }),
    computed: {
      total () {
        return this.info.length
      },
      paginationPage () {
        return this.page + 1
      },
      paginationLength () {
        if (this.pageSize !== 'All') {
          return Math.ceil(this.total / this.pageSize)
        } else {
          return 1
        }
      },
      displayInfo () {
        if (this.pageSize === 'All') {
          return this.info
        } else {
          let start = this.pageSize * this.page
          let end = start + this.pageSize
          return this.info.slice(start, end)
        }
      }
    },
    props: {
      info: {
        type: Array,
        default: () => ([])
      },
      search: {
        type: String,
        default: ''
      }
    },
    methods: {
      dateTransform (date) {
        let newDate = new Date(date)
        return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
      },
      pageChange (event) {
        this.page = event - 1
      },
      pageSizeChange (item) {
        this.pageSize = item
        this.page = 0
      }
    }
  }
</script>

<style lang='scss' scoped>
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
    .pagination__item--active {
      background-color: #e57373 !important;
    }
  }
  
</style>
