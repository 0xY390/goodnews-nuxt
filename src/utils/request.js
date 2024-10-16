/*
 * @Author: harley
 * @Date: 2024-03-06 18:06:33
 * @LastEditors: harley
 * @Description:
 */
import axios from 'axios'
import { getToken, removeToken } from './auth.js'
import { Message } from '@arco-design/web-vue'
import { useUserStore } from '../stores'
import { needLoginApi } from './constant.js'
import useLoginPipe from '../hooks/useLoginPipe.js'
let userStore = null
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 12000
})
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    config.headers['Authorization'] = `Bearer ${token}`
    // 未登录-取消本次请求
    const includesFlag = needLoginApi.some((item) => config.url.includes(item))
    if (includesFlag) {
      const useLogin = useLoginPipe()
      const flag = useLogin()
      if (!flag) {
        return Promise.reject('skip request')
      }
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  async (res) => {
    return res.data
  },
  (error) => {
    if (error === 'skip request') {
      return Promise.reject(error)
    }
    if (!userStore) userStore = useUserStore()
    if (error.response.status === 401) {
      Message.error('认证失败，请重新登陆！')
      userStore.logout()
      return Promise.reject(error)
    }
    if (error.response.status === 400) {
      Message.error(error.response.data.msg || '操作不正确，请重试！')
      return Promise.reject(error)
    }
    if (error.response.status === 422) {
      Message.error(error.response.data.msg || '操作不正确，请重试！')
      return Promise.reject(error)
    }
    if (error.response.status === 500) {
      Message.error(error.response.data.msg || '操作发生错误，请重试！')
      return Promise.reject(error)
    }
    if (error.response.status === 502 || error.response.status === 504) {
      Message.error('网络链接异常，请稍后重试！')
      return Promise.reject(error)
    }
    if (error.response.status === 403) {
      Message.error(error.response.data?.msg || '您没有这项操作的权限！')
      return Promise.reject(error)
    }
    if (error.response.status === 404) {
      Message.error('请求资源不存在！')
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

export default service
