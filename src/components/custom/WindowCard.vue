<template>
    <div @click="executeFun">
        <Card :style="{backgroundImage: 'url('+image+')'}" class="window-card">
            <div class="window-card-content">
                <p v-if="text">{{text}}</p>
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
        background-size: cover;
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