<template>
    <div class="card-label-div" @mouseenter="hoverStatus=true" @mouseleave="hoverStatus=false">
        <div v-if="title || $slots.title" class="card-label-title">
            <div>
                <slot name="title">{{ title }}：</slot>
            </div>
        </div>
        <div v-if="title || $slots.title" class="card-label-content">
            <Tooltip style="width: 260px" placement="top-start" transfer :delay="!!descriptionValue ? 300 : 10000000">
                <div slot="content">
                    <slot name="description">{{ descriptionValue }}</slot>
                    <div style="text-align: right">
                        <Icon class="card-description-update" custom="iconfont icon-bianji" @click="descriptionModifyStatus=true" />
                    </div>
                </div>

                <div>
                    <slot v-if="!modifyStatus" name="content">{{ handleContent() }}</slot>

                    <Input v-if="modifyStatus&&modifyType==='input'" v-model="contentValue" size="small"></Input>

                    <RadioGroup v-if="modifyStatus&&modifyType==='radio'&&dictData.length<=3" v-model="contentValue" type="button" size="small">
                        <Radio v-for="dict in dictData" :label="dict.value">{{dict.name}}</Radio>
                    </RadioGroup>

                    <Select v-if="modifyStatus&&modifyType==='radio'&&dictData.length>3" v-model="contentValue" transfer clearable filterable size="small">
                        <Option v-for="dict in dictData" :value="dict.value" :key="dict.value">{{dict.name}}</Option>
                    </Select>

                    <DatePicker v-if="modifyStatus&&modifyType==='date'" v-model="contentValue" @on-change="getDate" transfer type="date" size="small"></DatePicker>

                    <CheckboxGroup v-if="modifyStatus&&modifyType==='checkBox'&&dictData.length<=3" v-model="contentValue" size="small">
                        <Checkbox v-for="dict in dictData" :label="dict.value" border>{{dict.name}}</Checkbox>
                    </CheckboxGroup>

                </div>
            </Tooltip>
        </div>

        <div v-if="modifyType" class="card-label-update">
            <Icon v-if="!modifyStatus&&hoverStatus" custom="iconfont icon-bianji" @click="modifyStatus = true" />
            <Icon v-if="modifyStatus" type="md-checkmark" v-on:click="executeFun(method)" />
        </div>

        <!--多选框，选项大于3时展示-->
        <Modal v-model="!!modifyType&&modifyStatus&&modifyType==='checkBox'&&dictData.length>3"
               title="选择" :closable="false" :mask-closable="false" >
            <CheckboxGroup v-if="modifyStatus&&modifyType==='checkBox'" v-model="contentValue" size="small">
                <Checkbox v-for="dict in dictData" :label="dict.value" border>{{dict.name}}</Checkbox>
            </CheckboxGroup>
            <div slot="footer">
                <Button icon="md-checkmark" @click="executeFun(method)">确定</Button>
            </div>
        </Modal>

        <!--说明文字修改-->
        <Modal v-model="descriptionModifyStatus" title="说明" :closable="false" :mask-closable="false" >
            <Input v-model="descriptionValue" type="textarea" :rows="6"></Input>
            <div slot="footer">
                <Button icon="md-checkmark" @click="executeDescriptionFun(method)">确定</Button>
            </div>
        </Modal>

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
                type: [String, Number, Boolean, Date, Array],
                default: ''
            },
            description: {
                type: String,
                default: ''
            }
        },
        data(){
            return{
                modifyStatus: false,
                contentValue: '',
                hoverStatus: false,
                descriptionModifyStatus: false,
                descriptionValue: '',
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
            executeDescriptionFun(method) {
                if (!this.descriptionValue || this.descriptionValue.length === 0){
                    this.descriptionModifyStatus = false;
                    return;
                }
                method(this.prop+'Description', this.descriptionValue);
                this.descriptionModifyStatus = false;
            },
            handleContent(){
                this.contentValue = this.content;
                if (this.contentValue === undefined || this.contentValue === null) {
                    return '--';
                }
                if ('string' === typeof this.contentValue && this.contentValue.length === 0) {
                    return '--';
                }
                let isArray = this.contentValue instanceof Array;
                if (isArray && this.contentValue.length === 0) {
                    return '--'
                }
                if (!!this.dictData && this.dictData.length > 0) {
                    let dictData = [];
                    for (let i = 0; i < this.dictData.length; i++) {
                        if (isArray) {
                            for (let j = 0; j < this.contentValue.length; j++) {
                                if (this.contentValue[j] === this.dictData[i].value) {
                                    dictData.push(this.dictData[i].name);
                                }
                            }
                        }else {
                            if (this.contentValue === this.dictData[i].value) {
                                return this.dictData[i].name;
                            }
                        }
                    }
                    if (dictData.length === 0){
                        return '--';
                    }
                    return dictData.join("、")
                }
                return this.contentValue;
            },
            getDate(date){
                this.contentValue = date;
            },
            resetField(){
                this.modifyStatus = false;
                this.contentValue = undefined;
            },
        },
        watch: {
            description(val) {
                this.descriptionValue = val;
            }
        }
    };
</script>
<style>
    .card-label-div {
        position: relative;
    }
    .card-label-title {
        width: 70px;
        text-align: right;
        float: left;
    }
    .card-label-content {
        margin-left: 70px;
        max-width: 260px;
    }
    .card-label-update {
        position: absolute;
        right: 2px;
        top: 0;
        cursor: pointer;
        color: #c5cfe2;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .card-label-update:hover {
        color: #000000;
    }
    .card-description-update {
        cursor: pointer;
        color: #c5cfe2;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .card-description-update:hover {
        color: #ffffff;
    }
    .ivu-tooltip-inner {
        width: 260px;
    }
</style>
