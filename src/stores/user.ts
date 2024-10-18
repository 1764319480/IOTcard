import { ref } from 'vue'
import { defineStore } from 'pinia';
// @ts-ignore
import axios from '@/utils/request';
export const userStore = defineStore('user', () => {
  const user = ref('user');
  const sessionId = ref();
  // 获取验证码
  const getCaptcha = async () => {
    const res = await axios.get('/api/api/common/captcha',{
      params: {
        sessionId: sessionId.value
      }
    });
    if(res.data.success) {
      sessionId.value = res.data.data.sessionId;
      return res.data.data.captcha;
    } else {
      return false;
    }
  }
  // 登录
  const login = async (account:string, password:string, verifyCode:string) => {
    const res = await axios.post('/api/api/user/login', {
      account,
      password,
      sessionId: sessionId.value,
      verifyCode
    })
    if(res.data.success) {
      document.cookie = `token=${res.data.data}`
      return 1;
    }else {
      return res.data.message;
    }
  }
  return { user, sessionId, login, getCaptcha }
},{
  persist: true
  }
)
