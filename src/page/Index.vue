<template>
    <div class="background">
        <div class="header">
            <div class="header-carousel">
                <Carousel height="200px" loop>
                    <CarouselItem>
                        <div class="demo-carousel">1</div>
                    </CarouselItem>
                </Carousel>
            </div>
            <div class="header-bottom-add-icon">
                <Poptip placement="left-start" width="300" v-model="visible">
                    <Icon class="add-icon" type="md-add-circle" size="30"/>
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
                            <Option v-for="category in categoryList" :value="category.name" :key="category.id"></Option>
                        </Select>
                        </div>
                        <div style="text-align: right">
                            <Button type="primary" size="small" @click="saveMark">确定</Button>
                        </div>
                        {{markForm.categoryId}}
                    </div>
                </Poptip>
            </div>
            <div class="header-bottom-del-icon">
                <Icon class="del-icon" type="md-trash" size="30" />
            </div>
        </div>
        <div class="content">
            <Card class="card" :bordered="true" v-for="card in cardList">
                <p slot="title">{{card.categoryName}}</p>
                <div>
                    <Row>
                        <Col class="card-col" span="4" v-for="mark in card.markList">
                            <a class="card-mark-text" :href="mark.link">{{mark.name|omitText}}</a>
                        </Col>
                    </Row>
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
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.http.post(this.ports.mark.listIndex, this.params, res => {
                    this.cardList = res;
                });
                this.http.post(this.ports.category.list, this.categoryParams, res => {
                    this.categoryList = res.records;
                })
            },
            saveMark() {
                this.http.post(this.ports.mark.save, this.markForm, res => {
                    this.visible = false;
                    this.pageLoad();
                    this.$Notice.success({
                        title: '添加成功'
                    });
                })
            },
        },
        filters: {
            omitText: function (value) {
                if (value.length <= 10) {
                    return value;
                }
                return value.replace(value.substring(10, value.length), "...");
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
        bottom: 30px;
        right: -30px;
    }
    .header-bottom-del-icon {
        position: absolute;
        bottom: 0;
        right: -30px;
    }
    .add-icon {
        color: dodgerblue;
        cursor: pointer;
        transition: all 0.5s;
        -moz-transition: color 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: color 0.5s; /* Opera */
    }
    .add-icon:hover {
        color: deepskyblue;
    }
    .add-icon:active {
        transform: rotate(90deg);
    }
    .del-icon {
        color: red;
        cursor: pointer;
        transition: all 0.5s;
        -moz-transition: color 0.5s; /* Firefox 4 */
        -webkit-transition: all 0.5s; /* Safari and Chrome */
        -o-transition: color 0.5s; /* Opera */
    }
    .del-icon:hover {
        color: #ff4855;
    }
    .del-icon:active {
        transform: rotate(90deg);
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
    .card-col {
        margin-bottom: 10px;
    }
    .card-mark-text {
        cursor: pointer;
        color: black;
    }
    .card-mark-text:hover {
        color: coral;
    }


</style>