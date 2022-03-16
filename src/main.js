import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import toast from '@/components/common/toast'

Vue.config.productionTip = false

// 因为事件总线是没有的，但是又需要事件总线监听图片加载事件，在main里面可以用到原型,Vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
