<!--详情页navbar-->
<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div class="title-item" v-for="(item,index) in title" :class="{active:index === currentIndex}"
             @click="titleClick(index)">
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      title: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
      // console.log(index)
      // 发送出去当前点击的index下标
      this.$emit('titleClickIndex', index)
    },
    backClick() {
      // this.$router.push('/home')
      // 使用back回退历史或者go(-1)回到上一历史
      this.$router.back()
    }
  }
}
</script>

<style scoped>

.title {
  display: flex;
  font-size: var(--font-size);
}


.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back img {
  margin-top: 12px;
  margin-right: 12px;
  height: 18px;
  width: 18px;
}
</style>
