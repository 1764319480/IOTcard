<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
// @ts-ignore
import md5 from 'crypto-js/md5';
// @ts-ignore
import { userStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
// @ts-ignore
import router from '@/router';
const userData = userStore();
// 基本变量
const account = ref('');
const alert_account = ref('');
const pwd = ref('');
const alert_pwd = ref('');
const captchaUrl = ref();//验证码图片
const captcha = ref('');//验证码
const alert_captcha = ref('');
// 获取验证码
const getCaptchaUrl = async() => {
  const data = await userData.getCaptcha();
  if(data) {
    captchaUrl.value = data;
  } else {
    alert_captcha.value = '获取验证码失败'
  }
}
onBeforeMount(() => {
  getCaptchaUrl();
})
// 密码显示与隐藏
const showpwd = ref(false);
const eye_style = ref('close');
const showPwd = () => {
  showpwd.value = !showpwd.value;
  if (eye_style.value === 'close') {
    eye_style.value = 'open';
  } else {
    eye_style.value = 'close';
  }
}
//表单内容格式验证
const checkContent = (option: string) => {
  const regex = /^[a-zA-Z0-9]+$/;
  switch (option) {
    case '账号': {
      if (account.value === '') {
        alert_account.value = '请输入账号';
        return false;
      }
      if (!regex.test(account.value) || account.value.length < 4 || account.value.length > 16) {
        alert_account.value = '输入的账号不正确';
        return false;
      }
      alert_account.value = '';
      return true;
    }
    case '密码': {
      if (pwd.value === '') {
        alert_pwd.value = '请输入密码';
        return false;
      }
      if (!regex.test(pwd.value)) {
        alert_pwd.value = '请输入由字母或数字组成的密码';
        return false;
      }
      if (pwd.value.length < 8 || pwd.value.length > 16) {
        alert_pwd.value = '请输入8~16位的密码';
        return false;
      };
      alert_pwd.value = '';
      return true;
    }
    case '验证码': {
      if (captcha.value === '') {
        alert_captcha.value = '请输入验证码';
        return false;
      }
      alert_captcha.value = '';
      return true;
    }
  }
}
//登录
let timer:any = null;// 登录按钮节流
const slowLogin = () => {
    if(timer) {
      return;
    }
    timer = setTimeout(() => {
      login();
      timer = null;
    }, 1000)
}
const login = async () => {
  const check1 = checkContent('账号');
  const check2 = checkContent('密码');
  const check3 = checkContent('验证码');
  if (!check1 || !check2 || !check3) {
    return;
  }
  const password = md5(pwd.value).toString();
  const result = await userData.login(account.value, password, captcha.value);
  if(result === 1) {
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    setTimeout(() => {
      router.push('/home');
    },300)
  }else {
    ElMessage({
      message: result,
      type: 'error'
    });
  }
}
//批量添加enter点击事件
onMounted(() => {
    function keyEnter() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(node => {
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                  slowLogin();
                }
            })
        })
    }
    keyEnter();
})
</script>

