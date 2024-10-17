import service from '@/utils/request'

// 获取系统实例信息
export const getInstance = () => {
  return service({
    url: '/_api/v2/instance',
    method: 'get',
  });
};

export function updateProfile(data) {
  return service({
    url: '/_api/v1/user-profile',
    method: 'put',
    data: JSON.stringify(data),
  });
}

// 仪表盘数据
export const getDashboardData = () => {
  return service({
    url: '/_api/admin/dashboard?start_at=2024-01-18',
    method: 'get',
  });
};

export const getReportList = (params) => {
  return service({
    url: '/admin/_api/reports',
    method: 'get',
    params,
  });
};

export const getReportDetail = (id) => {
  return service({
    url: `/admin/_api/reports/${id}/detail`,
    method: 'get',
  });
};

// 设置举报分类
export const setReportCategory = (id, data) => {
  return service({
    url: `/admin/_api/reports/${id}/setCategory`,
    method: 'put',
    data,
  });
};
