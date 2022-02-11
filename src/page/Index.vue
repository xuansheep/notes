<template>
    <div class="background">
        <Affix>
            <div class="header" v-bind:class={headerOpen:headerOpenStatus,headerHover:headerHoverStatus}>
                <div class="header-carousel">
                    <!--nga按钮-->
                    <!--<div class="header-bottom-nga-div">
                        <img class="header-bottom-nga-icon" src="../assets/image/dex-fish-nga-1.jpg" @click="goNga" />
                    </div>-->

                    <!--书签功能按钮-->
                    <div v-if="!headerOpenStatus">
                        <!--logo-->
                        <div class="header-bottom-logo-div">
                            <img style="height: 30px" src="../assets/image/logo2.png">
                        </div>
                        <!--导入书签按钮-->
                        <div class="header-bottom-import-icon" @mouseover="showTip('导入书签')" @mouseout="closeTip">
                            <Poptip placement="bottom-end" :width="200" v-model="importVisible" transfer>
                                <Icon class="import-icon" v-bind:class={import:importVisible} custom="iconfont icon-daoru" size="20"/>
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
                                            <Button type="default" size="small" @click="upload" :loading="importLoading">
                                                {{importLoading ? '导入中' : '开始导入' }}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Poptip>
                        </div>
                        <!--添加书签按钮-->
                        <div class="header-bottom-add-icon" @mouseover="showTip('创建书签')" @mouseout="closeTip">
                            <Poptip placement="bottom-end" :width="300" v-model="visible" transfer>
                                <Icon class="add-icon" v-bind:class={add:visible} custom="iconfont icon-xinzeng" size="20"/>
                                <div slot="title">
                                    创建书签
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
                                        <Option v-for="category in markCategoryList" :value="category.id" :key="category.id">
                                            {{category.name}}
                                        </Option>
                                    </Select>
                                    </div>
                                    <div style="text-align: right">
                                        <Button :loading="saveMarkLoading" type="primary" size="small" @click="saveMark">确定</Button>
                                    </div>
                                </div>
                            </Poptip>
                        </div>
                        <!--删除书签按钮-->
                        <div class="header-bottom-del-icon" @mouseover="showTip('删除书签')" @mouseout="closeTip">
                            <Dropdown placement="bottom-end" trigger="custom" :visible="modifyStatus" transfer>
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
                        <!--退出按钮-->
                        <div class="header-bottom-logout-icon" @mouseover="showTip('退出')" @mouseout="closeTip">
                            <Icon class="logout-icon" custom="iconfont icon-dengchu" size="27" @click="signOut"/>
                        </div>
                    </div>

                    <!--笔记功能按钮-->
                    <div v-if="headerOpenStatus">
                        <!--logo-->
                        <div class="header-bottom-logo-div">
                            <img style="height: 30px" src="../assets/image/logo2.png">
                        </div>
                        <!--新增按钮-->
                        <div class="header-bottom-add-icon" @mouseover="showTip('创建笔记')" @mouseout="closeTip">
                            <Icon class="add-icon" v-bind:class={add:visible} custom="iconfont icon-xinzeng" size="20" @click="getNoteDetail"/>
                            <!--详情抽屉-->
                            <Drawer
                                    :title=noteWindowTitle
                                    v-model=noteWindowStatus
                                    width="40"
                                    :mask-closable="false"
                                    :draggable="true"
                                    @on-close="drawerClose(noteForm.id)"
                            >
                                <Form :model="noteForm">
                                    <FormItem label="标题">
                                        <Input v-model="noteForm.title" placeholder="please enter the title"></Input>
                                    </FormItem>
                                    <FormItem label="内容" label-position="top">
                                        <Wangeditor
                                                v-model="noteForm.content"
                                                :upload-img-server="this.http.serverUrl + this.ports.file.upload + '?token=' + this.getToken()"
                                        ></Wangeditor>
                                        <!--<Input type="textarea" v-model="noteForm.content" :rows="28" placeholder="please enter the content" />-->
                                    </FormItem>
                                    <FormItem label="分类">
                                        <Select v-model="noteForm.categoryId">
                                            <Option v-for="category in noteCategoryList" :value="category.id" :key="category.id">
                                                {{category.name}}
                                            </Option>
                                        </Select>
                                    </FormItem>
                                </Form>
                                <div class="demo-drawer-footer">
                                    <Button style="margin-right: 8px" @click="drawerClose(noteForm.id)">{{noteForm.id>0 ? '关闭' : '取消'}}</Button>
                                    <Button type="primary" @click="saveNote">保存</Button>
                                    <Button v-if="noteForm.id>0" style="position: absolute; right: 15px;" type="error" @click="deleteNote">删除</Button>
                                </div>
                            </Drawer>
                        </div>
                        <!--删除-->
                        <div class="header-bottom-del-icon" @mouseover="showTip('删除笔记')" @mouseout="closeTip">
                            <Icon class="del-icon" v-bind:class={del:modifyStatus} custom="iconfont icon-remove-1-copy" size="20" @click="modify"/>
                        </div>
                        <!--退出按钮-->
                        <div class="header-bottom-logout-icon" @mouseover="showTip('退出')" @mouseout="closeTip">
                            <Icon class="logout-icon" custom="iconfont icon-dengchu" size="27" @click="signOut"/>
                        </div>
                    </div>
                </div>



                <!--笔记分类-->
                <div v-if="headerOpenStatus" class="note-category-list">

                    <Input class="note-search" search placeholder="搜索笔记..." />

                    <Tag class="note-category-tag" v-for="category in noteCategoryList" :closable="modifyStatus" @on-close="deleteCategory(category.id)">
                        <span class="category-tag-span"
                              @dragover.prevent="handleDragOver($event, category)"
                              @dragenter="handleDragEnter($event, category)">
                            {{category.name}}
                        </span>
                    </Tag>
                    <Button icon="ios-add" type="dashed" size="small" @click="inputCategory">
                        <Input ref="c_input" v-if="inputStatus" v-model="categoryForm.name" size="small" style="width: 70px" @on-blur="saveCategory(1)"></Input>
                        <span v-if="!inputStatus">添加分类</span>
                    </Button>
                </div>

                <!--顶部栏-打开笔记内容-->
                <div class="header-bottom-openMore-icon" @mouseover="headerHoverStatus=true" @mouseout="headerHoverStatus=false">
                    <div v-if="!tipText || tipText.length === 0">
                        <Icon class="openMore-icon" type="ios-arrow-down" size="22" @click="openMore" v-if="!headerOpenStatus" />
                        <Icon class="openMore-icon" type="ios-arrow-up" size="22" @click="headerOpenStatus=false" v-if="headerOpenStatus" />
                    </div>
                </div>

                <!--顶部栏-提示内容-->
                <div class="header-tip">
                    <span>{{tipText}}</span>
                </div>

                <!--笔记列表-->
                <div v-if="headerOpenStatus" class="header-open">
                    <Collapse simple class="collapse" v-model="panelName">
                        <Panel :name="index+''" v-for="(card,index) in noteCardList">
                            <span class="card-note-title">{{card.categoryName}}</span>
                            <div slot="content">
                                <a class="card-note-text" v-for="note in card.noteList" @click="getNoteDetail(note.id)">{{note.title}}</a>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </div>
        </Affix>

        <!--快捷入口-->
        <div class="window">
            <Row :gutter="12">
                <Col span="4" v-for="item in windowCardData">
                    <WindowCard :text="item.text" :image="item.image" :background-color="item.backgroundColor"
                                :to="item.path" :click-method="item.clickMethod"></WindowCard>
                </Col>
            </Row>
        </div>

        <!--书签内容-->
        <div class="content">
            <Affix :offsetTop="35">
            <!--书签分类-->
            <div v-if="!headerOpenStatus">
                <Card class="category-card">
                    <div class="category-list">
                        <Tag :style="{borderLeft: !!dragging && category.sort === dragging.sort ? 'black solid 2px' : ''}" class="category-tag"
                             v-for="(category, index) in markCategoryList" :closable="modifyStatus" @on-close="deleteCategory(category.id)">
                            <span class="category-tag-span" v-if="!category.inputStatus" @click="updateCategory(category, index)"
                                  @dragover.prevent="handleDragOver($event, category)" @dragenter="handleDragEnter($event, category)"
                                  draggable="true" @dragstart="handleCategoryDragStart($event, category)" @dragend="handleCategoryDragEnd($event)">
                                {{category.name}}
                            </span>
                            <Input :id="'c_'+index" v-if="category.inputStatus" v-model="categoryForm.name"
                                   size="small" style="width: 70px" @on-blur="saveCategory(2, category, index)"></Input>
                        </Tag>
                        <Button icon="ios-add" type="dashed" size="small" @click="inputCategory">
                            <Input ref="c_input" v-if="inputStatus" v-model="categoryForm.name" size="small" style="width: 70px" @on-blur="saveCategory(2)"></Input>
                            <span v-if="!inputStatus">添加分类</span>
                        </Button>
                    </div>
                </Card>
            </div>
            </Affix>
            <!--书签-->
            <div class="bookmark-card">
                <Card class="card" :bordered="true" v-for="card in cardList">
                    <div class="card-title" slot="title">
                        <Checkbox class="card-title-checkBox" v-if="modifyStatus" v-model="card.checkAll" @on-change="onCheckAll(card)"></Checkbox>
                        <p id="card-title-text">{{card.categoryName}}</p>
                        <Icon class="card-title-icon1" custom="iconfont icon-liebiao" size="15" @click="listMark(card,24)"/>
                        <Icon class="card-title-icon2" custom="iconfont icon-liebiao1" size="15" @click="listMark(card,8)"/>
                        <Icon class="card-title-icon3" custom="iconfont icon-iconfontzhizuobiaozhun0247" size="15" @click="listMark(card,4)"/>
                    </div>
                    <div>
                        <Row style="margin-left: 1%" :gutter="10">
                            <Col class="card-col" :span="card.colSpan" v-for="mark in card.markList">
                                <div class="card-mark-ellipsis">
                                    <Checkbox class="card-mark-checkBox" v-if="modifyStatus" v-model="mark.isSelect" @on-change="onCheck(mark,card)"/>
                                    <Tooltip :content="mark.name" placement="top-start" :delay="500" :max-width="500">
                                        <div style="position: relative">
                                            <img class="card-icon" :src="mark.icon">
                                            <a class="card-mark-text" :href="mark.link" target="_blank"
                                               draggable="true"
                                               @dragstart="handleDragStart($event, mark)"
                                               @dragend="handleDragEnd($event)">
                                                <span  v-if="card.colSpan===4">{{mark.name}}</span>
                                                <span v-if="card.colSpan===8">{{mark.name}}</span>
                                                <span v-if="card.colSpan===24">{{mark.name}}</span>
                                            </a>
                                        </div>
                                    </Tooltip>
                                </div>
                            </Col>
                        </Row>
                        <div v-if="card.markList.length === 0">
                            <p>暂无内容</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>

    </div>
