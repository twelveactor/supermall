import {ADD_COUNTER, ADD_TO_CART} from "@/store/mutations-types";
//
// export default {
//   addCart(context, payload) {
//     // 添加购物车的商品只需要添加一次，如果购物车已经有了就不允许在加入购物车了
//     // let oldProduct = null
//     // for (let cartListElement of state.cartList) {
//     //   // 判断购物车中是否有该商品
//     //   if (cartListElement.iid === payload.iid) {
//     //     // 如果有就把值赋值给oldProduct，就不为空
//     //     oldProduct = cartListElement
//     //   }
//     // 使用find数组函数与上面这个意思一样
//     let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
//     // 2、判断oldProduct是否为空
//     // 如果oldProduct还是为空说明上一步在购物车中没有，然后就可以进行添加
//     if (oldProduct) {
//       // oldProduct.count += 1
//       // 因为购物车里面有，就不需要在对购物车添加，只是对改商品count属性+1
//       context.commit(ADD_COUNTER, oldProduct)
//     } else {
//       // 购物车没有进行添加的话就为该商品设置加一个count属性并赋值为1，上面的或者的count属性都是基于这里加的count属性，并且把商品信息放到cartList数组中
//       payload.count = 1
//       // context.cartList.push(payload)
//       context.commit(ADD_TO_CART, payload)
//     }
//   }
// }

export default {
  addCart(context, payload) { // dispatch可以返回一个promise，可用来监听事件成功与否，据此做弹窗toast效果
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1 这样写也可以，但是无法在devtools中监视到状态变化
        // 将数量加1的情况分发到一个特定的方法中
        context.commit(ADD_COUNTER, oldProduct) // commit 提交到store中mutations里的方法addCounter中去
        resolve('商品数量+1')
        reject('wrong')
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        // 将添加商品的情况分发到另一个特定的方法中，使得mutations中的方法只对应一种改变
        context.commit(ADD_TO_CART, payload)
        resolve('商品已加入购物车')
      }
    })
  }
}
