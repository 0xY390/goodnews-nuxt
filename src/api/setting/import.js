import request from '@/utils/request'
// 导入
export const importData = (data) => {
  return request({
    url: '/_api/admin/imports/upload',
    method: 'post',
    data,
  });
};
