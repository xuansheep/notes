<template>
    <div class="background-div">
        <div class="left-div">
            <div>
                <Icon type="md-paw" />
                <span>1.0.0</span>
            </div>
        </div>
        <div class="right-div">
            <div>版本说明</div>
            <div>xuansheep released this 7 days ago</div>
            <div style="height: 300px; margin: 10px 0 10px 0">
                功能
                笔记
                书签
                Nga
                人物
                日历
                多星2D模型
            </div>
            <Collapse v-model="value1">
                <Panel>
                    人员
                    <div slot="content">
                        <p>开发：<span>张三、李四</span></p>
                        <p>设计：<span>张三、李四</span></p>
                        <p>产品：<span>张三、李四</span></p>
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
            active: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                defaultList: [
                    {name: 'nga', title: 'NGA', link: '/nga', mobileLink: '/mobile/nga'},
                    {name: 'person', title: '人物', link: '/person'},
                    {name: 'calendar', title: '日历', link: '/calendar'},
                    {name: 'threeBody', title: '多星2D模型', link: '/threeBody'},
                ],
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
    }
    .left-div {
        width: 30%;
        height: 100%;
        float: left;
        text-align: right;
        padding: 16px;
        border-right: rgb(225, 228, 232) solid 1px;
        background-color: #ffffff;
    }
    .right-div {
        width: 70%;
        height: 100%;
        float: left;
        text-align: left;
        padding: 16px;
        border-left: rgb(225, 228, 232) solid 1px;
        background-color: #ffffff;
    }
</style>