import request from '@/utils/request';
// 获取规则
export const getRules = () => {
  return request({
    url: '/_api/v1/rule'
  })
}

// 注册
export const register = data => {
  return request({
    url: '/_api/v1/reg',
    method: 'post',
    data
  })
}

// 发送注册邮箱
export const sendEmail = data => {
  return request({
    url: '/_api/v1/reg-send-email',
    method: 'post',
    data
  })
}
