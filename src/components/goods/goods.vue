<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(item, index) in goods" :class="{current:currentIndex === index}" @click="clickMenuItem(index, $event)">
            <!-- border-1px有何用? -->
            <span class="text border-1px">
              <span class="icon" v-if="item.type > 0" :class="classMap[item.type]"></span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!-- hook是什么? -->
          <li class="food-list food-list-hook" v-for="item in goods">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="food in item.foods" @click="clickFood(food, $event)">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">
                      ¥{{food.price}}
                    </span>
                    <span class="old" v-show="food.oldPrice">
                      ¥{{food.oldPrice}}
                    </span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food" :updateFoodCount="updateFoodCount"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <food :food="selectFood" :update-food-count="updateFoodCount" ref="food"></food>

    <shopcart :food-list="foodList" :minPrice="seller.minPrice" :delivery-price="seller.deliveryPrice" :update-food-count="updateFoodCount" @clear="clearCart" ref="shopcart"></shopcart>
  </div>
</template>

<script>
// import axios from 'axios'
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol.vue'
import shopcart from '../shopcart/shopcart.vue'
import food from '../food/food.vue'

export default{
  props: ['seller'],
  components: {
    cartcontrol,
    shopcart,
    food
  },
  data () {
    return {
      goods: [],
      selectFood: {},
      tops: [],
      scrollY: 0,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },

  created () {
    // axios.get('api/goods').then((res) => {
    //   if (res.data.code === 0) {
    //     this.goods = res.data.data
    //   }
    // })
    // 写死数据
    let data = require('../../../data.json')
    this.goods = data.goods
    this.$nextTick(() => {
      this._initScroll()
      this._initTops()
    })
  },

  methods: {
    clickFood (food, event) {
      if (!event._constructed) {
        return
      }
      console.log(this.$refs.food)
      this.selectFood = food
      this.$refs.food.showOrHide(true)
    },
    clearCart () {
      this.foodList.forEach(food => {
        food.count = 0
      })
    },
    updateFoodCount (food, isAdd, event) {
      // 过滤系统的点击回调
      if (isAdd) {
        this.$refs.shopcart.drop(event.target)
        if (!food.count) { // 第一次
          Vue.set(food, 'count', 1)
        } else {
          food.count++
        }
      } else {
        if (food.count) { // 减到0就不能减了
          food.count--
        }
      }
    },
    _initScroll () {
      // 创建分类列表的Scroll对象
      // eslint-disable-next-line
      new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // 创建food列表的Scroll对象
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监视foods的滚动
      this.foodsScroll.on('scroll', (pos) => {
        console.log(pos.x + '~' + pos.y)
        this.scrollY = Math.abs(pos.y)
      })
    },
    // 获取右侧食品大分类的高度clientHeight数组
    _initTops () {
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let top = 0
      this.tops.push(top)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        top += item.clientHeight
        this.tops.push(top)
      }
      console.log(this.tops)
    },
    // 右随左变
    clickMenuItem (index, event) {
      console.log(event._constructed, -this.tops[index])
      // 过滤掉原生DOM事件?
      if (!event._constructed) {
        return
      }
      // 将右铡的列表滚动到对应的位置
      const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      const el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    }
  },

  computed: {
    foodList () {
      // 找出所有count大于0的food
      const foods = []
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    // 左随右变
    currentIndex () {
      return this.tops.findIndex((top, index) => {
        // scrollY大于或等于当前的top, 且小于下一个top
        return this.scrollY >= top && this.scrollY < this.tops[index + 1]
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.goods
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      padding 0 12px
      line-height 14px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #fff
        font-weight 700
        .text
          border none
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display table-cell
        width 56px
        vertical-align middle
        border-1px(rgba(7,17,27,.1))
        font-size 12px
  .foods-wrapper
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, .1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-left 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>