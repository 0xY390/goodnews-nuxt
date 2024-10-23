import request from '@/utils/request'

// 给推文投票的接口
export const tweetToVote = (pollId, data) => {
  return request({
    url: `/_api/v1/polls/${pollId}/votes`,
    method: 'post',
    body: JSON.stringify(data),
  });
};

// 发推
export const tweetToPost = (data) => {
  return request({
    url: '/_api/v1/statuses',
    method: 'POST',
    body: data,
  });
};

// 置顶推文
export const tweetToPin = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/pin`,
    method: 'put',
  });
};
// 取消置顶
export const tweetToUnpin = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/unpin`,
    method: 'put',
  });
};
// 删除推文
export const tweetToDelete = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}`,
    method: 'delete',
  });
};

// 时间线
export const getTimeLineData = (params) => {
  return request({
    url: '/_api/v1/timeline',
    method: 'GET',
    params,
  });
};

// 我关注的人的推文
export const getFollowingTweets = (data) => {
  return request({
    url: '/_api/v1/following',
    method: 'GET',
    data,
  });
};

// 本服务器的推文--实时动态
export const getTweetsByLocal = (data) => {
  return request({
    url: '/_api/v1/local-timeline',
    method: 'GET',
    data,
  });
};

// 推文的上下文
export const getTweetContext = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/context`,
    method: 'get',
  });
};

// 推文详情
export const getTweetDetail = (params) => {
  return request({
    url: `/_api/v1/statuses/${params.acct}/status/${params.id}`,
    method: 'get',
  });
};

// 推文转发
export const tweetToRepost = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/re-blog`,
    method: 'put',
  });
};

// 推文取消转发
export const tweetToUnrepost = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/undo-re-blog`,
    method: 'put',
  });
};

// 喜欢推文
export const tweetToFave = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/fave`,
    method: 'put',
  });
};
// 取消喜欢推文
export const tweetToUnfave = (tweetId) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/un-fave`,
    method: 'put',
  });
};

// 评论推文
export const replyToTweet = (data) => {
  return request({
    url: `/_api/v1/statuses`,
    method: 'post',
    body: data,
  });
};
// 评论推文的列表
export const getTweetReplyList = (tweetData, query) => {
  return request({
    url: `/_api/v1/statuses/${tweetData.acct}/status/${tweetData.id}/replies`,
    method: 'get',
    params: query,
  });
};

// 编辑推文
export const editTweetData = (data) => {
  return request({
    url: `/_api/v1/statuses/${data.id}`,
    method: 'put',
    body: data,
  });
};

// 记录用户查看的推文
export const recordTweetView = (status_ids) => {
  return request({
    url: `/_api/v1/view-statuses`,
    method: 'post',
    body: {
      status_ids,
    }
  });
}
// 付费解锁此推文
export const unlockTweet = (tweetId, hash) => {
  return request({
    url: `/_api/v1/statuses/${tweetId}/unlock`,
    method: 'put',
    body: {
      hash,
    },
  });
};
