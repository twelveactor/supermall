<!--可固定选项卡-->
<template>
  <div class="tab-control">
    <!--  获取点击标签的下标，并且动态绑定class,当点击当前标签标签变红并有一个红色底线 -->
    <div v-for="(item,index) in title" class="tab-control-item " :class="{active: index === currentindex}"
         @click="itemClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    // 存储传进来标题的数量
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentindex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentindex = index
      //  根据['流行','精选','新款'] 点击哪个标签就把标签的下标发生送给home，界面，点击哪个获取哪个页面的数据并渲染出来
      //  子传父
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  color: #3d3c3c;
  background-color: #f6f6f6;
  z-index: 2;
}

.tab-control-item {
  flex: 1;
  height: 40px;
  width: 40px;
  line-height: 40px;
}

.active {
  color: var(--color-high-text);
  border-bottom: 1px solid var(--color-tint);
}

/*.active span {*/
/*  border-bottom: 2px solid var(--color-tint)*/
/*}*/
</style>