</template>

<script>
    import '../assets/css/index.css'
    import Wangeditor from "../components/custom/Wangeditor";
    import WindowCard from "../components/custom/WindowCard";

    export default {
        name: "Index",
        components: {WindowCard, Wangeditor},
        data() {
            return {
                listParams: {
                    page: 1,
                    size: 100,
                },
                deleteParams: {
                    ids: '',
                },
                markForm: {
                    name: '',
                    link: '',
                    categoryId: '',
                },
                categoryForm: {
                    id:null,
                    name:'',
                    type: 2,
                },
                noteForm: {
                    title: '',
                    content: '',
                    categoryId: '',
                },
                noteDetailForm: {},

                ids: [],
                cardList: [],
                markCategoryList: [],
                noteCategoryList: [],
                noteCardList: [],
                viewMostNoteList: [],
                newestNoteList: [],

                panelName: [],
                file: null,
                dragging: null,
                noteWindowTitle: '',

                visible: false,
                importVisible: false,
                modifyStatus: false,
                importLoading: false,
                saveMarkLoading: false,
                checkAll: false,
                inputStatus: false,
                cModelVisible: false,
                headerOpenStatus: false,
                headerHoverStatus: false,

                noteWindowStatus: false,

                tipText: '',

                windowCardData: [
                    {image: require('../assets/image/dex-fish-nga-3.png'), clickMethod: this.goNga},
                    {text: '人物', path: '/person'},
                    {text: '日历', path: '/calendar'},
                    {text: '统计', path: '/stat'},
                    {text: '版本管理', path: '/releaseGroup'},
                    {text: '三体2D模型', path: '/threeBody' }
                ]
            }
        },
        metaInfo: {
            meta: [
                {name: 'referrer', content: 'never'}
            ]
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.getCardList();
                this.getMarkCategoryList();
            },
            getCardList() {
                this.http.post(this.ports.mark.listIndex, this.listParams, res => {
                    this.cardList = res;
                    for (let c of this.cardList) {
                        c.colSpan = 24;
                    }
                });
            },
            flushNoteData() {
                this.getNoteCategoryList();
                this.getNoteList();
            },
            getMarkCategoryList() {
                let params = {
                    page: 1,
                    size: 999,
                    type: 2,
                };
                this.http.post(this.ports.category.list, params, res => {
                    this.markCategoryList = res.records;
                });
            },
            getNoteCategoryList() {
                let params = {
                    page: 1,
                    size: 999,
                    type: 1,
                };
                this.http.post(this.ports.category.list, params, res => {
                    this.noteCategoryList = res.records;
                });
            },
            saveMark() {
                let reg = new RegExp(/(http|https):\/\/[a-z0-9]+/);
                if (!reg.test(this.markForm.link)){
                    this.$Message.warning('请输入正确的书签链接');
                    return;
                }
                this.saveMarkLoading = true;
                this.http.post(this.ports.mark.save, this.markForm, res => {
                    this.visible = false;
                    this.markForm = {};
                    this.pageLoad();
                    this.$Message.success('添加成功');
                    this.saveMarkLoading=false;
                }, () => {
                    this.saveMarkLoading=false;
                });
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
                this.importLoading = true;
                setTimeout(() => {
                    this.http.uploadFileFormData(this.ports.file.import, this.file, res => {
                        this.importVisible = false;
                        this.file = null;
                        this.pageLoad();
                        this.$Message.success('导入成功');
                        this.importLoading = false;
                    }, () => {
                        this.importLoading = false;
                    });
                }, 1500);
            },
            modify() {
                this.modifyStatus = !this.modifyStatus;
            },
            deleteMark() {
                if (this.ids.length !== 0) {
                    this.deleteParams.ids = this.ids.join(',');
                    this.http.post(this.ports.mark.delete, this.deleteParams, res => {
                        this.modifyStatus = false;
                        this.ids = [];
                        this.pageLoad();
                        this.$Message.success('删除成功');
                    })
                }else {
                    this.modifyStatus = false;
                }
            },
            saveCategory(type, origin, index){
                if (!!origin){
                    if (this.categoryForm.name === origin.name){
                        origin.inputStatus = false;
                        this.$set(this.markCategoryList, index, origin);
                        return;
                    }
                    this.categoryForm.id = origin.id;
                }
                if (!!this.categoryForm.name){
                    this.categoryForm.type = type;
                    this.http.post(this.ports.category.save, this.categoryForm, res => {
                        if (type === 1){
                            this.flushNoteData();
                        } else {
                            this.pageLoad();
                        }
                        this.categoryForm.name = null;
                        this.categoryForm.id = null;
                        this.$Message.success(!!this.categoryForm.id ? '修改成功' : '添加成功');
                    })
                }
                this.inputStatus = false;
            },
            deleteCategory(id) {
                this.$Modal.confirm({
                    title: '是否删除该分类？',
                    onOk: () =>{
                        let params = {
                            ids: id,
                        };
                        this.http.post(this.ports.category.delete, params, res => {
                            this.pageLoad();
                            this.flushNoteData();
                            this.$Message.success('删除成功');
                        })
                    },
                });
            },
            inputCategory(){
                if (!this.inputStatus) {
                    this.inputStatus = true;
                }
                this.categoryForm.name = "";
                this.$nextTick(()=>{
                    this.$refs.c_input.focus();
                });
            },
            updateCategory(category, index){
                if (this.modifyStatus){
                    return;
                }
                this.categoryForm.name = category.name;
                category.inputStatus = true;
                this.$set(this.markCategoryList, index, category);
                this.$nextTick(()=>{
                    let div = document.getElementById('c_'+index);
                    let inputs = div.getElementsByTagName('input');
                    inputs[0].focus();
                });
            },
            openMore(){
                this.headerOpenStatus = true;
                this.flushNoteData();
            },
            drawerClose(id){
                if (id > 0){
                    this.noteWindowStatus = false;
                    this.noteForm = {};
                }else {
                    if ((!!this.noteForm.title&&this.noteForm.title.trim().length>0) || (!!this.noteForm.content&&this.noteForm.content.trim().length>0)) {
                        this.$Modal.confirm({
                            title: '是否保留未保存笔记？',
                            onOk: () =>{
                                this.noteDetailForm = this.noteForm;
                                this.$Message.success("笔记已保留，下次打开可继续编辑");
                            },
                            onCancel: () =>{
                                this.noteForm = {};
                            }
                        })
                    }else {
                        this.noteForm = {};
                    }
                    this.noteWindowStatus = false;
                }
            },
            saveNote(){
                if (this.noteForm.title.trim().length === 0){
                    this.$Message.error('标题不能为空');
                    return;
                }
                this.http.post(this.ports.note.save, this.noteForm, res => {
                    this.$Message.success('保存成功');
                    this.noteWindowStatus = false;
                    this.getNoteList();
                    this.noteForm = {};
                })
            },
            getNoteList(){
                this.http.post(this.ports.note.list, this.listParams, res => {
                    this.noteCardList = res;
                })
            },
            getNoteDetail(id){
                if (id > 0){
                    let params = {
                        id: id
                    };
                    this.http.post(this.ports.note.detail, params, res => {
                        this.noteForm = res;
                    });
                    this.noteWindowTitle = '查看笔记';
                }else {
                    this.noteForm = this.noteDetailForm;
                    this.noteDetailForm = {};
                    this.noteWindowTitle = '创建笔记';
                }
                this.noteWindowStatus = true;
            },
            deleteNote(){
                this.$Modal.confirm({
                    title: '是否删除此笔记？',
                    onOk: () =>{
                        let params = {
                            id: this.noteForm.id
                        };
                        this.http.post(this.ports.note.delete, params, res => {
                            this.$Message.success('删除成功');
                            this.getNoteList();
                            this.noteWindowStatus = false;
                        })
                    },

                })
            },
            goNga(){
                let path = '/nga';
                if (this.isMobile()){
                    path = '/mobile/nga';
                }
                this.$router.push({path: path})
            },
            signOut(){
                this.$Modal.confirm({
                    title: '退出',
                    content: '确定要退出吗？',
                    onOk: () => {
                        this.http.post(this.ports.user.signOut, res => {})
                        this.store.remove('user');
                        this.$router.push({path: '/logIn'})
                    }
                });
            },
            showTip(text) {
                this.tipText = text;
            },
            closeTip() {
                this.tipText = '';
            },
            upgradeSort(card) {
                let params = {
                    id: card.categoryId
                };
                this.http.post(this.ports.category.upgradeSort, params, res => {
                    this.pageLoad();
                })
            },

            /***可拖放***/
            handleDragStart(e, item) {
                this.dragging = {...item};
                this.dragging.dragType = 'bookmark';
            },
            handleDragEnd(e) {
                if (e.dataTransfer.dropEffect === 'none'){
                    this.dragging = null;
                    return;
                }
                this.http.post(this.ports.mark.save, this.dragging, res => {
                    this.getCardList();
                });
                this.dragging = null;
            },
            handleCategoryDragStart(e, item) {
                this.dragging = {...item};
                this.dragging.dragType = 'category';
            },
            handleCategoryDragEnd(e) {
                if (e.dataTransfer.dropEffect === 'none'){
                    this.dragging = null;
                    return;
                }
                this.http.post(this.ports.category.upgradeSort, this.dragging, res => {
                    this.getCardList();
                    this.getMarkCategoryList();
                });
                this.dragging = null;
            },
            handleDragOver(e) {
                e.preventDefault();
            },
            handleDragEnter(e, item) {
                if (!this.dragging) {
                    return;
                }
                if (this.dragging.dragType === 'bookmark') {
                    this.dragging.categoryId = item.id;
                }
                if (this.dragging.dragType === 'category') {
                    this.dragging.sort = item.sort;
                }
            },
            /***可拖放***/

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
                if (value.length <= 20) {
                    return value;
                }
                return value.replace(value.substring(20, value.length), "...");
            },
            omitText24: function (value) {
                if (value.length <= 70) {
                    return value;
                }
                return value.replace(value.substring(70, value.length), "...");
            }
        }
    }
</script>

<style>

</style>