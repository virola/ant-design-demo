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

export async function getHomeStats() {
  // todo
};
