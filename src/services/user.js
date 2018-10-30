import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  const userInfo = JSON.parse(localStorage.userInfo);
  // console.log(userInfo);
  return userInfo;
  // return request('/api/currentUser');
}
