<!--// 购物车列表-->
<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item" :key="index"/>
      <!--      <li v-for="item in cartList">{{ item }}</li>-->
    </scroll>
  </div>
</template>

<script>
// 可以把vuex中的getters拿来在组件计算属性中用
import {mapGetters} from 'vuex'
import CartListItem from "@/views/cart/childComps/CartListItem";
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    // 刷新获取需要滑动的高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  /* 因为这里是cart组件中的内容滚动区，而非整个cart组件，所以这里就是滚动区的内容高度 */
  height: calc(100vh - 44px - 49px - 40px);
}

.content {
  /* height: calc(100% - 44px - 49px -40px - 40px); */
  height: 100%;
  overflow: hidden;
}
</style>
