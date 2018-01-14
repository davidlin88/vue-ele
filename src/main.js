import Vue from 'vue'
import router from './router/index.js'
import app from './app'
import './mock/mockServer' // 引入加载模块
import './common/stylus/fonts.styl'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(app)
})
