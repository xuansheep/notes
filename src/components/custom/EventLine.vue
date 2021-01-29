<template>
    <div class="background-div">
        <div class="left-div">
            <div style="height: 20px"></div>
            <div>
                <Icon type="md-paw" />
                <span>{{version}}</span>
            </div>
        </div>
        <div class="right-div">
            <div>
                <h2>{{name}}</h2>
            </div>
            <div>
                <span>xuansheep released this 7 days ago</span>
            </div>
            <div style="margin: 10px 0 10px 0">
                <div v-html="content"></div>
            </div>
            <Collapse>
                <Panel>
                    参与人员
                    <div slot="content">
                        <p>开发：<span>张三、李四</span></p>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventLine",
        props: {
            name: {
                type: String,
                request: true,
                default: ''
            },
            version: {
                type: String,
                request: true,
                default: ''
            },
            content: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    .background-div {
        background-color: #ffffff;
        height: 100%;
        width: 1024px;
        margin: auto;
        border-top: rgb(225, 228, 232) solid 1px;
    }
    .left-div {
        width: 30%;
        height: 100%;
        float: left;
        text-align: right;
        padding: 16px;
        background-color: #ffffff;
    }
    .right-div {
        margin-left: 30%;
        width: 70%;
        height: 100%;
        text-align: left;
        padding: 16px;
        border-left: rgb(225, 228, 232) solid 1px;
        background-color: #ffffff;
    }

    .ivu-collapse {
         background-color: #ffffff;
         border-radius: 0;
         border: 0 solid #dcdee2;
    }
    >>> .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i {
        transition: transform .2s ease-in-out;
        margin-right: 0;
    }
    >>> .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
        height: 38px;
        line-height: 38px;
         padding-left: 0;
        color: #666;
        cursor: pointer;
        position: relative;
        border-bottom: 1px solid transparent;
        transition: all .2s ease-in-out;
    }
</style>