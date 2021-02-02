<template>
    <div class="background-div">
        <div v-for="item in listData">
            <Input>{{item.key}}</Input>
            <Input>{{item.value}}</Input>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArrayForm",
        props: {
            data: {
                type: Array,
                default: [
                    {key: '', value: ''}
                ]
            },
        },
        data() {
            return {
                listData: [],
            }
        },
        created() {
            this.listData = this.data;
        }
    }
</script>

<style scoped>
    .background-div {

    }
</style>