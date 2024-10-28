import request from '@/utils/request'

// 获取列表
export const getEmailDomainBlocksList = () => {
  return request({
    url: `/_api/admin/email_domain_blocks`,
    method: 'get',
  });
};

// 新增
export const createEmailDomainBlocks = (data) => {
  return request({
    url: `/_api/admin/email_domain_blocks`,
    method: 'post',
    data
  });
};

// 删除
export const deleteEmailDomainBlocks = (id) => {
  return request({
    url: `/_api/admin/email_domain_blocks/${id}`,
    method: 'delete'
  })
};
