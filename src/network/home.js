import {request} from "@/network/request";

// 封装获取首页数据，首页数据面向这个文件，不直接耦合request文件
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

// 封装首页商品数据请求
export function getHomeGoodsData(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
