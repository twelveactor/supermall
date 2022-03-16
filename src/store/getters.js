export default {
  // 把vuex的getters转成组件内的计算属性进行操作
  cartLength(state) {
    // 获取购物车商品数量
    return state.cartList.length
  },
  cartList(state) {
    // 获取商品类的数据信息，数量，标题，图片价格等
    return state.cartList
  }
}
