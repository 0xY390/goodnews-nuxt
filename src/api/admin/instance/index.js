import request from '@/utils/request';
// 获取实例列表
export const getInstanceList = (params) => {
  return request({
    url: '/_api/admin/instances',
    method: 'get',
    params
  });
};

// 实例详情
export const getInstanceDetail = (domain) => {
  return request({
    url: `/_api/admin/instances/${domain}`,
    method: 'get',
  });
};

export const putInstanceSetting = (domain, data) => {
  return request({
    url: `/_api/admin/instances/${domain}/setting`,
    method: 'put',
    data,
  });
};
