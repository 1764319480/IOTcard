<script setup lang="ts">
import { ref } from 'vue';
// 显示遮罩层
const showBackground = ref(false);
// 显示设置
const showSetting = ref(false);
const select_setting = () => {
    showBackground.value = true;
    showSetting.value = true;
}
// 关闭遮罩层
const closeBackground = () => {
    showSetting.value = false;
    showBackground.value = false;
}
// 设置里的选项卡
const showSettingOption = ref(true);
const setting_select = (option: string) => {
    if (option === '个人资料') {
        showSettingOption.value = true;
    } else {
        showSettingOption.value = false;
    }
}
// 基本变量
const old_pwd = ref('');
const alert_oldpwd = ref('');
const new_pwd = ref('');
const alert_newpwd = ref('');
const comfirm_pwd = ref('');
const alert_comfirmpwd = ref('');
// 显示与隐藏密码
const eye_list = ref([false, false, false]);
const showPwd = (option: number) => {
    eye_list.value[option] = !eye_list.value[option];
}
// 密码格式验证
const checkPwd = (option: string) => {
    const regex = /^[a-zA-Z0-9]+$/;
    switch (option) {
        case '原密码': {
            if (old_pwd.value === '') {
                alert_oldpwd.value = '请输入密码';
                return false;
            }
            if (!regex.test(old_pwd.value)) {
                alert_oldpwd.value = '请输入由字母或数字组成的密码';
                return false;
            }
            if (old_pwd.value.length < 8 || old_pwd.value.length > 16) {
                alert_oldpwd.value = '请输入8~16位的密码';
                return false;
            };
            alert_oldpwd.value = '';
            return true;
        }
        case '新密码': {
            if (new_pwd.value === '') {
                alert_newpwd.value = '请输入密码';
                return false;
            }
            if (!regex.test(new_pwd.value)) {
                alert_newpwd.value = '请输入由字母或数字组成的密码';
                return false;
            }
            if (new_pwd.value.length < 8 || new_pwd.value.length > 16) {
                alert_newpwd.value = '请输入8~16位的密码';
                return false;
            };
            alert_oldpwd.value = '';
            return true;
        }
        case '确认密码': {
            if (comfirm_pwd.value === '') {
                alert_comfirmpwd.value = '请输入密码';
                return false;
            }
            if (!regex.test(comfirm_pwd.value)) {
                alert_comfirmpwd.value = '请输入由字母或数字组成的密码';
                return false;
            }
            if (comfirm_pwd.value.length < 8 || comfirm_pwd.value.length > 16) {
                alert_comfirmpwd.value = '请输入8~16位的密码';
                return false;
            };
            alert_comfirmpwd.value = '';
            return true;
        }
    }

}
</script>
<template>
    <div class="content">
        <div class="header">
            <div class="title"></div>
            <div class="account"></div>
            <div class="table">
                <div>
                    <div></div>
                    <p>用户名</p>
                </div>
                <div :class="showSetting ? 'select_div point-cursor' : 'point-cursor'" @click="select_setting">
                    <div></div>
                    <p>设置</p>
                </div>
                <div>
                    <div></div>
                    <p>退出</p>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="sider"></div>
            <div class="main"></div>
        </div>
        <div class="background" v-show="showBackground">
            <div class="setting" v-show="showSetting">
                <div class="setting-left">
                    <div>设置</div>
                    <div :class="showSettingOption ? 'select_div point-cursor' : 'point-cursor'"
                        @click="setting_select('个人资料')">&nbsp;个人资料</div>
                    <div :class="!showSettingOption ? 'select_div point-cursor' : 'point-cursor'"
                        @click="setting_select('修改密码')">&nbsp;修改密码</div>
                </div>
                <div class="setting-right">
                    <div class="select_title">{{ showSettingOption ? '个人资料' : '修改密码' }}</div>
                    <div v-show="showSettingOption" class="setting-content">
                        <div>
                            <p>昵称</p>
                            <div>
                                <input type="text">
                            </div>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                    <div v-show="!showSettingOption" class="setting-content">
                        <div>
                            <p>原密码</p>
                            &nbsp;&nbsp;
                            <div class="toflex">
                                <input :type="eye_list[0] ? 'text' : 'password'" placeholder="输入原密码" v-model="old_pwd"
                                    @blur="checkPwd('原密码')">
                                <div :class="eye_list[0] ? 'open' : 'close'" @click="showPwd(0)"></div>
                            </div>
                        </div>
                        <p class="alert_p">{{ alert_oldpwd }}</p>
                        <div>
                            <p>新密码</p>
                            &nbsp;&nbsp;
                            <div class="toflex">
                                <input :type="eye_list[1] ? 'text' : 'password'" placeholder="输入新密码" v-model="new_pwd"
                                    @blur="checkPwd('新密码')">
                                <div :class="eye_list[1] ? 'open' : 'close'" @click="showPwd(1)"></div>
                            </div>
                        </div>
                        <p class="alert_p">{{ alert_newpwd }}</p>
                        <div>
                            <p>确认密码</p>
                            &nbsp;&nbsp;
                            <div class="toflex">
                                <input :type="eye_list[2] ? 'text' : 'password'" placeholder="再次输入新密码"
                                    v-model="comfirm_pwd" @blur="checkPwd('确认密码')">
                                <div :class="eye_list[2] ? 'open' : 'close'" @click="showPwd(2)"></div>
                            </div>
                        </div>
                        <p class="alert_p">{{ alert_comfirmpwd }}</p>
                    </div>
                    <div class="list_button">
                        <div class="point-cursor" @click="closeBackground">取消</div>
                        <div class="point-cursor">保存</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

    .select_div {
        background: rgba(89, 149, 253, 0.071);
    }

    .point-cursor {
        cursor: pointer;
    }

    .background {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;

        p {
            width: 42px;
            height: 20px;
            opacity: 1;
            font-family: Source Han Serif CN;
            font-size: 14px;
            font-weight: normal;
            line-height: normal;
            letter-spacing: 0em;
            font-variation-settings: "opsz" auto;
            font-feature-settings: "kern" on;
            color: #3D3D3D;
        }

        .setting {
            width: 505px;
            height: 332px;
            border-radius: 4px;
            opacity: 1;
            background: #FFFFFF;
            display: flex;

            .setting-left {
                width: 140px;
                height: 332px;
                opacity: 1;
                box-sizing: border-box;
                border-width: 0px 1px 0px 0px;
                border-style: solid;
                border-color: #CBD5E0;

                >div:nth-child(1) {
                    width: 36px;
                    height: 26px;
                    margin: 10px 16px 14px;
                    opacity: 1;
                    font-family: Source Han Serif CN;
                    font-size: 18px;
                    font-weight: bold;
                    line-height: normal;
                    letter-spacing: 0em;
                    font-variation-settings: "opsz" auto;
                    font-feature-settings: "kern" on;
                    color: #3D3D3D;
                }

                >div:nth-child(2) {
                    display: flex;
                    align-items: center;
                    width: 121px;
                    height: 32px;
                    border-radius: 4px;
                    margin: 6px 16px;
                    opacity: 1;
                    font-family: Source Han Serif CN;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: normal;
                    letter-spacing: 0em;
                    font-variation-settings: "opsz" auto;
                    font-feature-settings: "kern" on;
                    color: #3D3D3D;
                }

                >div:nth-child(3) {
                    display: flex;
                    align-items: center;
                    opacity: 1;
                    width: 121px;
                    height: 32px;
                    margin: 6px 16px;
                    font-family: Source Han Serif CN;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: normal;
                    letter-spacing: 0em;

                    font-variation-settings: "opsz" auto;
                    font-feature-settings: "kern" on;
                    color: #3D3D3D;
                }
            }

            .setting-right {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                flex: 1;

                .select_title {
                    width: 56px;
                    height: 20px;
                    opacity: 1;
                    margin-left: 16px;
                    margin-top: 12px;
                    align-self: flex-start;
                    font-family: Source Han Serif CN;
                    font-size: 14px;
                    font-weight: normal;
                    line-height: normal;
                    letter-spacing: 0em;
                    font-variation-settings: "opsz" auto;
                    font-feature-settings: "kern" on;
                    color: #3D3D3D;
                }

                .setting-content {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    width: 306px;
                    height: 200px;
                    opacity: 1;

                    // background-color: #b93b3b;
                    .alert_p {
                        float: left;
                        position: relative;
                        top: -8px;
                        left: 5px;
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
                        width: 180px;
                    }

                    .toflex {
                        display: flex;
                        align-items: center;
                        width: 180px;
                        // justify-content: space-around;
                    }

                    .open {
                        width: 18px;
                        height: 16px;
                        margin-right: 10px;
                        background-repeat: no-repeat;
                        background-image: url("@/assets/images/eye-open.png");
                        background-size: contain;
                    }

                    .close {
                        width: 18px;
                        height: 16px;
                        margin-right: 10px;
                        background-repeat: no-repeat;
                        background-image: url("@/assets/images/eye-close.png");
                        background-size: contain;
                    }

                    >div {
                        display: flex;
                        align-items: center;
                        width: 306px;
                        height: 54px;
                        // justify-content: space-between;
                        opacity: 1;

                        p {
                            width: 56px;
                        }

                        >div {
                            // flex: 1;
                            width: 197px;
                            height: 32px;
                            border-radius: 4px;
                            opacity: 1;
                            box-sizing: border-box;
                            border: 1px solid #CBD5E0;

                            input {
                                margin-left: 4%;
                                width: 95%;
                                height: 100%;
                                border: none;
                                outline: none;
                                box-shadow: none;

                            }

                            input[type="password"]::-ms-reveal {
                                display: none;
                            }
                        }
                    }
                }

                .list_button {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    width: 365px;
                    height: 54px;
                    opacity: 1;

                    >div {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 65px;
                        height: 30px;
                        border-radius: 4px;
                        opacity: 1;
                        box-sizing: border-box;
                        border: 1px solid #909AAA;
                        font-family: Source Han Serif CN;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: normal;
                        letter-spacing: 0em;
                        font-variation-settings: "opsz" auto;
                        font-feature-settings: "kern" on;
                        color: #909AAA;
                        margin-right: 16px;
                    }

                    >div:nth-child(2) {
                        color: #FFFFFF;
                        background: #5995FD;
                    }
                }
            }
        }
    }

    .header {
        height: 50px;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(203, 213, 224);

        .title {
            width: 133px;
            height: 31px;
            background-image: url('@/assets/images/title.svg');
            background-size: contain;
            margin-left: 24px;
        }

        .account {
            width: 30px;
            height: 30px;
            opacity: 1;
            background-image: url('@/assets/images/account-circle-fill.svg');
            background-size: contain;
            margin-right: 24px;
        }

        .table {
            position: absolute;
            float: right;
            top: 50px;
            right: 21px;
            width: 193px;
            height: 130px;
            border-radius: 4px;
            opacity: 1;
            background: #FFFFFF;
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);

            >div {
                display: flex;
                align-items: center;
            }

            p {
                width: 42px;
                height: 20px;
                opacity: 1;
                font-family: Source Han Serif CN;
                font-size: 14px;
                font-weight: normal;
                line-height: normal;
                letter-spacing: 0em;
                font-variation-settings: "opsz" auto;
                font-feature-settings: "kern" on;
                color: #3D3D3D;
            }

            >div:nth-child(1) {
                height: 54px;

                div {
                    width: 30px;
                    height: 30px;
                    margin: 0 12px;
                    background-image: url('@/assets/images/account-circle-fill.svg');
                    background-size: contain;
                }
            }

            >div:nth-child(2) {
                height: 36px;

                >div:nth-child(1) {
                    width: 24px;
                    height: 24px;
                    margin: 0 15px;
                    background-image: url('@/assets/images/settings-5-fill.svg');
                    background-size: contain;
                }
            }

            >div:nth-child(3) {
                height: 36px;

                div {
                    width: 24px;
                    height: 24px;
                    margin: 0 15px;
                    background-image: url('@/assets/images/logout-box-r-fill.svg');
                    background-size: contain;
                }
            }

            .select_div {
                background: rgba(89, 149, 253, 0.071);
            }
        }
    }

    .body {
        flex: 1;
        width: 100vw;
        display: flex;

        .sider {
            width: 220px;
            ;
            opacity: 1;
            border-right: 1px solid #CBD5E0;
        }

        .main {
            flex: 1;
        }
    }
}
</style>