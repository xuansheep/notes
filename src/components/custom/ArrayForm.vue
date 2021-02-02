<template>
    <div class="background-div">
        <div v-for="(item, index) in listData">
            <Input class="input-key" v-model="item.key" :placeholder="keyPlaceHolder" />
            <Input class="input-value" v-model="item.value" :placeholder="valuePlaceHolder" />
            <Icon class="icon-add" type="md-add" size="20" @click="itemAdd(index)" />
            <Icon class="icon-remove" v-if="index !== 0" type="md-close" size="20" @click="itemRemove(index)" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArrayForm",
        props: {
            data: {
                type: Array,
                default: function () {
                    return []
                }
            },
            keyPlaceHolder: {
                type: String,
                default: ''
            },
            valuePlaceHolder: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                listData: [],
            }
        },
        created() {
            this.listData = this.data;
            if (this.listData.length === 0) {
                this.listData.push({key: '', value: ''});
            }
        },
        methods: {
            itemAdd(index) {
                this.listData.splice(index + 1, 0, {key: '', value: ''})
                console.log(this.listData)
            },
            itemRemove(index) {
                this.listData.splice(index, 1);
                console.log(this.listData)
            },
            resetField() {
                this.listData = [{key: '', value: ''}];
            }
        }
    }
</script>

<style scoped>
    .background-div {

    }
    .input-key {
        width: 100px;
    }
    .input-value {
        width: 200px;
        margin-left: 10px;
    }
    .icon-add {
        margin-left: 10px;
        cursor: pointer;
        color: #25bc25;
    }
    .icon-remove {
        margin-left: 10px;
        cursor: pointer;
        color: #dc4644;
    }
</style>