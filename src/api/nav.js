import service from '@/utils/request'

export const getNum = () => {
  return service({
    url: '/_api/v1/markers',
    method: 'get'
  })
}
