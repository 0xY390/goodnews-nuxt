import request from '@/utils/request'
// 规则列表
export const getRuleList = () => {
  return request({
    url: '/admin/api/rule/list',
    method: 'get',
  });
};
// 添加规则
export const addRule = (data) => {
  return request({
    url: '/admin/api/rule/create',
    method: 'post',
    body: data,
  });
};
// 删除规则
export const deleteRule = (id) => {
  return request({
    url: `/admin/api/rule/delete/${id}`,
    method: 'delete',
  });
};
