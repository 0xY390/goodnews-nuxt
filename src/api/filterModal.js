import request from '@/utils/request'
// 获取过滤器列表
export const getTweetFilters = () => {
  return request({
    url: '/_api/filters',
    method: 'GET',
  });
};

// 添加新的推文过滤器
export const createTweetFilters = (data) => {
  return request({
    url: '/_api/filters/create',
    method: 'POST',
    data
  });
};

// 过滤一条推文
export const filterTweets = (data, id) => {
  return request({
    url: `/_api/v1/statuses/${id}/filter`,
    method: 'POST',
    data,
  });
};
