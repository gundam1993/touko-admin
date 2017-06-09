<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'touko-admin',
    created () {
      let token = localStorage.getItem('touko-token')
      if (token) {
        require('electron').remote.getGlobal('sharedObject').userToken = token
      }
    }
  }
</script>

<style>
  @import url('assets/css/font.css');
  @import url('assets/css/vuetify.min.css');
  /* CSS */
  #app {
    height: 100%;
  }
</style>
