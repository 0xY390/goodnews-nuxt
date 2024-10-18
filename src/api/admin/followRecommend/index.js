// 获取新增角色权限列表
import request from '@/utils/request'
export const getDataList = (params) => {
  return request(`/admin/_api/follow_recommendations`, {
    method: 'get',
    params,
  });
};

// 禁用/恢复推荐关注
export const bannedRecommend = (data) => {
  return request('/admin/_api/follow_recommendations/suppressed', {
    method: 'put',
    data: data,
  });
};
