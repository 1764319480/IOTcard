import { ref } from 'vue'
import { defineStore } from 'pinia';
// @ts-ignore
import axios from '@/utils/request';
export const userStore = defineStore('user', () => {
  const user = ref();
  const token = ref();
  // 登录
  const login = async (account:string, password:string) => {
    const res = await axios.post('/api/login', {
      account,
      password
    })
    if(res.data.success) {
      token.value = res.data;
      return 1;
    }else {
      return res.data.message;
    }
  }
  return { user, token, login }
})
