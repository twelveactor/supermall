<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <!--  导入封装的滑动  -->
    <scroll class="content" ref="wrapper" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
      <home-recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control :title="['流行','精选','新款']" @itemClick="tabClick" ref="tabControl"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--  监听组件的点击事件需要加上修饰符native  -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backtop/BackTop";

import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import {getHomeMultidata, getHomeGoodsData} from "@/network/home";

import {debounce} from "@/common/utils";


export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      // result: null
      banners: [],
      recommend: [],
      // 商品数据，采用分页上拉加载数据的方式，因为不能一下把全部数据显示出来，数据量大进行分页显示
      goods: {
        // 默认把第一页的数据请求下来
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      // 根据TabControl子传父发送过来的下标对拉取的商品数据进行设置,默认为pop数据
      currentGoodsType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      itemImgListener: null
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentGoodsType].list
    }
  },
  // 在组件创建好的时候对首页数据进行获取
  created() {
    // 请求首页banners and recommend 数据，因为不建议把逻辑等写在生命周期函数中，在方法进行了再次包装，所以需要用this
    this.getHomeMultidata()
    // 请求首页商品数据
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new')
    this.getHomeGoodsData('sell')
    // console.log('create')

  },
  mounted() {
    // 进行防抖动，会返回一个函数
    const refresh = debounce(this.$refs.wrapper.refresh, 100)
    // 保存监听的函数
    this.itemImgListener = () => {
      // refresh 刷新，获取事件总线商品列表组件发送过来的图片刷新情况，根据情况对上拉加载进行刷新次数
      // this.$refs.wrapper.refresh()
      // 防抖动函数，会返回一个函数，函数为可变长参数，可以传参
      refresh()
    }
    // 监听商品列表组件发送过来的监听图片加载的信息
    this.$bus.$on('itemImageLoad', this.itemImgListener)

    //  获取TabControl精选标签栏的位置
    // 所有组件都有一个属性 $el ,用于获取组件中的元素

  },
  destroyed() {
    // console.log('home destroyed')
  },
  // 活跃时
  activated() {
    // console.log('activated')
  },
  // 离开时
  deactivated() {
    // console.log('deactivated')
    // 离开home界面时取消全局img加载情况总线事件监听的发送，不取消在别的页面也会重复给home发送数据
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    /*
    * 网络请求相关方法
    * */

    // 不建议把逻辑写在生命周期函数中，另外用一个方法再次进行一次包装更好
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res)
        // 对数据进行保存
        // this.result = res
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoodsData(type) {
      // 针对页码不能固定死的思考，对获取第二页数据的页码进行 + 1
      const page = this.goods[type].page + 1
      getHomeGoodsData(type, page).then(res => {
        // console.log(res)
        // push(...res.data.list) 意思是根据类型如（pop,news。。。）的list中push数据进行保存，...res.data.list 是... 类似for遍历取出数组元素加入到另一个数组中，解析数组数据
        this.goods[type].list.push(...res.data.list)
        //   页码 + 1
        this.goods[type].page += 1

        // 刷新下拉加载
        this.$refs.wrapper.finishPullUp()
      })
    },
    /*
    * 事件监听相关方法
    * */

    // TabControl 子组件发送过来的点击title的下标值
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentGoodsType = 'pop'
          break
        case 1:
          this.currentGoodsType = 'new'
          break
        case 2:
          this.currentGoodsType = 'sell'
          break
        default: {
          this.currentGoodsType = 'pop'
          break
        }
      }
    },
    backClick() {
      // 当点击回到顶部按钮时候获取scroll让他自动滑倒顶部
      this.$refs.wrapper.scrollTo(0, 0,)
    },
    // 显示隐藏回到顶部按钮
    contentScroll(position) {
      // 1、显示隐藏回到顶部按钮
      if (-position.y > 1000) {
        // console.log(position)
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }

      // // 2、决定 tabControl 是否吸顶（position:fixed)
      // this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // 上拉加载刷新商品数据
    loadMore() {
      this.getHomeGoodsData(this.currentGoodsType)
    },
    swiperImageLoad() {
      // 获取 banner 的高度
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /*设置整体home界面高度为100视口高度*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  /*height: calc(100% - 93px);*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

</style>

