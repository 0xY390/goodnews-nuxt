import request from '@/utils/request'
export const getExportsList = params => {
  return request({
    url: '/_api/admin/exports',
    method: 'get',
    params
  })
}

// 导出请求的列表
export const requestData = params => {
  return request({
    url: '/_api/admin/exports/request',
    method: 'get',
    params
  })
}

// 下载存档
export const downloadArchive = id => {
  return request({
    url: `/_api/admin/backups/${id}/download`,
    method: 'get'
  })
}
