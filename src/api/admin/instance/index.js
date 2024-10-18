import request from '@/utils/request';
// 获取实例列表
export const getInstanceList = (data) => {
  return request('/_api/admin/instances', {
    method: 'get',
    params: data,
  });
};

// 实例详情
export const getInstanceDetail = (domain) => {
  return request(`/_api/admin/instances/${domain}`, {
    method: 'get',
  });
};

export const putInstanceSetting = (domain, data) => {
  return request(`/_api/admin/instances/${domain}/setting`, {
    method: 'put',
    body: data,
  });
};