<template>
  <div class="content">
    <div>
      <div class="logo">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="form">
        <div>登录</div>
        <div>
          <div class="account_input">
            <div class="img_div"></div>
            <div class="toflex">
              <input type="text" placeholder="输入账号" v-model="account" @blur="checkContent('账号')">
            </div>
          </div>
          <p class="alert_p">{{ alert_account }}</p>
          <div class="pwd_input">
            <div class="img_div"></div>
            <div class="toflex">
              <input :type="showpwd ? 'text' : 'password'" placeholder="输入密码" v-model="pwd" @blur="checkContent('密码')">
              <div :class="eye_style" @click="showPwd"></div>
            </div>
          </div>
          <p class="alert_p">{{ alert_pwd }}</p>
          <div class="captcha_input">
            <div>
              <div class="img_div"></div>
              <div class="toflex">
                <input type="text" placeholder="验证码" v-model="captcha" @blur="checkContent('验证码')">
              </div>
            </div>
            <div @click="getCaptchaUrl">
              <img :src="captchaUrl" alt="">
            </div>
          </div>
          <p class="alert_p">{{ alert_captcha }}</p>
        </div>
        <div @click="slowLogin">登录</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content {
  width: 100vw;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-image: url("@/assets/images/login-background.png");
  display: flex;
  justify-content: center;
  align-items: center;

  >div {
    display: flex;
    width: 530px;
    height: 350px;
    opacity: 1;
    border-radius: 8px;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);

    .logo {
      width: 265px;
      height: 350px;
      opacity: 1;
      background: #5995FD;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      border-radius: 8px 0 0 8px;

      >div:nth-child(1) {
        background-image: url("@/assets/images/text1.svg");
        background-repeat: no-repeat;
        margin: 5% 0 0 10%;
        align-self: flex-start;
        width: 67px;
        height: 23px;
        opacity: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 18px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #FFFFFF;
      }

      >div:nth-child(2) {
        background-image: url("@/assets/images/text2.svg");
        background-repeat: no-repeat;
        width: 133px;
        height: 94px;
        opacity: 1;
        font-family: YouSheBiaoTiHei;
        font-size: 36px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #FFFFFF;
      }

      >div:nth-child(3) {
        background-image: url("@/assets/images/circle.svg") !important;
        background-repeat: no-repeat !important;
        width: 101px;
        height: 101px;
        opacity: 1;
      }
    }

    .form {
      width: 217px;
      height: 350px;
      opacity: 1;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      border-radius: 0 8px 8px 0;
      padding: 0 24px;

      >div:nth-child(1) {
        align-self: flex-start;
        width: 36px;
        height: 26px;
        opacity: 1;
        font-family: Source Han Sans;
        font-size: 18px;
        font-weight: bold;
        line-height: normal;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        font-feature-settings: "kern" on;
        color: #3D3D3D;
      }

      >div:nth-child(2) {
        .alert_p {
          float: left;
          position: relative;
          left: 30px;
          height: 17px;
          opacity: 1;
          font-family: Source Han Serif CN;
          font-size: 12px;
          font-weight: normal;
          line-height: normal;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          font-feature-settings: "kern" on;
          color: #F33A15;
        }

        >div {
          width: 213px;
          height: 32px;
          opacity: 1;
          box-sizing: border-box;
          border-width: 0px 0px 1px 0px;
          border-style: solid;
          border-color: #CBD5E0;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .toflex {
            flex: 1;
            width: 170px;
          }

          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            margin-left: 3px;
            // background-color: #10ac44;
          }

          input::placeholder {
            width: 48px;
            height: 16px;
            opacity: 1;
            font-family: MiSans;
            font-size: 12px;
            font-weight: normal;
            line-height: normal;
            letter-spacing: 0em;
            font-variation-settings: "opsz" auto;
            font-feature-settings: "kern" on;
            color: #CBD5E0;
          }
        }

        .account_input {
          >.img_div {
            width: 18px;
            height: 18px;
            margin: 0 3px;
            background-repeat: no-repeat;
            background-image: url("@/assets/images/account-icon.png");
          }
        }

        .pwd_input {
          input[type="password"]::-ms-reveal {
            display: none;
          }

          margin-top: 24px;

          >div:nth-child(2) {
            display: flex;

            .open {
              width: 18px;
              height: 18px;
              background-repeat: no-repeat;
              background-image: url("@/assets/images/eye-open.png");
              background-size: contain;
            }

            .close {
              width: 18px;
              height: 18px;
              background-repeat: no-repeat;
              background-image: url("@/assets/images/eye-close.png");
              background-size: contain;
            }
          }

          >.img_div {
            width: 18px;
            height: 21px;
            margin: 0 3px;
            background-repeat: no-repeat;
            background-image: url("@/assets/images/pwd-icon.png");
          }
        }

        .captcha_input {
          border: 0;
          margin-top: 24px;

          >div:nth-child(1) {
            width: 133px;
            height: 32px;
            opacity: 1;
            box-sizing: border-box;
            border-width: 0px 0px 1px 0px;
            border-style: solid;
            border-color: #CBD5E0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            >.img_div {
              width: 18px;
              height: 22px;
              margin: 0 3px;
              background-repeat: no-repeat;
              background-image: url("@/assets/images/captcha-icon.png");
            }
          }

          >div:nth-child(2) {
            img {
              width: 67px;
              height: 25px;
            }
            // margin-left: 13px;
            opacity: 1;
            background-repeat: no-repeat;
          }
        }
      }

      >div:nth-child(3) {
        width: 213px;
        height: 32px;
        border-radius: 4px;
        opacity: 1;
        background: #5995FD;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Source Han Serif CN;
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
        letter-spacing: 0.5em;
        font-variation-settings: "opsz" auto;
        font-feature-settings: "kern" on;
        color: #FFFFFF;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
