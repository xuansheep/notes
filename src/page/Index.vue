<template>
    <div class="background">
        <div class="header">
            <div class="header-carousel">

            </div>
            <div class="header-bottom-add-icon">
                <Poptip placement="left-start" :width="300" v-model="visible">
                    <Icon class="add-icon" v-bind:class={add:visible} custom="iconfont icon-xinzeng" size="20"/>
                    <div slot="title">
                        添加书签
                    </div>
                    <div slot="content" style="line-height: 35px">
                        <div style="width: 215px">
                            名称：<Input v-model="markForm.name"></Input>
                        </div>
                        <div style="width: 215px">
                            链接：<Input v-model="markForm.link"></Input>
                        </div>
                        <div style="width: 215px">
                            分类：<Select v-model="markForm.categoryId">
                            <Option v-for="category in categoryList" :value="category.id" :key="category.id">
                                {{category.name}}
                            </Option>
                        </Select>
                        </div>
                        <div style="text-align: right">
                            <Button type="primary" size="small" @click="saveMark">确定</Button>
                        </div>
                    </div>
                </Poptip>
            </div>
            <div class="header-bottom-del-icon">
                <Dropdown placement="bottom-end" trigger="custom" :visible="modifyStatus">
                    <Icon class="del-icon" v-bind:class={del:modifyStatus} custom="iconfont icon-remove-1-copy"
                          size="20" @click="modify"/>
                    <DropdownMenu slot="list" style="width: 150px">
                        <div class="del-dropdownMenu-div">
                            <p>删除书签</p>
                        </div>
                        <Divider id="del-divider"/>
                        <div class="del-dropdownMenu-div">
                            <Button type="default" size="small" @click="modify">取消</Button>
                            <span style="display:inline-block; width:30px"></span>
                            <Button type="primary" size="small" @click="deleteMark">确定</Button>
                        </div>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="header-bottom-import-icon">
                <Poptip placement="left-start" :width="300" v-model="importVisible">
                    <Icon class="import-icon" v-bind:class={import:importVisible} custom="iconfont icon-daoru"
                          size="20"/>
                    <div slot="title">
                        导入Chrome离线书签
                    </div>
                    <div slot="content" style="line-height: 35px">
                        <div>
                            <Upload :before-upload="handleUpload"
                                    action="">
                                <Button icon="ios-cloud-upload-outline">选择文件</Button>
                            </Upload>
                            <div v-if="file !== null">
                                文件名：{{file.name}}<br/>
                                <Button type="default" size="small" @click="upload" :loading="loadingStatus">{{
                                    loadingStatus ? '导入中' : '开始导入' }}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Poptip>
            </div>

        </div>
        <div class="content">
            <Card class="card">
                <div class="category-list">
                    <Tag v-for="category in categoryList" :closable="modifyStatus" @on-close="deleteCategory(category.id)">
                        {{category.name}}
                    </Tag>
                    <Button icon="ios-add" type="dashed" size="small" @click="saveCategory">
                        <Input v-if="inputStatus" size="small" style="width: 50px"></Input>
                        添加分类
                    </Button>
                </div>
            </Card>
            <Card class="card" :bordered="true" v-for="card in cardList">
                <div class="card-title" slot="title">
                    <Checkbox class="card-title-checkBox" v-if="modifyStatus" v-model="card.checkAll"
                              @on-change="onCheckAll(card)"></Checkbox>
                    <p id="card-title-text">{{card.categoryName}}</p>
                    <Icon class="card-title-icon1" custom="iconfont icon-liebiao" size="15" @click="listMark(card,24)"/>
                    <Icon class="card-title-icon2" custom="iconfont icon-liebiao1" size="15" @click="listMark(card,8)"/>
                    <Icon class="card-title-icon3" custom="iconfont icon-iconfontzhizuobiaozhun0247" size="15"
                          @click="listMark(card,4)"/>
                </div>
                <div>
                    <Row style="margin-left: 1%" :gutter="10">
                        <Col class="card-col" :span="card.colSpan" v-for="mark in card.markList">
                            <Tooltip :content="mark.name" placement="top-start" :delay="500" :max-width="500">
                                <Checkbox class="card-mark-checkBox" v-if="modifyStatus" v-model="mark.isSelect"
                                          @on-change="onCheck(mark,card)"/>
                                <a class="card-mark-text" :href="mark.link">
                                    <img class="card-icon" :src="mark.icon">
                                    <span v-if="card.colSpan===4">{{mark.name|omitText4}}</span>
                                    <span v-if="card.colSpan===8">{{mark.name|omitText8}}</span>
                                    <span v-if="card.colSpan===24">{{mark.name|omitText24}}</span>
                                </a>
                            </Tooltip>
                        </Col>
                    </Row>
                    <div v-if="card.markList.length === 0">
                        <p>暂无内容</p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import '../assets/css/index.css'
    import {Col} from 'iview';

    export default {
        name: "Index",
        components: {Col},
        data() {
            return {
                listParams: {
                    page: 1,
                    size: 10,
                },
                deleteParams: {
                    ids: '',
                },
                categoryParams: {
                    page: 1,
                    size: 999,
                },
                cardList: [],
                categoryList: [],
                markForm: {
                    name: '',
                    link: '',
                    categoryId: '',
                },
                ids: [],
                file: null,

                visible: false,
                importVisible: false,
                modifyStatus: false,
                loadingStatus: false,
                checkAll: false,
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.http.post(this.ports.mark.listIndex, this.listParams, res => {
                    this.cardList = res;
                    for (let c of this.cardList) {
                        c.colSpan = 4;
                    }
                });
                this.http.post(this.ports.category.list, this.categoryParams, res => {
                    this.categoryList = res.records;
                })
            },
            saveMark() {
                this.http.post(this.ports.mark.save, this.markForm, res => {
                    this.visible = false;
                    this.markForm = {};
                    this.pageLoad();
                    this.$Message.success('添加成功');
                })
            },
            listMark(card, span) {
                if (card.colSpan === span) {
                    return;
                } else {
                    card.colSpan = span;
                }
                let indexOf = this.cardList.indexOf(card);
                if (indexOf > -1) {
                    this.$set(this.cardList, indexOf, card)
                }
            },
            handleUpload(file) {
                this.file = file;
                return false;
            },
            upload() {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.http.uploadFileFormData(this.ports.file.import, this.file, res => {
                        this.importVisible = false;
                        this.file = null;
                        this.pageLoad();
                        this.$Message.success('导入成功')
                    }, this.loadingStatus = false);
                }, 1500);
            },
            modify() {
                this.modifyStatus = !this.modifyStatus;
            },
            deleteMark() {
                if (this.ids.length === 0) {
                    this.$Message.warning('请选择书签');
                    return;
                }
                this.deleteParams.ids = this.ids.join(',');
                this.http.post(this.ports.mark.delete, this.deleteParams, res => {
                    this.modifyStatus = false;
                    this.ids = [];
                    this.pageLoad();
                    this.$Message.success('删除成功');
                })
            },
            saveCategory(){

            },
            deleteCategory(id) {
                let params = {
                    ids: id,
                };
                this.http.post(this.ports.category.delete, params, res => {
                    this.pageLoad();
                    this.$Message.success('删除成功');
                })
            },

            /***多选框***/
            onCheck(mark, card) {
                if (mark.isSelect) {
                    this.ids.push(mark.id);
                    for (let m of card.markList) {
                        if (!m.isSelect) {
                            return;
                        }
                    }
                    card.checkAll = true;
                    let indexOf = this.cardList.indexOf(card);
                    if (indexOf > -1) {
                        this.$set(this.cardList, indexOf, card)
                    }
                } else {
                    if (!!this.ids) {
                        let index = this.ids.indexOf(mark.id);
                        if (index > -1) {
                            this.ids.splice(index, 1);
                        }
                        card.checkAll = false;
                        let indexOf = this.cardList.indexOf(card);
                        if (indexOf > -1) {
                            this.$set(this.cardList, indexOf, card)
                        }
                    }
                }
            },
            onCheckAll(card) {
                if (card.checkAll) {
                    for (let m of card.markList) {
                        if (!m.isSelect) {
                            m.isSelect = card.checkAll;
                            this.ids.push(m.id);
                        }
                    }
                } else {
                    for (let m of card.markList) {
                        m.isSelect = card.checkAll;
                        let index = this.ids.indexOf(m.id);
                        if (index > -1) {
                            this.ids.splice(index, 1);
                        }
                    }
                }
                let indexOf = this.cardList.indexOf(card);
                if (indexOf > -1) {
                    this.$set(this.cardList, indexOf, card)
                }
            },
            /***多选框***/
        },
        filters: {
            omitText4: function (value) {
                if (value.length <= 8) {
                    return value;
                }
                return value.replace(value.substring(8, value.length), "...");
            },
            omitText8: function (value) {
                if (value.length <= 27) {
                    return value;
                }
                return value.replace(value.substring(27, value.length), "...");
            },
            omitText24: function (value) {
                if (value.length <= 50) {
                    return value;
                }
                return value.replace(value.substring(50, value.length), "...");
            }
        }
    }
</script>

<style scoped>
    /**/


</style>