import request from '~/utils/request'
// 搜索接口
export const getHashTagData = (params) => {
  return request('/_api/v1/search', {
    method: 'get',
    params,
  });
};
