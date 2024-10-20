<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Plus, Refresh, Search, Delete, Warning } from '@element-plus/icons-vue';
// @ts-ignore
import { userStore } from '@/stores/user';
import { ElMessage } from 'element-plus';
const userData = userStore();
// 表单选项
const keyword = ref();
const roleId = ref();
const status = ref();
const timeList = ref([]);
// 筛选角色
const roles = ['系统管理员', '管理员', '普通用户', '全部'];
const selectRole = ref(roles[3]);
const filterRole = (command: number) => {
    selectRole.value = roles[command - 1000];
    roleId.value = command;
}
// 筛选状态
const statuses = ['禁用', '启用', '全部'];
const selectStatus = ref(statuses[2]);
const filterStatus = (command: number) => {
    selectStatus.value = statuses[command];
    status.value = command;
}
// 重置输入内容
const reset = () => {
    keyword.value = '';
    filterRole(1003);
    filterStatus(2);
    timeList.value = [];
}
// 搜索结果
const userList = ref();
// 搜索用户
let timer1: any = null;// 提交按钮节流
const slowSearch = () => {
    if (timer1) {
        return;
    }
    timer1 = setTimeout(() => {
        search();
        timer1 = null;
    }, 1000)
}
const search = async () => {
    const data = await userData.getUserList({
        keyword: keyword.value,
        roleId: roleId.value,
        status: status.value,
        startTime: timeList.value[0],
        endTime: timeList.value[1],
        pageNum: 1,
        pageSize: 10
    })
    if (data === 1) {
        userList.value = userData.userList;
        userList.value.forEach((item: any) => {
            if (item.status === 1) {
                item.statusParse = true;
            } else {
                item.statusParse = false;
            }
        })
        ElMessage({
            message: '查询成功',
            type: 'success'
        })
    } else {
        ElMessage({
            message: data,
            type: 'error'
        })
    }
}
// 从数组中取出角色名称
const getRoleName = (roleArray:object[]) => {
    return roleArray.map((e: any) => e.roleName).join(',')
}
// 批量删除
const dialogVisible = ref(false);
const handleClose = () => {
}
// 添加用户
const new_account = ref();
const new_userName = ref();
const new_role = ref();
const fix_pwd = '12345678';
const centerDialogVisible = ref(false);
//批量添加enter点击事件
onMounted(() => {
    function keyEnter() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(node => {
            node.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    node.blur();
                }
            })
        })
    }
    keyEnter();
})
</script>

<template>
    <div class="content">
        <div class="filter">
                    <div class="filter_left">
                        <div>
                            <p>关键字</p>
                            <div>
                                <input type="text" placeholder="搜索用户名/账号" v-model="keyword">
                            </div>
                        </div>
                        <div>
                            <p>用户角色</p>
                            <el-dropdown @command="filterRole">
                                <div class="checkgroup">
                                    <p>{{ selectRole }}</p>
                                    <div></div>
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="1003">全部</el-dropdown-item>
                                        <el-dropdown-item command="1000">系统管理员</el-dropdown-item>
                                        <el-dropdown-item command="1001">管理员</el-dropdown-item>
                                        <el-dropdown-item command="1002">普通用户</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <p>状态</p>
                            <el-dropdown @command="filterStatus">
                                <div class="checkgroup">
                                    <p>{{ selectStatus }}</p>
                                    <div></div>
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="2">全部</el-dropdown-item>
                                        <el-dropdown-item command="1">启用</el-dropdown-item>
                                        <el-dropdown-item command="0">禁用</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <div>
                            <p>创建时间</p>
                            <div>
                                <el-date-picker v-model="timeList" type="datetimerange" start-placeholder="开始时间"
                                    end-placeholder="结束时间" value-format="YYYY/MM/DD HH:mm:ss" />
                            </div>
                        </div>
                        <div>
                            <el-button type="primary" :icon="Search" @click="slowSearch">搜索</el-button>
                            <el-button :icon="Refresh" type="primary" plain="true" @click="reset">重置</el-button>
                        </div>
                    </div>
                    <div class="filter_right">
                        <div>
                            <el-button type="primary" :icon="Plus" @click="centerDialogVisible = true">添加</el-button>
                            <el-dialog v-model="centerDialogVisible" title="添加用户" width="400" align-center>
                                <div class="account_form">
                                    <div>
                                        <div>
                                            <p>*</p>
                                            <p>账</p>
                                            <p>明</p>
                                            <p>号：</p>
                                        </div>
                                        <el-input v-model="new_account" style="width: 200px" placeholder="请输入账号"
                                            clearable />
                                    </div>
                                    <div>
                                        <div>
                                            <p>*</p>
                                            <p>用户</p>
                                            <p></p>
                                            <p>名：</p>
                                        </div>
                                        <el-input v-model="new_userName" style="width: 200px" placeholder="请输入用户名"
                                            clearable />
                                    </div>
                                    <div>
                                        <div>
                                            <p>*</p>
                                            <p>角</p>
                                            <p>明</p>
                                            <p>色：</p>
                                        </div>
                                        <el-input v-model="new_role" style="width: 200px" placeholder="请选择角色"
                                            clearable />
                                    </div>
                                    <div>
                                        <div>
                                            <p>*</p>
                                            <p>密</p>
                                            <p>明</p>
                                            <p>码：</p>
                                        </div>
                                        <el-input v-model="fix_pwd" style="width: 200px" placeholder="Please input"
                                            disabled />
                                    </div>
                                </div>
                                <template #footer>
                                    <div class="dialog-footer">
                                        <el-button @click="centerDialogVisible = false">取消</el-button>
                                        <el-button type="primary" @click="centerDialogVisible = false">
                                            保存
                                        </el-button>
                                    </div>
                                </template>
                            </el-dialog>
                            &nbsp;
                            <el-button type="danger" :icon="Delete" plain="true"
                                @click="dialogVisible = true">删除</el-button>
                            <el-dialog v-model="dialogVisible" width="200" :before-close="handleClose"
                                :show-close="false">
                                <div class="delete_class">
                                    <el-icon color="red">
                                        <Warning />
                                    </el-icon>
                                    <div class="delete_title">确认删除?</div>
                                    <div class="delete_data">将删除5条记录，请谨慎操作！</div>
                                </div>
                                <template #footer>
                                    <div class="dialog-footer">
                                        <el-button @click="dialogVisible = false">取消</el-button>
                                        <el-button type="danger" @click="dialogVisible = false">
                                            确认
                                        </el-button>
                                    </div>
                                </template>
                            </el-dialog>
                        </div>
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
                    <template v-for="(item) in userList" :key="item.id">
                        <div>
                            <div><el-checkbox></el-checkbox></div>
                            <div>{{ item.id }}</div>
                            <div>{{ item.userName }}</div>
                            <div>{{ item.account }}</div>
                            <!-- eslint和typescript规则冲突 -->
                            <div>{{ getRoleName(item.roles) }}</div>
                            <div><el-switch inline-prompt active-text="启用" inactive-text="禁用"
                                    v-model="item.statusParse" /></div>
                            <div>{{ item.createTime.toString().slice(0, 19).replace('T', ' ') }}</div>
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
                    </template>
                </div>
    </div>
