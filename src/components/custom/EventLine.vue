<template>
    <div class="background-div">
        <div v-for="(item, index) in data">
            <div class="left-div">
                <div style="height: 20px"></div>
                <div>
                    <Icon type="md-paw" />
                    <span>{{item.version}}</span>
                </div>
            </div>
            <div class="right-div">
                <div>
                    <h2>{{item.name}}</h2>
                </div>
                <div class="event-line-time">
                    <span>
                        {{item.publisher}} 发布于 <Time :time="item.publishTime"></Time>
                    </span>
                </div>
                <div class="event-line-html-content">
                    <mavon-editor style="box-shadow: rgb(0 0 0) 0 0 0 0;" v-html="item.htmlContent"></mavon-editor>
                </div>
                <Collapse>
                    <Panel>
                        参与人员
                        <div slot="content">
                            <p>开发：<span>张三、李四</span></p>
                            <p>开发：<span>张三、李四</span></p>
                        </div>
                    </Panel>
                </Collapse>
            </div>
        </div>
        <div v-if="!data || data.length===0" style="text-align: center; height: 100px; line-height: 100px">
            <span>暂无内容</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EventLine",
        props: {
            data: {
                type: Array,
                request: true,
                default: []
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
    .event-line-html-content {
        margin: 10px 0 30px 0;
    }
    .event-line-time {
        font-size: 12px;
        color: #999999;
        margin-top: 5px;
    }

    .event-line-html-content .markdown-body {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 1.5;
        /* color: #24292e; */
        /* font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"; */
        font-size: 14px;
        word-wrap: break-word;
    }
    .event-line-html-content .v-note-wrapper {
        position: relative;
        min-width: 0;
        min-height: 0;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        background-color: #fff;
        z-index: 0;
        text-align: left;
        border: 0 solid #f2f6fc;
        border-radius: 4px;
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
    >>> .ivu-collapse-content>.ivu-collapse-content-box {
        padding-top: 0;
        padding-bottom: 0;
        font-size: 13px;
    }
</style>