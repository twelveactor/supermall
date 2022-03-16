<template>
  <div class="toast" v-show="isShow">
    <div class="toast-text">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  // props: {
  //   message: {
  //     type: String,
  //     default() {
  //       return ''
  //     }
  //   },
  //   show: {
  //     type: Boolean,
  //     default() {
  //       return true
  //     }
  //   }
  // },
  // 因为已经在原型中加入了该对象，所以可以直接通过methods方法中的show进行传参显示
  // 所以不需要props的属性了，因为不需要别的组件调用并父传子的操作传数据
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    // 定义一个方法，参数message和duration时长
    Show(message, duration) {
      this.isShow = true
      this.message = message

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  /*width: 100px;*/
  /*height: 50px;*/
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  z-index: 9;
}

.toast-text {
  text-align: center;
  /*line-height: 50px;*/
}
</style>
