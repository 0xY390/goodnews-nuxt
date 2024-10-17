import service from '@/utils/request'

export const getUserInfo = (acct) => {
  return service({
    url: '/_api/v1/user',
    method: 'get',
    params: { acct }
  })
}

export const uploadFile = (file, config) => {
  return service({
    url: '/_api/v1/attachment',
    method: 'post',
    data: file,
    ...config,
  });
}
