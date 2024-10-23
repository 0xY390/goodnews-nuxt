import request from '@/utils/request'
// 列表
export const getlistsData = () => {
  return request({
    url: `/_api/v1/list`,
    method: 'get',
  });
};

// 创建列表
export const createList = (data) => {
  return request({
    url: `/_api/v1/list`,
    method: 'post',
    data,
  });
};
// 修改列表名称
export const updateList = (listId, data) => {
  return request({
    url: `/_api/v1/list/${listId}`,
    method: 'put',
    data,
  });
};
// 查看列表详情
export const getlistDetail = (listId) => {
  return request({
    url: `/_api/v1/list/${listId}`,
    method: 'get',
  });
};
// 删除列表
export const deleteList = (listId) => {
  return request({
    url: `/_api/v1/list/${listId}`,
    method: 'delete',
  });
};

// 列表的账号列表
export const getlistUsers = (listId) => {
  return request({
    url: `/_api/v1/list/${listId}/account`,
    method: 'get',
  });
};

// 添加账号到列表
export const addListUser = (listId, data) => {
  return request({
    url: `/_api/v1/list/${listId}/account`,
    method: 'post',
    data,
  });
};
// 删除列表的账号
export const deleteListUser = (listId, userId) => {
  return request({
    url: `/_api/v1/list/${listId}/account/${userId}`,
    method: 'delete',
  });
};

// 列表的推文列表
export const getlistTweets = (listId, params) => {
  return request({
    url: `/_api/v1/timeline/list/${listId}`,
    method: 'get',
    params,
  });
};
