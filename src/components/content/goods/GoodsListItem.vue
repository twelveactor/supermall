<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>


export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    // 监听图片加载情况
    imageLoad() {
      // console.log('img')
      // 因为此组件商品列表的加载通过子传父要经过几层主页面home太远，不方便
      // 可以通过Veux管理或者通过一个事件总线的方式
      
      this.$bus.$emit('itemImageLoad')

    },
    // 根据商品跳转详情页
    itemClick() {
      // 动态跳转，携带参数
      this.$router.push('/detail/' + this.goodsItem.iid)
      // this.$router.push({
      //   path: '/detail/',
      //   query: {iid: this.goodsItem.iid}
      // })
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img

    }
  }
}
</script>

<style scoped>
.goods-item {
  /*设置图片下方留白40px,文字等通过定位放入留白区域*/
  padding-bottom: 40px;
  position: relative;
  background-color: white;
  border: 1px solid #a9a9a9;
  border-radius: 6px;
  /*宽度设置为整体的48%*/
  width: 48%;
  margin: 3px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
