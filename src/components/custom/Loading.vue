<template>
    <div class="scroll-loading ivu-spin"
         :class="{scrollLoading: bottomHeight > 0, scrollLoadingOver: bottomHeight === 0}"
         :style="{paddingBottom: bottomHeight + 'px'}">
        <Spin v-if="loading">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>{{text}}</div>
        </Spin>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props: {
            bottomHeight: {
                type: Number,
                default: 0
            },
            loading: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: '拼命加载中...'
            }

        }
    }
</script>

<style scoped>
    .scrollLoading {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background-image: linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.4), rgba(255,255,255,0.9));
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }

    .scrollLoadingOver {
        position: absolute;
        width: 100%;
        left: 0;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }

    .scroll-loading .ivu-spin {
        color: #f1795c;
        vertical-align: middle;
        text-align: center;
        margin-top: 10%;
    }

    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>