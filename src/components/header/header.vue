<template>
  <div class="header">

    <div class="content-wrapper">
      <!-- 店铺头像 -->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <!-- 介绍 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 支持服务 -->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!-- 服务数量 -->
      <div class="supports_count" v-if="seller.supports" @click="showDetail(true)">
        <span class="count">{{seller.supports.length}}个</span>
        <!-- 为什么上面span下面i -->
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>

    <!-- 公告 -->
    <div class="bulletin-wrapper" @click="showDetail(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- 详情 -->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main clearfix">
            <div class="name">{{seller.name}}</div>
            <!-- 星星 -->
            <v-star class="star-wrapper" :score="seller.score" :size="48">star组件内容</v-star>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 服务 -->
            <ul class="supports" v-if="seller.supports">
              <li class="support" v-for="item in seller.supports">
                <span class="icon" :class="classMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!-- 公告 -->
            <div class="content">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- 关闭 -->
        <div class="detail-close" @click="showDetail(false)">
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import star from '../star/star.vue'
export default{
  props: ['seller'],
  data () {
    return {
      detailShow: false
    }
  },
  components: {
    'v-star': star
  },
  created () {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    showDetail (isShow) {
      this.detailShow = isShow
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
  
.header
  position relative
  color #fff
  overflow hidden
  background-color rgba(7,17,27,.5)
  .content-wrapper
    position relative
    padding 24px 12px 18px 24px
    font-size 0
    .avatar
      display inline-block
      vertical-align top
    .content
      display inline-block
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          margin-left 6px
          vertical-align top
          bg-image(brand)
          display inline-block
          width 30px
          height 18px
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 5px
          font-size 16px
          line-height 18px
          font-weight bold
      .description
        font-size 12px
        font-weight 200
        line-height 12px
      .support
        margin 10px 0 2px 0
        .icon
          margin-right 4px
          vertical-align top
          display inline-block
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          &.decrease
            bg-image(decrease_1)
          &.discount
            bg-image(discount_1)
          &.guarantee
            bg-image(guarantee_1)
          &.invoice
            bg-image(invoice_1)
          &.special
            bg-image(special_1)
        .text
          font-size 10px
          font-weight 200
          line-height 12px
    .supports_count
      position absolute
      right 12px
      bottom 15px
      height 24px
      padding 7px 8px
      border-radius 8px
      background-color rgba(0,0,0,.2)
      box-sizing border-box
      .count
        vertical-align top
        font-size 10px
        line-height 12px
        font-weight 200
        margin-right 2px
      .icon-keyboard_arrow_right
        font-size 10px
        line-height 12px
        font-weight 200
  .bulletin-wrapper
    background-color rgba(7,17,27,.2)
    position relative
    padding 0 20px 0 12px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    display block
    .bulletin-title
      vertical-align middle
      display inline-block
      width 22px
      height 12px
      bg-image(bulletin)
      background-size 100% 100%
      background-repeat no-repeat
      border none
    .bulletin-text
      font-size 10px
      line-height 28px
    .icon-keyboard_arrow_right
      position absolute
      right 12px
      bottom 9px
      font-size 10px
        
  .background
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    z-index -1
    img
      filter:blur(10px)
        
  .detail
    position fixed
    left 0
    top 0
    z-index 100
    width 100%
    height 100%
    background rgba(7,17,27,.8)
    overflow auto
    transition .5s
    backdrop-filter blur(10px)
    &.fade-enter
      opacity 0
    &.fade-leave-to
      opacity 0
    .detail-wrapper
      display inline-block
      width 100%
      min-height 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          text-align center
          font-size 16px
          line-height 16px
          font-weight 700
        .star-wrapper
          margin-top 16px
          text-align center
        .title
          display flex
          width 80%
          margin 28px auto 24px
          .text
            text-align center
            padding 0 12px
          .line
            flex 1
            position relative
            top -6px
            border-bottom 2px solid rgba(255,192,203,.3)
            
        .supports
          width 80%
          padding 0 12px
          margin 0 auto
          .support
            margin-bottom 12px
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              background-repeat no-repeat
              vertical-align top
              margin-right 6px
              &.discount
                bg-image(discount_2)
              &.decrease
                bg-image(decrease_2)
              &.guarantee
                bg-image(guarantee_2)
              &.invoice
                bg-image(invoice_2)
              &.special
                bg-image(special_2)
            .text
              font-size 12px
              line-height 12px
              font-weight 200
            
        .content
          width 80%
          padding 0 12px
          margin 0 auto
          font-size 12px
          line-height 24px
          font-weight 200
            
    .detail-close
      margin-top -64px
      clear both
      text-align center
      .icon-close
        display inline-block
        width 32px
        height 32px 
        font-size 32px

</style>