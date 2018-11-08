// import { stringify } from 'qs';
import md5 from 'md5';
import request from '@/utils/request';

export async function accountLogin(params) {
  const { userName, password } = params;
  const encrypt = md5(password).toUpperCase();
  // console.log(password, encrypt);

  return request('/api/login', {
    method: 'POST',
    body: {
      userName,
      password: encrypt,
    },
  });
}

// 根据登录账户获取所有科室列表
export async function getDepartments() {
  return request('/api/getDepartments');
}

// 图表数据
export async function fakeChartData() {
  return request('/api/todo');
}
