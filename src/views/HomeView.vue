<script setup lang="ts">
import { ref } from 'vue';
import { Plus, Refresh, Search, Delete, Warning } from '@element-plus/icons-vue';
// @ts-ignore
import { userStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
const userData = userStore();
// 显示遮罩层
const showBackground = ref(false);
// 显示选项
const options = ref(false);
const showOptions = (lock: boolean, e: Event) => {
    e.stopPropagation();
    options.value = lock;
}
// 显示设置
const showSetting = ref(false);
const select_setting = (e: Event) => {
    e.stopPropagation();
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
const userName = ref(userData.user.userName);
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
// 修改昵称/用户名
const changeUserName = async () => {
    const data = await userData.updateUserInfo(userName.value);
    if(data === 1) {
        ElMessage({
            message: '修改成功',
            type: 'success'
        })
    } else {
        ElMessage({
            message: data,
            type: 'error'
        })
    }
}
// 提交数据
const submit = () => {
    if(showSettingOption.value) {
        changeUserName();
    }
}
</script>
<template>
    <div class="content" @click="showOptions(false, $event)">
        <div class="header">
            <div class="title"></div>
            <div class="account" @click="showOptions(true, $event)"></div>
            <div class="table" v-show="options">
                <div>
                    <div></div>
                    <p>{{ userData.user.userName || '未登录' }}</p>
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
            <div class="sider">
                <div class="manage_system">
                    <div>
                        <div></div>
                        <div>系统管理</div>
                    </div>
                    <div></div>
                </div>
                <div class="manage_user select_manage">
                    <p>用户管理</p>
                </div>
                <div class="manage_role">
                    <p>角色管理</p>
                </div>
            </div>
            <div class="main">
                <div class="process">
                    <div>系统管理</div>
                    <div>&nbsp;>&nbsp;</div>
                    <div>用户管理</div>
                </div>
                <div class="filter">
                    <div>
                        <p>用户名/账号</p>
                        <div>
                            <input type="text" placeholder="搜索用户名/账号">
                        </div>
                    </div>
                    <div>
                        <p>用户角色</p>
                        <el-dropdown>
                            <div class="checkgroup">
                                <p>全部</p>
                                <div></div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>全部</el-dropdown-item>
                                    <el-dropdown-item>管理员</el-dropdown-item>
                                    <el-dropdown-item>普通用户</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div>
                        <p>状态</p>
                        <el-dropdown>
                            <div class="checkgroup">
                                <p>全部</p>
                                <div></div>
                            </div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>全部</el-dropdown-item>
                                    <el-dropdown-item>启用</el-dropdown-item>
                                    <el-dropdown-item>禁用</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                    <div>
                        <p>创建时间</p>
                        <div></div>
                    </div>
                    <div>
                        <el-button type="primary" :icon="Search">搜索</el-button>
                        <el-button :icon="Refresh">重置</el-button>
                    </div>
                    <div>
                        <el-button type="primary" :icon="Plus">添加</el-button>
                        <el-button type="danger" :icon="Delete">删除</el-button>
                    </div>
                </div>
                <div class="lists">
                    <div class="listName">
                        <div><el-checkbox></el-checkbox></div>
                        <div>序号</div>
                        <div>用户名</div>
                        <div>账号</div>
                        <div>用户角色</div>
                        <div>状态</div>
                        <div>创建时间</div>
                        <div>操作</div>
                    </div>
                    <!-- <template> -->
                    <div>
                        <div><el-checkbox></el-checkbox></div>
                        <div>1</div>
                        <div>张三</div>
                        <div>zhangsan</div>
                        <div>管理员</div>
                        <div><el-switch inline-prompt active-text="启用" inactive-text="禁用" /></div>
                        <div>2024-10-19 2:17</div>
                        <div>
                            <p>编辑</p>
                            &nbsp;
                            <el-popover placement="top" :width="200" trigger="click">
                                <div
                                    style="display: flex;flex-direction: column; justify-content: space-around; width: 168px; height: 96px;">
                                    <div style="display: flex;align-items: center;justify-content: space-around">
                                        <el-icon color="red">
                                            <Warning />
                                        </el-icon>
                                        <p>确定删除该记录吗？</p>
                                    </div>

                                    <div style="display: flex;justify-content: flex-end;">
                                        <el-button>取消</el-button>
                                        <el-button type="danger">确定</el-button>
                                    </div>
                                </div>
                                <template #reference>
                                    <p>删除</p>
                                </template>
                            </el-popover>
                        </div>
                    </div>
                    <!-- </template> -->
                </div>
                <div class="foot">
                    <div>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="background" v-show="showBackground" @click="e => e.stopPropagation()">
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
                                <input type="text" v-model="userName">
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
                        <div class="point-cursor" @click="submit">保存</div>
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
        z-index: 999;
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
            top: 45px;
            right: 0;
            width: 193px;
            height: 130px;
            border-radius: 4px;
            z-index: 99;
            opacity: 1;
            background: #FFFFFF;
            box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.3);

            >div {
                display: flex;
                align-items: center;

            }

            >div:hover {
                background: rgba(89, 149, 253, 0.071);
                cursor: default;
            }

            p {
                width: 100px;
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
            width: 200px;
            opacity: 1;
            border-right: 1px solid #CBD5E0;

            .select_manage {
                color: #5995FD;
                font-weight: bold;
                background: rgba(89, 149, 253, 0.051);
            }

            >div {
                opacity: 1;
                font-family: Source Han Serif CN;
                font-size: 14px;
                font-weight: normal;
                line-height: normal;
                letter-spacing: 0em;
                font-variation-settings: "opsz" auto;
                font-feature-settings: "kern" on;
                color: #4E5D78;
            }

            .manage_system {
                width: 200px;
                height: 50px;
                opacity: 1;
                display: flex;
                justify-content: space-between;
                align-items: center;

                >div:nth-child(1) {
                    width: 50%;
                    display: flex;

                    >div:nth-child(1) {
                        width: 20px;
                        height: 20px;
                        margin: 0 10px;
                        background-image: url('@/assets/images/setting-icon.svg');
                        background-size: contain;
                    }

                    >div:nth-child(2) {
                        width: 56px;
                        height: 20px;
                    }

                }

                >div:nth-child(2) {
                    width: 14px;
                    height: 8px;
                    margin-right: 11px;
                    background-image: url('@/assets/images/arrow-bottom.svg');
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }

            .manage_user,
            .manage_role {
                width: 200px;
                height: 50px;
                opacity: 1;
                display: flex;
                align-items: center;

                p {
                    margin-left: 40px;
                }
            }
        }

        .main {
            flex: 1;
            .process {
                height: 50px;
                box-sizing: border-box;
                opacity: 1;
                border-style: solid;
                border-width: 0px 0px 1px 0px;
                border-color: #CBD5E0;
                display: flex;
                align-items: center;

                >:nth-child(1) {
                    margin-left: 16px;
                    font-family: Source Han Serif CN;
                    font-weight: 700;
                    font-size: 14px;
                    font-variation-settings: "opsz" auto;
                    color: #3D3D3D
                }

                >div:nth-child(3) {
                    font-family: Source Han Serif CN;
                    font-weight: 400;
                    font-size: 14px;
                    font-variation-settings: "opsz" auto;
                    color: #909AAA
                }
            }

            .filter {
                height: 60px;
                display: flex;
                align-items: center;

                >div {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 50px;

                    >p {
                        font-family: 思源黑体;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: normal;
                        letter-spacing: 0px;
                        color: #3D3D3D;
                        margin-left: 8px;
                    }
                }

                >div:nth-child(1) {
                    width: 200px;

                    >div {
                        width: 100px;
                        height: 32px;
                        border-radius: 4px;
                        opacity: 1;
                        background: #FFFFFF;
                        box-sizing: border-box;
                        border: 1px solid #CBD5E0;

                        >input {
                            width: 90%;
                            height: 100%;
                            border: none;
                            outline: none;
                            box-shadow: none;
                            margin: 0 5%;
                        }

                        input::placeholder {
                            font-family: 思源黑体;
                            font-size: 12px;
                            font-weight: normal;
                            line-height: normal;
                            letter-spacing: 0px;
                            color: #909AAA;
                        }
                    }
                }

                >div:nth-child(2),
                >div:nth-child(3) {
                    width: 140px;
                    .checkgroup {
                        width: 70px;
                        height: 32px;
                        border-radius: 4px;
                        opacity: 1;
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                        background: #FFFFFF;
                        box-sizing: border-box;
                        border: 1px solid #CBD5E0;

                        >p {
                            font-family: 思源黑体;
                            font-size: 12px;
                            font-weight: normal;
                            line-height: normal;
                            letter-spacing: 0px;
                            color: #909AAA;
                        }

                        >div {
                            width: 9px;
                            height: 6px;
                            background-image: url('@/assets/images/arrow-bottom.svg');
                            background-size: contain;
                            background-repeat: no-repeat;
                        }
                    }
                }

                >div:nth-child(3) {
                    width: 110px;
                }

                >div:nth-child(4) {
                    width: 264px;

                    >div {
                        width: 190px;
                        height: 32px;
                        border-radius: 4px;
                        box-sizing: border-box;
                        border: 1px solid #CBD5E0;
                    }
                }

                >div:nth-child(5),
                >div:nth-child(6) {
                    margin-left: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                }

                >div:nth-child(6) {
                    margin-left: 10px;
                }
            }

            .lists {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 68vh;

                >div {
                    width: 99%;
                    height: 39px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid rgb(207, 202, 202);

                    >div {
                        width: 120px;
                    }

                    >div:nth-child(1) {
                        margin-left: 10px;
                        width: 20px;
                    }

                    >div:nth-child(2) {
                        width: 50px;
                    }

                    >div:nth-child(7) {
                        width: 200px;
                    }

                    >div:nth-child(8) {
                        display: flex;

                        >p:nth-child(1) {
                            color: #5995FD
                        }

                        >p:nth-child(2) {
                            color: #F33A15
                        }

                        >p:hover {
                            cursor: default;
                        }
                    }
                }

                .listName {
                    background: #EEEEEE;
                    z-index: 0;

                    >p {
                        font-family: 思源黑体;
                        font-size: 16px;
                        font-weight: normal;
                        line-height: normal;
                        letter-spacing: 0px;
                        color: #1A1A1A;
                        z-index: 1;
                    }
                }
            }

            .foot {
                width: 99%;
                height: 40px;
                margin: 0 0.5%;
                // background-color: #c21b1b;
                display: flex;
                align-items: center;
                justify-content: flex-end;

                >div {
                    width: 100px;
                    display: flex;
                    justify-content: space-around;

                    >p {
                        font-family: Inter;
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 12px;
                        letter-spacing: 0px;
                        color: #9C9C9C;
                    }

                    >p:hover {
                        cursor: default;
                    }
                }
            }
        }
    }
}
</style>