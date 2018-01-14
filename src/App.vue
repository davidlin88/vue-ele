<template>
  <div>
    <ele-header :seller="seller"></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from './components/header/header.vue'
// import axios from 'axios'

export default {
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'ele-header': header
  },
  created () {
    // 写死数据
    let data = require('../data.json')
    this.seller = data.seller
    // axios.get('api2/seller').then((res) => {
    //   const result = res.data
    //   console.log(result.data)
    //   if (result.code === 0) {
    //     this.seller = result.data
    //   }
    // })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl'

.tab
  display flex
  width 100%
  height 40px
  line-height 40px
  border-bottom 1px solid rgba(7,17,27,.1)
  .tab-item
    flex 1
    text-align center
    & > a
      display block
      font-size 14px
      color rgb(77,85,93)
      &.active
        color rgb(240,20,20)
</style>
