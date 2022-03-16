import Vue from 'vue'
import Vuex from 'vuex'
import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";


Vue.use(Vuex)


const state = {
  //  保存添加购物车的商品数据
  cartList: []
}


const store = new Vuex.Store({
  // state 状态属性对象
  state,
  // 组件修改state状态通过mutations进行操作
  // mutations中的每个方法尽可能完成的事件比较单一
  // 下面两个是对添加购物车进行了分发，逻辑运算在actions中，单一修改state在mutations中
  mutations,
  getters,
// 行为动作，有异步操作的时候就在actions中进行操作，同步操作在mutations中操作
  actions,
  modules: {}
})

// 导出挂载到vue实例上
export default store
