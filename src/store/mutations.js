import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutations-types";

export default {
  [ADD_COUNTER](state, payload) {
    // 购物车该商品已经存在对数量进行count+1
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    // 购物车点击选中按钮的值
    payload.checked = true
    // 购物车商品数据信息放入cartList
    state.cartList.push(payload)
  }
}
