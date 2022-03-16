<!--首页广告推荐页面-->
<template>
  <div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  // 现在数据在首页Home的data中
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 10px;
  padding: 10px 0px 20px;
  border-bottom: 10px solid #C2BE9E;
  /*justify-content: space-around;*/
  /*margin-top: 5px;*/
}

.recommend img {
  width: 60px;
  height: 60px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.recommend-item {
  flex: 1;
  justify-content: center;
}
</style>
