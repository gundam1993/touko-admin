<template>
  <div id="post-displayer">
    <article class="post-view" v-html="marked(content)"></article>
  </div>
</template>

<script>
  import marked from 'marked'
  export default {
    name: 'PostDisplayer',
    data: () => ({
      marked: {}
    }),
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    created () {
      this.marked = marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        langPrefix: 'hljs ',
        highlight: function (code) {
          return require('highlight.js').highlightAuto(code).value
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import url('../assets/css/post.css');
  @import url('../assets/css/highlight.min.css');
</style>
