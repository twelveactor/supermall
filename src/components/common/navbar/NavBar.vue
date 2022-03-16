<template>
  <div class="nav-bar">
    <!-- 导航栏布局左中右设置为三个插槽 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  /* 导航栏高度一般44px */
  line-height: 44px;
  height: 44px;
  background-color: pink;
  text-align: center;
  box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.1);
}

.left, .right {
  width: 60px;
}

.center {
  flex: 1;

}
</style>
