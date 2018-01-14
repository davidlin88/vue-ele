# 小鱼干
* 淡入淡出动画:
```
.detail // 动画对象
  transition .5s
.fade-enter, .fade-leave-to // 淡入开始与淡出结束状态
  opacity 0
```
* `img`的无src文件时,会有灰色边框,解决方法:换成span标签
* `filter:blur(10px)`高斯模糊
* `backdrop-filter blur(10px)`背景高斯模糊
* `this.$refs.xxx`可用来获取dom节点或子组件和他们的属性/方法:
```
<menuNav ref="menuNav"></menuNav>
<div id="app">
  <input type="text" ref="input1"/>
  <button @click="change">添加</button>
</div>

<script>
new Vue({
  el: "#app",
  methods: {
  change:function(){
    this.$refs.input1.value ="22" // 减少获取dom节点的消耗
    this.$refs.menuNav.style.color = "#333"
    }
  }
})
</script>

```
* `this.$nextTick`:在下次 DOM 更新循环结束之后执行延迟回调
* `clientHeight`:不包含边框(padding/border)和滚动条的高度
* 在vue实例的字符串中调用data的方法(用\`而非引号来包裹字符串):``需付${this.totalPrice}``
* 根组件到子路由的传参方式:
```
<keep-alive>
  <router-link :seller="seller"></router-link>
</keep-alive>
```
* `Array.shift()`:删除数组第一个元素,并返回第一个元素的值
* `this.$refs.food.showOrHide(true)`调用子组件及其方法
* 父元素的任何`transform`属性会使子元素的`position:fixed`属性失效.解决办法:将需要fixed的元素移出来
* `event.target`作参数:代指触发事件的dom元素
* 为在pages上预览,写死数据:
```
let data = require('../data.json')
this.seller = data.seller
```

# stylus用法
* 省略大括号{},冒号:分号;
* 按dom节点层级关系书写样式
* & 引用父元素:
```
a 
  color #0982C1
  &:hover 
    text-decoration underline
  
```
* 混合(mixins)
1. 无默认参数
mixins.styl:
```
bg-image($url) // 参数前加$
  background-image url($url +"@2x.png")
  @media (min-device-pixel-ratio:3),(-webkit-min-device-pixel-ratio:3)
    background-image url($url +"@3x.png")

```
组件中:
```
.discount 
  bg-image('discount') // 参数用字符串调用
```
2. 有默认参数
mixins.styl:
```
pic-border(niceColor = #fff)
  border 1px solid niceColor

```
组件:
```
.pic
  pic-border(#f00) //参数为空,则为#fff
```

# 移动端betterScroll的基础用法
1. 安装BS库:`cnpm i better-scroll -s`
2. 组件中引入`import BScroll from 'better-scroll'`
3. 页面中调用滚动方法的地方:
```
<div ref="menuWrapper"></div>
```

> ***确保obj高度比其父元素高!;`overflow:hidden`***

4. 在函数钩子里调用初始化方法

> 确保所在dom渲染后调用方法($nextTick)

```
created () {
  this.$nextTick(() => {
    new BScroll(this.$refs.menuWrapper, {
      click: true
    })
  })
}
```

> 横向滚动类似,在Scroll对象定义时增加option:`scrollX: true, eventPassthrough: 'vertical'`
5. 如果子元素或者父元素 DOM 结构发生改变的时候，必须重新调用 scroll.refresh() 方法重新计算来确保滚动效果的正常:
```
this.$nextTick(() => {
  this.scroll.refresh()
  })
```

# 移动端1px边框比实际看起来大的解决方法:
* 构造伪元素,在相应方向上`transform: scaleY/X(0.5)`:
```
border-1px($color)
  position relative
  border none
  &:after
    position absolute
    bottom 0
    left 0
    content ''
    width 100%
    height 1px
    transform scaleY(0.5)
    background $color

```