import request from '@/utils/request'
// 列表
export const getList = (options) => {
  return request({
    url: '/_api/v1/follow_requests',
    method: 'get',
    ...options,
  });
};
// 审核通过
export const handleAuthorize = (data) => {
  return request({
    url: `/_api/v1/follow_requests/${data.id}/authorize`,
    method: 'post',
    body: JSON.stringify(data),
  });
};

// 审核拒绝
export const reject = (data) => {
  return request({
    url: `/_api/v1/follow_requests/${data.id}/reject`,
    method: 'post',
    body: JSON.stringify(data),
  });
};
