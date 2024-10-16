import service from '@/utils/request'

export const getUserInfo = (acct) => {
  return service({
    url: '/_api/v1/user',
    method: 'get',
    params: { acct }
  })
}
