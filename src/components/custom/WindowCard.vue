<template>
    <div @click="executeFun">
        <Card :style="{backgroundColor: backgroundColor}" class="window-card">
            <div class="window-card-content">
                <p v-if="text">{{text}}</p>
                <img v-if="image && !text" style="height: 100%" :src="image">
            </div>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "WindowCard",
        props: {
            text: {
                type: String,
                default: ''
            },
            image: {
                type: String,
                default: ''
            },
            backgroundColor: {
                type: String,
                default: ''
            },
            to: {
                type: String,
                default: ''
            },
            clickMethod: {
                type: Function,
                default: function () {
                   return {}
                }
            }
        },
        methods: {
            executeFun() {
                if (!!this.to) {
                    this.$router.push({path: this.to})
                } else {
                    this.clickMethod();
                }
            }
        }
    }
</script>

<style scoped>
    .window-card {
        width: 100%;
        cursor: pointer;
    }
    >>> .window-card .ivu-card-body{
        height: 60px;
    }
    .window-card:hover {
        margin: 0 -2%;
        width: 104%;
    }
    .window-card-content {
        text-align: center;
        height: 100%;
    }
    .window-card-content p {
        font-weight: bold;
        font-size: 18px;
    }
</style>