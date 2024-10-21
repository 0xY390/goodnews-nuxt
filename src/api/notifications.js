import request from '@/utils/request'
// 通知设为已读
export const read = (data) => {
  return request({
    url: '/_api/v1/notifications/read',
    method: 'PUT',
    body: data,
  });
};

// 获取通知列表
export const getNotifications = (params) => {
  return request({
    url: '/_api/v1/notifications',
    method: 'GET',
    params,
  });
};
