import axios from 'axios'
import { getters } from '../sessionStorage'

const BASE_URL_MAP = {
  deploy: 'http://localhost',
  development: 'http://yapi.ascoder.cn/mock/32/dayEat',
  production: 'http://localhost' // api.udache.com/gulfstream/driver/v2/other
}
  
function generateUrl(url) {
  const BASE_URL = BASE_URL_MAP[process.env.NODE_ENV]
  return `${BASE_URL}${url}`
}

axios.interceptors.request.use(
  // 发送请求前拦截请求,将TOKEN加入到headers.Authorization
  config => {
    let TOKEN = getters.GET_TOKEN()
    if (TOKEN) {
      // 登录后设置请求头
      config.headers.Authorization = getters.TOKEN;
    }
    return config
  },
  error => {
    console.log('发送请求前拦截请求失败:', error)
  }
);

axios.interceptors.response.use(function (res) { // 响应拦截器
  // if (res.data.data.errno !== 0) { // 失败
  //  console.log(res.data.data.errmsg)
  //  return false
  // }
  // 成功
  return res.data.data
})

function axiosGet(url) {
  return function(params) {
    return axios.get(generateUrl(url, params))
  }
}

const getCardData = axiosGet('/getCardData')
export {
  getCardData
}