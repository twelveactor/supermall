<template>
  <div class="cart">
    <!--  顶部nav  -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!--  body商品列表  -->
    <cart-list/>
    <!--  bottom底部结算  -->
    <cart-bottom-bar class="cartbottonbar"/>
  </div>
</template>

<script>
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import NavBar from "@/components/common/navbar/NavBar";

// 可以把vuex中的getters拿来在组件计算属性中用
import {mapGetters} from 'vuex'


export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 这种写法就是对vuex的getters中的内容进行了一个解构，getters中有cartLength方法
    ...mapGetters(['cartLength'])
  }
}
</script>

<style scoped>
.nav-bar {
  color: var(--color-high-text);
}
</style>
