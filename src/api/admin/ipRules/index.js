
import request from '@/utils/request'
// 获取ip规则列表
export const getIpRulesList = () => {
  return request({
    url: `/admin/_api/ip_blocks`,
    method: 'get',
  });
};

// 新增
export const createIpRules = (data) => {
  return request({
    url: `/admin/_api/ip_blocks/create`,
    method: 'post',
    data,
  });
};

// 删除
export const deleteIpRules = (ids) => {
  return request({
    url: `/admin/_api/ip_blocks/batch`,
    method: 'delete',
    data: {
      ids,
    },
  });
};
