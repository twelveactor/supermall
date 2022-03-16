<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null,
      message: '哈哈哈'
    }
  },

  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 1. probeType 为 0，在任何时候都不派发 scroll 事件，
      // 2. probeType 为 1，仅仅当手指按在滚动区域上，每隔 momentumLimitTime 毫秒派发一次 scroll 事件，
      // 3. probeType 为 2，仅仅当手指按在滚动区域上，一直派发 scroll 事件，
      // 4. probeType 为 3，任何时候都派发 scroll 事件，包括调用 scrollTo 或者触发 momentum 滚动动画
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // console.log(this.scroll)

    // 2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', (position) => {
        // console.log(position);
        // 子组件向父组件发送信息
        this.$emit('scroll', position)
      })
    }

    // 3.监听scroll滚动到底部,只会加载一次，需要靠别的
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    // 返回顶部
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    // 刷新上滑加载scroll,就可以多次上拉加载
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
