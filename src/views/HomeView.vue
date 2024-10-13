<script lang="ts">

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
                <div class="select_div">
                    <div></div>
                    <p>设置</p>
                    <div class="background">
                        <div class="setting">
                            <div class="setting-left">
                                <div>设置</div>
                                <div class="select_div">&nbsp;个人资料</div>
                                <div>&nbsp;修改密码</div>
                            </div>
                            <div class="setting-right">
                                <div>个人资料</div>
                                <div>
                                    <p>昵称</p>
                                    <div>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
    </div>
</template>

<style lang="scss" scoped>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;

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
            }

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
                        flex: 1;

                        >div:nth-child(1) {
                            width: 56px;
                            height: 20px;
                            opacity: 1;
                            margin-left: 16px;
                            margin-top: 12px;
                            font-family: Source Han Serif CN;
                            font-size: 14px;
                            font-weight: normal;
                            line-height: normal;
                            letter-spacing: 0em;

                            font-variation-settings: "opsz" auto;
                            font-feature-settings: "kern" on;
                            color: #3D3D3D;
                        }

                        >div:nth-child(2) {
                            display: flex;
                            align-items: center;
                            width: 239px;
                            height: 32px;
                            opacity: 1;
                            margin-top: 45px;
                            margin-left: 32px;

                            >div {
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
                            }
                        }
                    }
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
                background: rgba(89, 149, 253, 0.051);
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