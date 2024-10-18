import request from '@/utils/request'

// 获取列表
export const getEmailDomainBlocksList = () => {
  return request(`/_api/admin/email_domain_blocks`, {
    method: 'get',
  });
};

// 新增
export const createEmailDomainBlocks = (data) => {
  return request(`/_api/admin/email_domain_blocks`, {
    method: 'post',
    body: data,
  });
};

// 删除
export const deleteEmailDomainBlocks = (id) => {
  return request(`/_api/admin/email_domain_blocks/${id}`, {
    method: 'delete',
  });
};
