import request from '~/utils/request'
// 搜索接口
export const getSearchData = (params) => {
  return request('/_api/v1/search', {
    method: 'get',
    params,
  });
};
