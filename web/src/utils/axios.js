
import axios from 'axios'
import {
  Message
} from 'element-ui'
import { showLoading, hideLoading } from '@/utils/loading';
const service = axios.create({
  baseURL: '/api',
  timeout: 1000 * 20,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    showLoading()
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


service.interceptors.response.use(
  response => {
    hideLoading()
    const res = response.data
    if (response.status !== 200) {
      Message.error('网络错误！')
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      if (res.code == 100) {
        Message.error('登录失效，请重新登录！')
        localStorage.setItem('token', '')
        return location.href = '/'
      }
      if (res.code == 0) {
        return Promise.resolve(res)
      }
      Message.error(res.msg)
      return Promise.reject(res)
    }
  },
  error => {
    hideLoading()
    Message.error(error.msg || '网络错误！')
    localStorage.setItem('token', '')
    // location.href = '/'
    return Promise.reject(error)
  }
)

// function handlePage(res) {
//   if (res.page && res.data.length) {
//     res.data.forEach((i, index) => {
//       i.xh = (res.page.pageNum - 1) * res.page.pageSize + index + 1
//     })
//   }
//   console.log('', res);
//   return res
// }

export default service