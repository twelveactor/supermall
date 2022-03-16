import axios from 'axios'

export function request(config) {

  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 10000
  })

  // axios的拦截器
  // 拦截请求
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config
  }, error => {

  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, error => {
    console.log(error)
    return error
  })


  // 实例已经创建，发送网络请求
  return instance(config)

}
