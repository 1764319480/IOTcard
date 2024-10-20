import { ref } from 'vue'
import { defineStore } from 'pinia';
// @ts-ignore
import axios from '@/utils/request';
export const userStore = defineStore('user', () => {
  const user = ref();// 用户信息
  const userList = ref();// 用户列表
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
    if(res.data.success) {2*60*60
      document.cookie = `token=${res.data.data}; max-age=7200`
      getPersonInfo();
      return 1;
    }else {
      return res.data.message;
    }
  }
  // 获取个人信息
  const getPersonInfo = async () => {
    const res = await axios.get('/api/api/user/my_profile');
    if(res.data.success) {
      user.value = res.data.data;
      return 1;
    } else {
      return res.data.message;
    }
  }
  // 修改用户信息
  const updatePersonInfo = async (userId: string, userName:string, status: number) => {
    const res = await axios.post('/api/api/user/update',{
      userId,
      userName,
      status
    })
    if(res.data.success) {
      user.value.userName = userName;
      return 1;
    } else {
      return res.data.message;
    }
  }
  // 修改密码
  const updatePassword = async (oldPassword:string, newPassword:string) => {
    const res = await axios.post('/api/api/user/update_pwd', {
      oldPassword,
      newPassword
    })
    if(res.data.success) {
      return 1;
    } else {
      return res.data.message;
    }
  }
  // 获取用户列表
  const getUserList = async (condition: object) => {
    const res = await axios.post('/api/api/user/list',condition);
    if(res.data.success) {
      userList.value = res.data.data.list;
      console.log(userList.value)
      return 1;
    } else {
      return res.data.message;
    }
  }
  // 退出登录
  const exitLogin = () => {
    user.value = '';
    sessionId.value = '';
    document.cookie = 'token' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    sessionStorage.clear();
  }

  return { user, sessionId, userList, login, getCaptcha, getPersonInfo, updatePersonInfo, updatePassword, exitLogin, getUserList }
},{
  persist: true
  }
)
