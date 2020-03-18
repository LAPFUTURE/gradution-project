import axios from 'axios'
import { getters } from '../sessionStorage'
// import { message } from 'antd'

const BASE_URL_MAP = {
  deploy: 'http://localhost',
  // development: 'http://yapi.ascoder.cn/mock/32/dayEat',
  development: 'http://dayeatapi.connectyoume.top/dayEat',
  production: 'http://localhost'
}
  
function generateUrl(url) {
  const BASE_URL = BASE_URL_MAP[process.env.NODE_ENV]
  return `${BASE_URL}${url}`
}

axios.interceptors.request.use( // 发送请求前拦截请求,将TOKEN加入到headers.Authorization
  config => {
    let TOKEN = getters.GET_TOKEN()
    if (TOKEN) { // 登录后设置请求头
      config.headers['Authorization'] = TOKEN
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.transformRequest = function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
    return config
  },
  error => {
    console.log('发送请求前拦截请求失败:', error)
  }
);

axios.interceptors.response.use(function (res) { // 响应拦截器
  // if (res.data.errno !== 0) { // 失败,token失效等
  //  message.error(res.data.errmsg)
  // }
  return res.data.data // 成功
})

function axiosGet(url) {
  return function(params) {
    return axios.get(generateUrl(url), params)
  }
}

function axiosPost(url) {
  return function(params) {
    return axios.post(generateUrl(url), params)
  }
}

const postLogin = axiosPost('/postLogin') // 登录
const postRegister = axiosPost('/postRegister') // 注册
const postChangeUserName = axiosPost('/postChangeUserName') // 修改昵称
const postChangePassword = axiosPost('/postChangePassword') // 修改密码
const getCommentSumAndCollectionSum = axiosGet('/getCommentSumAndCollectionSum') // 获取用户的评论总数目
const postHomePageCardData = axiosPost('/postHomePageCardData') // 获取首页数据列表
const postCardDetail = axiosPost('/postCardDetail') // 获取单条数据详情
const postComment = axiosPost('/postComment') // 添加评论
const getRoleList = axiosGet('/getRoleList') // 获取权限角色列表
const uploadFileUrl = BASE_URL_MAP[process.env.NODE_ENV] + '/postUploadFile' // 上传图片
const postPublish = axiosPost('/postPublish') // 用户发布信息
const postLikeOrDislike = axiosPost('/postLikeOrDislike') // 喜欢或踩踩
const getRecommandPageCardData = axiosGet('/getRecommandPageCardData') // 获取推荐页数据列表
const getSettingInfo = axiosGet('/getSettingInfo') // 获取设置表的配置信息
const postChangeSettingInfo = axiosPost('/postChangeSettingInfo') // 获取设置表的配置信息
const getAllUser = axiosGet('/getAllUser') // 管理员获取全部用户信息
const postNoticeAll = axiosPost('/postNoticeAll') // 获取所有公告
const postNotice = axiosPost('/postNotice') // 获取最新的公告
const postSearch = axiosPost('/postSearch') // 搜索

export {
  postLogin,
  postRegister,
  postChangeUserName,
  postChangePassword,
  getCommentSumAndCollectionSum,
  postHomePageCardData,
  postCardDetail,
  postComment,
  getRoleList,
  uploadFileUrl,
  postPublish,
  postLikeOrDislike,
  getRecommandPageCardData,
  getSettingInfo,
  postChangeSettingInfo,
  getAllUser,
  postNoticeAll,
  postNotice,
  postSearch
}