import request from '@/utils/request'
// 将推文标记为书签
export const bookmarkTweet = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/bookmark`,
    method: 'post',
  });
};

// 移除书签
export const removeBookmark = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/un-bookmark`,
    method: 'put',
  });
};

// 移除所有书签
export const removeAllBookmark = () => {
  return request({
    url: '/_api/v1/bookmarks/un-bookmark-all',
    method: 'put',
  });
};
