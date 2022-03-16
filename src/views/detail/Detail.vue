<!--详情页组件-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClickIndex="titleIndex" ref="navbar"/>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>


import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";

import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/detail";

import Scroll from "@/components/common/scroll/Scroll";

import BackTop from "@/components/content/backtop/BackTop";
import GoodsList from "@/components/content/goods/GoodsList";
import {debounce} from "@/common/utils";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    BackTop,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      isShowBackTop: false,
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  created() {
    // 在创建的时候保存 动态路由保存的iid
    this.iid = this.$route.params.iid

    // 获取详情页商品数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(data.itemInfo.topImages.length)
      console.log(res)
      //  分离接口数据
      // 详情页顶部轮播图
      this.topImages = data.itemInfo.topImages

      // 实例化对象,获取商品标题数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 实例化店铺信息
      this.shop = new Shop(data.shopInfo)

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // 请求详情页推荐数据
      getRecommend().then(res => {
        console.log(res)
        this.recommend = res.data.list
      })

      //  this.$nextTick 是等待其他组件数据渲染完在回调这个,重新加载数据还是不对
      // this.$nextTick(() => {
      //   // 拿到详情页个内容组件的offsetTop位置信息
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log(this.themeTopYs)
      // })
      // 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs)
      }, 100)
    })
  },
  methods: {
    // 监听DetailGoodsInfo商品的加载情况进行刷新
    imgLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    backClick() {
      // 当点击回到顶部按钮时候获取scroll让他自动滑倒顶部
      this.$refs.scroll.scrollTo(0, 0,)
    },
    // 显示隐藏回到顶部按钮
    //监听子组件向父组件发送的滑动坐标信息
    contentScroll(position) {
      // 1、滑到哪个位置标题文字高亮在那个区域
      // 获取数组中高度数据的长度
      let length = this.themeTopYs.length
      for (let i = 0; i < length; i++) {
        // 判断区间
        if (this.currentIndex !== i && ((i < length - 1 && -position.y > this.themeTopYs[i] - 46 && -position.y < this.themeTopYs[i + 1] - 46) || (i === length - 1 && -position.y > this.themeTopYs[i] - 46))) {
          this.currentIndex = i
          // console.log(this.currentIndex)
          this.$refs.navbar.currentIndex = this.currentIndex
        }

      }

      // 2、显示隐藏回到顶部按钮
      if (-position.y > 1000) {
        // console.log(position)
        this.isShowBackTop = true
      } else {
        this.isShowBackTop = false
      }
    },
    // 监听子组件向父组件发送的标签下标
    titleIndex(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200)
    },

    // 3、点击加入购物车
    addToCart() {
      // 1、获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 通过vuex添加购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        // 4、添加购物车成功弹出一个toast弹窗
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1000)

        // 把toast设置为全局的，这样就不要在每个组件中都进行引用文件并且赋值监听等操作
        // console.log(this.$toast)
        this.$toast.Show(res, 2000)
      })
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 监听图片加载事件
    this.$bus.$on('itemImageLoad', () => {
      // refresh 刷新，获取事件总线商品列表组件发送过来的图片刷新情况，根据情况对上拉加载进行刷新次数
      // this.$refs.wrapper.refresh()
      // 防抖动函数，会返回一个函数，函数为可变长参数，可以传参
      refresh()
    })


  },
  updated() {

  }
  // 生命周期函数，销毁
  // destroyed() {
  //   const refresh = debounce(this.$refs.scroll.refresh, 50)
  //   // 在离开时取消全局事件监听
  //   this.$bus.$off('itemImageLoad', () => {
  //     refresh()
  //   })
  // }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
  /*overflow: hidden;*/
  /*position: absolute;*/
  /*top: 44px;*/
  /*bottom: 49px;*/
  /*left: 0;*/
  /*right: 0;*/
}


</style>
