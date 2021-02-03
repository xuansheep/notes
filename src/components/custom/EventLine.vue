<template>
    <div class="background-div">
        <div v-for="(item, index) in listData">
            <div class="left-div">
                <div style="height: 20px"></div>
                <div>
                    <Icon type="md-git-branch" size="16" />
                    <span> {{item.version}}</span>
                </div>
                <div class="left-div-flag">
                    <Icon type="md-paw" size="1" />
                </div>
            </div>
            <div class="right-div" @mouseenter="enterRight(item, index)" @mouseleave="leaveRight(item, index)">
                <div>
                    <p style="font-size: 22px">{{item.name}}</p>
                </div>
                <div class="event-line-time">
                    <span>
                        {{item.publisher}} 发布于 <Time :time="item.publishTime"></Time>
                    </span>
                </div>
                <div class="event-line-html-content">
                    <mavon-editor style="box-shadow: rgb(0 0 0) 0 0 0 0;" v-html="item.htmlContent"></mavon-editor>
                </div>
                <Collapse v-if="item.participant.length > 0">
                    <Panel>
                        参与人员
                        <div slot="content">
                            <p v-for="par in item.participant">
                                {{par.key}}：<span>{{par.value}}</span>
                            </p>
                        </div>
                    </Panel>
                </Collapse>

                <div class="right-div-update" v-if="item.hoverStatus" @click="updateItem(item)">
                    <Icon custom="iconfont icon-bianji" />
                </div>
            </div>
        </div>
        <div v-if="!listData || listData.length===0" style="text-align: center; height: 100px; line-height: 100px">
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
                default: function () {
                    return [];
                }
            }
        },
        data() {
            return {
                listData: [],
            }
        },
        created() {
            this.listData = this.data;
        },
        watch: {
            data(val) {
                this.listData = val;
            }
        },
        methods: {
            enterRight(item, index) {
                item.hoverStatus = true;
                this.$set(this.listData, index, item);
            },
            leaveRight(item, index) {
                item.hoverStatus = false;
                this.$set(this.listData, index, item);
            },
            updateItem(item) {
                this.$emit('onUpdate', item)
            }
        }
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
        padding: 24px 16px;
        background-color: #ffffff;
        position: relative;
    }
    .left-div-flag {
        position: absolute;
        right: -7px;
        top: 45px;
        color: #f8895c;
        background-color: #ffffff;
        z-index: 999;
    }
    .right-div {
        margin-left: 30%;
        width: 70%;
        height: 100%;
        text-align: left;
        padding: 24px 16px;
        border-left: rgb(225, 228, 232) solid 1px;
        background-color: #ffffff;
        position: relative;
    }
    .right-div-update {
        position: absolute;
        right: 16px;
        top: 24px;
        cursor: pointer;
        color: #c5cfe2;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .right-div-update:hover {
        color: #000000;
    }
    .event-line-html-content {
        margin: 20px 0 30px 0;
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