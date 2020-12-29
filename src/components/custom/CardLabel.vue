<template>
    <div class="card-label-div" @mouseenter="hoverStatus=true" @mouseleave="hoverStatus=false">
        <div v-if="title || $slots.title" class="card-label-title">
            <div>
                <slot name="title">{{ title }}：</slot>
            </div>
        </div>
        <div v-if="title || $slots.title" class="card-label-content">
            <div style="width: 90%">

                <slot v-if="!modifyStatus" name="content">{{ handleContent() }}</slot>

                <Input v-if="modifyStatus&&modifyType==='input'" v-model="contentValue" size="small"></Input>

                <RadioGroup v-if="modifyStatus&&modifyType==='radio'" v-model="contentValue" type="button" size="small">
                    <Radio v-for="dict in dictData" :label="dict.value">{{dict.name}}</Radio>
                </RadioGroup>

                <DatePicker v-if="modifyStatus&&modifyType==='date'" v-model="contentValue" type="date" size="small"></DatePicker>

            </div>
        </div>
        <div v-if="modifyType" class="card-label-update">
            <Icon v-if="!modifyStatus&&hoverStatus" type="md-create" @click="modifyStatus = true" />
            <Icon v-if="modifyStatus" type="md-checkmark" v-on:click="executeFun(method)" />
        </div>
    </div>

</template>
<script>

    export default {
        name: 'CardLabel',
        props: {
            modifyType: {
                type: String,
                default: ''
            },
            method: {
                type: Function,
                default: function () {
                    console.log('未指定函数');
                }
            },
            dictData: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            prop: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            content: {
                type: [String, Number, Boolean, Date],
                default: ''
            },
        },
        data(){
            return{
                modifyStatus: false,
                contentValue: undefined,
                hoverStatus: false,
            }
        },
        methods: {
            executeFun(method) {
                if (this.contentValue === undefined || this.contentValue === null){
                    this.modifyStatus = false;
                    return;
                }
                if ('string' === typeof this.contentValue && this.contentValue.length === 0) {
                    this.modifyStatus = false;
                    return;
                }
                method(this.prop, this.contentValue);
                this.modifyStatus = false;
            },
            handleContent(){
                this.contentValue = this.content;
                if (this.contentValue === undefined || this.contentValue === null) {
                    return '--';
                }
                if ('string' === typeof this.contentValue && this.contentValue.length === 0) {
                    return '--';
                }
                if (!!this.dictData && this.dictData.length > 0){
                    for (let i = 0; i < this.dictData.length; i++) {
                        if (this.dictData[i].value === this.contentValue) {
                            return this.dictData[i].name;
                        }
                    }
                    return '--';
                }
                return this.contentValue;
            },
            resetField(){
                this.modifyStatus = false;
                this.contentValue = undefined;
            },
        },
    };
</script>
<style>
    .card-label-div {
        position: relative;
        z-index: 999;
    }
    .card-label-title {
        width: 70px;
        text-align: right;
        float: left;
    }
    .card-label-content {
        margin-left: 70px;
        max-width: 300px;
    }
    .card-label-update {
        position: absolute;
        right: 2px;
        top: 0;
        cursor: pointer;
    }
</style>
