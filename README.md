# 小鱼干
* 淡入淡出动画:
```
.detail // 动画对象
  transition .5s
.fade-enter, .fade-leave-to // 淡入开始与淡出结束状态
  opacity 0
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