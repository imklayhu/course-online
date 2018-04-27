// document.write("test page")
import Vue from 'vue'
import test from './test.vue'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#test',
  router,
  components: { test },
  template: '<test><test/>'
})