import axios from 'axios'
// import getCardData from './getCardData'
// const TIMEOUT = 100

const BASE_URL_MAP = {
  deploy: 'http://localhost',
  development: 'http://localhost',
  production: 'http://localhost' // api.udache.com/gulfstream/driver/v2/other
}
  
function generateUrl(url) {
  const BASE_URL = BASE_URL_MAP[process.env.NODE_ENV]
  return `${BASE_URL}${url}`
}
axios.interceptors.response.use(function (res) { // 响应拦截器
  console.log('res:', res)
  return res
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