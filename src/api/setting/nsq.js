import request from '@/utils/request'
// 规则列表
export const getNsqInfo = () => {
  return request({
    url: '/admin/_api/nsq/stats',
    method: 'get',
  });
};