</template>

<style lang="scss" scoped>
.content {
    .filter {
                display: flex;
                justify-content: space-between;

                .filter_left {
                    // height: 60px;
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;

                    >div {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 50px;
                        padding: 0 10px;

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
                        width: 160px;

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
                                height: 15px;
                                width: 50px;
                                overflow: hidden;
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
                        // width: 264px;

                        >div {
                            margin-left: 10px;
                            display: flex;
                            align-items: center;
                            height: 32px;
                            border: 0;
                        }
                    }

                    >div:nth-child(5) {
                        margin-left: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                }

                .filter_right {
                    width: 300px;
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .account_form {
                        width: 350px;
                        height: 200px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        // background-color: #7e0d0d;
                        >div {
                            display: flex;
                            align-items: center;
                            width: 300px;
                            height: 33px;

                            >div:nth-child(1) {
                                display: flex;
                                align-items: center;
                                width: 80px;
                                height: 20px;
                                opacity: 1;
                                font-family: Source Han Sans;
                                font-size: 14px;
                                font-weight: normal;
                                line-height: normal;
                                letter-spacing: 0em;
                                font-variation-settings: "opsz" auto;
                                font-feature-settings: "kern" on;
                                color: #3D3D3D;
                                >p:nth-child(1) {
                                    color: red;
                                    margin: 6px 4px 0 0;
                                }
                                >p:nth-child(3) {
                                    opacity: 0;
                                }
                            }

                            >div:nth-child(2) {
                                width: 174px;
                                height: 32px;
                                border-radius: 4px;
                                opacity: 1;
                                box-sizing: border-box;
                                border: 1px solid #CBD5E0;
                            }
                        }
                    }

                    .delete_class {
                        display: flex;
                        flex-direction: column;
                        align-items: center;

                        .delete_title {
                            margin-top: 10px;
                            height: 23px;
                            font-family: Source Han Sans;
                            font-size: 16px;
                            font-weight: normal;
                            line-height: normal;
                            letter-spacing: 0em;
                            font-variation-settings: "opsz" auto;
                            font-feature-settings: "kern" on;
                            color: #3D3D3D;
                        }

                        .delete_data {
                            margin-top: 10px;
                            height: 17px;
                            font-family: Source Han Sans;
                            font-size: 12px;
                            font-weight: normal;
                            line-height: normal;
                            letter-spacing: 0em;
                            font-variation-settings: "opsz" auto;
                            font-feature-settings: "kern" on;
                            color: #909AAA;
                        }
                    }
                }
            }
            .lists {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 58vh;

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
}
</style>