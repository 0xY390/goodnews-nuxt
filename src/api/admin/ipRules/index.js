
import request from '@/utils/request'
// 获取ip规则列表
export const getIpRulesList = () => {
  return request(`/admin/_api/ip_blocks`, {
    method: 'get',
  });
};

// 新增
export const createIpRules = (data) => {
  return request(`/admin/_api/ip_blocks/create`, {
    method: 'post',
    body: data,
  });
};

// 删除
export const deleteIpRules = (ids) => {
  return request(`/admin/_api/ip_blocks/batch`, {
    method: 'delete',
    body: {
      ids,
    },
  });
};
