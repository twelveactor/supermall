<!--轮播图封装-->
<template>
  <!-- 获取接口数据做轮播图  -->
  <swiper>
    <swiper-item v-for="item in banners">
      <!--   动态绑定获取接口图片信息 ，<a> 标签的 href 属性用于指定超链接目标的 URL。    -->
      <a :href="item.link">
        <img :src="item.image" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'

export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  // 属性，让调用这传递过来轮播图数据
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    // 监听轮播图加载情况，并发送出去
    imageLoad() {
      // this.$bus.$emit('imageLoad')
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }

    }
  }
}
</script>

<style scoped>

</style>
