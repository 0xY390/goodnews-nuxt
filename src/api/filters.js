import request from '@/utils/request';
// 获取过滤器列表
export const getFilters = () => {
  return request({
    url: '/_api/admin/filters',
    method: 'GET',
  });
};

// 添加新的过滤器
export const createFilters = (data) => {
  return request({
    url: '/_api/admin/filters/create',
    method: 'POST',
    data,
  });
};

export const delFilters = (id) => {
  return request({
    url: `/_api/admin/filters/delete/${id}`,
    method: 'DELETE',
  });
};

export const getFiltersDetails = (id) => {
  return request({
    url: `/_api/admin/filters/${id}`,
    method: 'GET',
  });
};
