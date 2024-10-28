import request from '@/utils/request';
export const getList = () => {
  return request({
    url: `/_api/admin/relays`,
    method: 'GET',
  });
};

// 启用
export const enable = (id) => {
  return request({
    url: `/_api/admin/relays/${id}/enable`,
    method: 'PUT',
  });
};

// 禁用
export const disable = (id) => {
  return request({
    url: `/_api/admin/relays/${id}/disable`,
    method: 'PUT',
  });
};

// 删除
export const del = (id) => {
  return request({
    url: `/_api/admin/relays/${id}`,
    method: 'DELETE',
  });
};

// 添加并启用
export const addAndEnable = (data) => {
  return request({
    url: `/_api/admin/relays`,
    method: 'POST',
    data
  });
};
