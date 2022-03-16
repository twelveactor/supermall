import Toast from './Toast'

const obj = {}

// 因为在 main 中安装了toast插件，这边使用install函数
obj.install = function (Vue) {
  // vue里面有个原型
  // 把Toast组件的要展示的内容添加到body中
  // document.body.appendChild(Toast.$el)
  // 1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2、new 的方式，根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()
  // 3、将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4、toast.$el 对应的就是div这个元素了
  document.body.appendChild(toast.$el)

  // 直接把组件对象toast赋值到原型上，但是组件toast中的template模板数据不能显示，因为没有写入body中，通过上面的代码获取一下
  Vue.prototype.$toast = toast

}

export default obj
