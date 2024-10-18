import request from '@/utils/request'
export const followUser = (userId) => {
  return request({
    url: '/_api/v1/follow',
    method: 'PUT',
    data: {
      account_id: userId,
    },
  });
};

// 取消关注
export const unfollowUser = (userId) => {
  return request({
    url: '/_api/v1/un-follow',
    method: 'PUT',
    data: {
      account_id: userId,
    },
  });
};

// 拉黑
export const blockUser = (userId) => {
  return request({
    url: '/_api/v1/block',
    method: 'POST',
    data: {
      target_account_id: userId,
    },
  });
};
// 获取已拉黑的用户
export const getBlockList = (params) => {
  return request({
    url: '/_api/v1/block',
    method: 'GET',
    params,
  });
};
// 移出黑名单
export const unBlockUser = (userId) => {
  return request({
    url: '/_api/v1/block',
    method: 'DELETE',
    data: {
      target_account_id: userId,
    },
  });
};

// 屏蔽
export const muteUser = (data) => {
  return request({
    url: '/_api/v1/mute',
    method: 'POST',
    data: data,
  });
};
// 获取屏蔽列表
export const getMuteList = (params) => {
  return request({
    url: '/_api/v1/mute',
    method: 'GET',
    params,
  });
};
// 移出屏蔽
export const unMuteUser = (userId) => {
  return request({
    url: '/_api/v1/mute',
    method: 'DELETE',
    data: {
      target_account_id: userId,
    },
  });
};

// 隐藏评论
export const hideReply = (statusId, toggle = 0) => {
  return request({
    url: `/_api/v1/statuses/${statusId}/toggle?toggle=${toggle}`,
    method: 'PUT',
  });
};

// 举报用户
export const reportUser = (data) => {
  return request({
    url: '/_api/v1/report',
    method: 'POST',
    data: data,
  });
};

// 推荐关注
export const getRecommendFollow = (params) => {
  return request({
    url: '/_api/v1/recommend/account',
    method: 'GET',
    params,
  });
};

// 修改密码
export const changePassword = (o, n) => {
  return request({
    url: '/_api/v1/change-password',
    method: 'POST',
    data: { old_password: o, password: n },
  });
};

// 新推文通知开关
export const toggleNewStatusNotification = (acct, enable) => {
  return request({
    url: `/_api/v1/${acct}/status-notify`,
    method: 'PUT',
    data: {
      enable,
    }
  });
}

// 关注
export const follow = (data) => {
  return request({
    url: '/_api/v1/follow',
    method: 'PUT',
    data
  });
};
// 取消关注
export const unfollow = (data) => {
  return request({
    url: '/_api/v1/un-follows',
    method: 'PUT',
    data
  });
};

// 用户信息
export const getUserInfo = (acct) => {
  return request({
    url: `/_api/v1/account/${acct}`,
    method: 'GET',
  });
};
// 该用户的推文
export const getUserTweets = (acct, params) => {
  return request({
    url: `/_api/v1/statuses/${acct}`,
    method: 'GET',
    params,
  });
};
