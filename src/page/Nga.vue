<template>
    <div class="nga-background">
        <Top active="nga"></Top>
        <div class="search">
            <Input style="width: 380px" v-if="!fullTextSearch"
                   search placeholder="Enter something..." v-model="form.subject" @on-search="handleChange" />
            <Input style="width: 200px; margin-left: 15px" v-if="!fullTextSearch"
                   search placeholder="Enter author..." v-model="form.author" @on-search="handleChange" />
            <Select style="width: 180px; margin-left: 15px" v-if="!fullTextSearch" v-model="form.fid" clearable placeholder="Select column..." @on-change="handleChange">
                <Option v-for="item in sections" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
            <Icon v-if="fullTextSearch" class="ft-search-close" type="ios-arrow-forward" size="32" @click="blurFtSearch" />
            <Input class="ft-search" v-bind:class={ftSearchOpen:fullTextSearch} search placeholder="Full text search..."
                   v-model="form.word" @on-search="handleChange" @on-focus="focusFtSearch" />
            <i-button class="reset-button" type="default" icon="ios-redo-outline" @click="resetQuery">重置</i-button>
        </div>
        <div class="filter">
            <span :style="{fontWeight: form.favoriteFlag ? 'bold' : '', color: form.favoriteFlag ? '#f1795c' : ''}"
             @click="showFavorite">我的收藏</span>
        </div>
        <div>
            <Table :loading="loading" :columns="columns" :data="tableDate" context-menu show-context-menu
                   @on-cell-click="pushReply" @on-sort-change="dataSort" @on-contextmenu="handleContextMenu">
                <template slot-scope="{ row, index }" slot="action">
                    <Icon v-if="!row.favoriteFlag" class="icon-favorite" type="md-star-outline" @click="favorite(row, index)" />
                    <Icon v-else class="icon-favorite" type="md-star" @click="favorite(row, index)" />
                </template>
                <template slot="contextMenu">
                    <DropdownItem @click.native="openReply">新标签页打开</DropdownItem>
                </template>
            </Table>
        </div>
        <div class="pagination">
            <Page :total="totalSize" :current="form.page" :page-size="form.size" :page-size-opts="pageSizeOpts"
                  @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total />
        </div>
    </div>
</template>

<script>

    import '../assets/css/nga.css'
    import Top from "../components/custom/Top";

    export default {
        name: "Nga",
        components: {Top},
        data() {
            return{
                form: {
                    page: 1,
                    size: 15,
                    subject: null,
                    author: null,
                    word: null,
                    fid: null,
                    sortField: null,
                    sortValue: null,
                    favoriteFlag: false
                },
                columns:[
                    {
                        title:"主题", key:"subject", className:"row-background",
                        render: (h, params) => {
                            return h('div', {
                                domProps: {
                                    innerHTML: params.row.subject
                                }
                            })
                        }
                    },
                    {
                        title:"作者", key:"author", className:"row-background", width:240
                    },
                    {
                        title: "发布时间",
                        key: "postDate",
                        className: "row-background",
                        render: (h, params) => {
                            return h('div', !!params.row.postDate ?
                                new Date(params.row.postDate).Format('yyyy-MM-dd HH:mm:ss') : params.row.postDateStr);
                        },
                        sortable: 'custom',
                        sortType:this.getSort('postDate'),
                        width:200
                    },
                    {
                        title:"回复数", key:"replyNum", className:"row-background", sortable:'custom', sortType:this.getSort('replyNum'), width:100
                    },
                    {
                        key: 'action', slot: 'action', width: 100
                    },
                ],
                loading: false,
                sections: [],
                tableDate: [],
                totalSize: 0,
                pageSizeOpts: [10, 15, 20, 30],
                fullTextSearch: false,
                contextMenuTid: ''
            }
        },
        created() {
            if (!this.$route.query.page){
                this.$route.query.page = this.form.page;
            }else {
                this.form.page = Number(this.$route.query.page);
            }
            if (!this.$route.query.size){
                this.$route.query.size = this.form.size;
            }else {
                this.form.size = Number(this.$route.query.size);
            }
            if (!!this.$route.query.fid){
                this.form.fid = Number(this.$route.query.fid);
            }
            this.form.subject = this.$route.query.subject;
            this.form.author = this.$route.query.author;
            this.form.word = this.$route.query.word;
            this.form.favoriteFlag = this.$route.query.favoriteFlag === 'true';
            if (!!this.form.word) {
                this.fullTextSearch = true;
            }
            this.pageLoad();
            this.sectionList();
        },
        computed: {
            thePage(){
                return this.form.page;
            }
        },
        watch: {
            $route() {
                this.subjectList();
            },
            thePage(){
                window.scrollTo(0, 0);
            }
        },
        methods: {
            pageLoad(){
                this.subjectList();
            },
            changePage(current){
                this.form.page = current;
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        page: current
                    }
                })
            },
            changeSize(current){
                this.form.size = current;
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        size: current
                    }
                })
            },
            subjectList(){
                this.loading = true;
                let isSearch = !!this.$route.query.word;
                this.http.post(isSearch ? this.ports.search.subject.list : this.ports.nga.subject.list, this.$route.query, res => {
                    this.tableDate = res.records;
                    this.totalSize = res.total;
                    this.loading = false;
                })
            },
            handleChange() {
                this.form.page = 1;
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        page: 1,
                        subject: this.form.subject,
                        author: this.form.author,
                        word: this.form.word,
                        fid: this.form.fid
                    }
                });
            },
            // getQuery() {
            //     let paramsArr = []
            //     paramsArr =  Object.entries(this.$route.query).reduce((total, currentValue) => {
            //         total.push(currentValue.join('='))
            //         return total
            //
            //     }, [])
            //
            //     return paramsArr.join('&')
            // },
            pushReply(row, column, data, event){
                if (column.key !== 'action') {
                    this.$router.push(`/reply/${row.tid}`);
                }
            },
            resetQuery(){
                this.form={};
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        page: 1,
                        subject: null,
                        author: null,
                        word: null,
                        fid: null,
                        sortField: null,
                        sortValue: null,
                        favoriteFlag: null
                    }
                });
            },
            dataSort(column){
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        sortField: column.key,
                        sortValue: column.order
                    }
                });
            },
            sectionList(){
                this.http.post(this.ports.nga.section.list, {}, res => {
                    this.sections = res;
                })
            },
            getSort(key){
                if (this.$route.query.sortField === key){
                    return this.$route.query.sortValue;
                }
            },
            focusFtSearch(){
                this.fullTextSearch = true;
            },
            blurFtSearch(){
                this.fullTextSearch = false;
            },
            favorite(row, index) {
                console.log(row)
                if (row.favoriteFlag) {
                    this.http.post(this.ports.nga.subject.cancelFavorite, {favoriteId: row.id}, res => {
                        this.$Message.warning('已取消收藏');
                        row.favoriteFlag = false;
                        this.$set(this.tableDate, index, row);
                    });
                }else {
                    this.http.post(this.ports.nga.subject.favorite, {favoriteId: row.id}, res => {
                        this.$Message.success('已收藏');
                        row.favoriteFlag = true;
                        this.$set(this.tableDate, index, row);
                    });
                }

            },
            showFavorite() {
                this.form.favoriteFlag = !this.form.favoriteFlag;
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        page: 1,
                        favoriteFlag: this.form.favoriteFlag,
                    }
                });
            },
            handleContextMenu(row) {
                this.contextMenuTid = row.tid;
            },
            openReply() {
                window.open(`/#/reply/${this.contextMenuTid}`);
            }
        }
    }
</script>

<style scoped>

</style>