<template>
    <div class="background">
        <div class="header">
            <div class="header-carousel">

            </div>
            <div class="header-bottom-add-icon">
                <Poptip placement="left-start" :width="300" v-model="visible">
                    <Icon class="add-icon" custom="iconfont icon-xinzeng" size="20" />
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
                            <Option v-for="category in categoryList" :value="category.id" :key="category.id">{{category.name}}</Option>
                        </Select>
                        </div>
                        <div style="text-align: right">
                            <Button type="primary" size="small" @click="saveMark">确定</Button>
                        </div>
                    </div>
                </Poptip>
            </div>
            <div class="header-bottom-del-icon">
                <Icon class="del-icon" custom="iconfont icon-remove-1-copy" size="20" />
            </div>
            <div class="header-bottom-import-icon">
                <Poptip placement="left-start" :width="300">
                    <Icon class="import-icon" custom="iconfont icon-daoru" size="20" />
                    <div slot="title">
                        导入Chrome离线书签
                    </div>
                    <div slot="content" style="line-height: 35px">
                        <div>
                            <Upload :before-upload="handleUpload"
                                    action="https://xuanss.com">
                                <Button icon="ios-cloud-upload-outline">选择文件</Button>
                            </Upload>
                            <div v-if="file !== null">
                                文件名：{{file.name}}<br />
                                <Button type="default" size="small" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '导入中' : '开始导入' }}</Button>
                            </div>
                        </div>
                    </div>
                </Poptip>
            </div>

        </div>
        <div class="content">
            <Card class="card" :bordered="true" v-for="card in cardList">
                <div class="card-title" slot="title">
                    <p class="card-title-text">{{card.categoryName}}</p>
                    <Icon class="card-title-icon1" custom="iconfont icon-liebiao" size="15" @click="listMark(card,24)" />
                    <Icon class="card-title-icon2" custom="iconfont icon-liebiao1" size="15" @click="listMark(card,8)" />
                    <Icon class="card-title-icon3" custom="iconfont icon-iconfontzhizuobiaozhun0247" size="15" @click="listMark(card,4)" />
                </div>
                <div>
                    <Row :gutter="10">
                        <Col class="card-col" :span="card.colSpan" v-for="mark in card.markList">
                            <Tooltip :content="mark.name" placement="top-start" :delay="500" :max-width="500">
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
    import {Col} from 'iview';

    export default {
        name: "Index",
        components: {Col},
        data() {
            return {
                params: {
                    page: 1,
                    size: 10,
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
                visible: false,
                file: null,
                loadingStatus: false,
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.http.post(this.ports.mark.listIndex, this.params, res => {
                    this.cardList = res;
                    this.cardList.forEach(c => {
                        c.colSpan = 4;
                    })
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
                    this.$Notice.success({
                        title: '添加成功'
                    });
                })
            },
            listMark(card,span){
                if (card.colSpan === span) {
                    return;
                }else {
                    card.colSpan = span;
                }
                let indexOf = this.cardList.indexOf(card);
                if (indexOf > -1){
                    this.$set(this.cardList, indexOf, card)
                }
            },
            handleUpload (file) {
                this.file = file;
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.http.uploadFileFormData(this.ports.file.import, this.file, res => {
                        this.loadingStatus = false;
                        this.pageLoad();
                        this.$Message.success('导入成功')
                    });
                }, 1500);
            }
        },
        filters: {
            omitText4: function (value) {
                if (value.length <= 8) {
                    return value;
                }
                return value.replace(value.substring(8, value.length), "...");
            },
            omitText8: function (value) {
                if (value.length <= 30) {
                    return value;
                }
                return value.replace(value.substring(30, value.length), "...");
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
    .background {
        height: 1000px;
        width: 1024px;
        background-color: gainsboro;
        margin: auto;
    }

    /**/
    .header {
        position: relative;
        height: 20%;
        background-color: antiquewhite;
    }
    .header-carousel {

    }
    .header-bottom-add-icon {
        position: absolute;
        top: 0;
        right: 45px;
    }
    .header-bottom-del-icon {
        position: absolute;
        top: 0;
        right: 15px;
    }
    .header-bottom-import-icon {
        position: absolute;
        top: 0;
        right: 75px;
    }
    .add-icon {
        cursor: pointer;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .add-icon:hover {
        color: deepskyblue;
    }
    .add-icon:active {
        transform: rotate(30deg);
    }
    .del-icon {
        cursor: pointer;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .del-icon:hover {
        color: #ff4855;
    }
    .del-icon:active {
        transform: rotate(30deg);
    }
    .import-icon {
        cursor: pointer;
        transition: all 0.5s;
        -moz-transition: all 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: all 0.5s; /* Opera */
    }
    .import-icon:hover {
        color: #01a520;
    }
    .import-icon:active {
        transform: rotate(30deg);
    }

    /**/
    .content {
        height: 80%;
        background-color: gainsboro;
    }

    /**/
    .card {
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        width: 97%;
    }
    .card-title {
        text-align: left;
    }
    .card-title-text {
        display: inline;
    }
    .card-title-icon1 {
        position: absolute;
        right: 75px;
        cursor: pointer;
    }
    .card-title-icon2 {
        position: absolute;
        right: 45px;
        cursor: pointer;
    }
    .card-title-icon3 {
        position: absolute;
        right: 15px;
        cursor: pointer;
    }
    .card-title-icon1:hover, .card-title-icon2:hover, .card-title-icon3:hover {
        color: black;
    }
    .card-title-icon1:active, .card-title-icon2:active, .card-title-icon3:active {

    }
    .card-col {
        margin-bottom: 10px;
        text-align: left;
    }
    .card-mark-text {
        cursor: pointer;
        color: black;
    }
    .card-mark-text:hover {
        color: coral;
    }
    .card-icon {
        margin-right: 3px;
        margin-bottom: -3px;
    }


</style>