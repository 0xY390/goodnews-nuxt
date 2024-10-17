import request from '@/utils/request'
// 登录
export const loginApi = (data) => {
  console.log(`output->loginApi`, data)
  return request({
    url: '/_api/v1/login',
    method: 'POST',
    data,
  });
};

// 修改密码
export const changePwdApi = (old_password, password) => {
  return request({
    url: '/_api/v1/change-password',
    method: 'POST',
    data: { old_password, password },
  });
};

// 注册验证邮箱
export const registerApi = (token) => {
  return request({
    url: '/_api/v1/confirm',
    method: 'POST',
    data: { confirmation_token: token },
  });
};

// 忘记密码的邮箱验证
export const forgetPwdApi = (email) => {
  return request({
    url: '/_api/v1/reset-password/send-mail',
    method: 'POST',
    data: { email },
  });
};

// 重置密码
export const resetPwdApi = (data) => {
  return request({
    url: '/_api/v1/reset-password/reset',
    method: 'POST',
    data,
  });
};
