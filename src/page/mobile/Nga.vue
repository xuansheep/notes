<template>
    <div class="nga-background">
        <div class="search">
            <div class="icon-home" @click="toHome">
                <Icon type="ios-home" size="25" />
            </div>
            <Input style="width: 90%" v-if="!fullTextSearch"
                   search placeholder="Enter something..." v-model="form.subject" @on-search="handleChange" />
            <!--<Input style="width: 200px; margin-left: 15px" v-if="!fullTextSearch"
                   search placeholder="Enter author..." v-model="form.author" @on-search="handleChange" />
            <Select style="width: 180px; margin-left: 15px" v-if="!fullTextSearch" v-model="form.fid" clearable @on-change="handleChange">
                <Option v-for="item in sections" :value="item.code" :key="item.code">{{item.name}}</Option>
            </Select>
            <i-button style="margin-left: 15px" v-if="!fullTextSearch"
                      type="default" icon="ios-redo-outline" @click="resetQuery">重置</i-button>
            <Icon v-if="fullTextSearch" class="ft-search-close" type="ios-arrow-forward" size="32" @click="blurFtSearch" />
            <Input class="ft-search" v-bind:class={ftSearchOpen:fullTextSearch} search placeholder="Full text Search"
                   v-model="form.word" @on-search="handleChange" @on-focus="focusFtSearch" />-->
        </div>
        <div>
            <Table :columns="columns" :data="tableDate" @on-row-click="pushReply" @on-sort-change="dataSort"></Table>
        </div>
        <div class="pagination">
            <Page :total="totalSize" :current="form.page" :page-size="form.size" :page-size-opts="pageSizeOpts"
                  @on-change="changePage" @on-page-size-change="changeSize" size="small" show-elevator />
        </div>
    </div>
</template>

<script>

    import '../../assets/css/nga.css'
    import Top from "../../components/custom/Top";

    export default {
        name: "Nga",
        components: {Top},
        data() {
            return{
                form: {
                    page:1,
                    size:15,
                    subject:null,
                    author:null,
                    word:null,
                    fid:null,
                    sortField:null,
                    sort:null,
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
                        title:"回复", key:"replyNum", className:"row-background", sortable:'custom', sortType:this.getSort('replyNum'), width:85
                    },
                ],
                sections:[],
                tableDate:[],
                totalSize:0,
                pageSizeOpts:[10, 15, 20, 30],
                fullTextSearch:false
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
            this.pageLoad();
            this.sectionList();
            console.log("form", this.form)
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
                    path: `/mobile/nga`,
                    query: {
                        ...this.$route.query,
                        page: current
                    }
                })
            },
            changeSize(current){
                this.form.size = current;
                this.$router.push({
                    path: `/mobile/nga`,
                    query: {
                        ...this.$route.query,
                        size: current
                    }
                })
            },
            subjectList(){
                let isSearch = !!this.$route.query.word;
                this.http.post(isSearch ? this.ports.search.subject.list : this.ports.nga.subject.list, this.$route.query, res => {
                    this.tableDate = res.records;
                    this.totalSize = res.total;
                })
            },
            handleChange() {
                this.form.page = 1;
                this.$router.push({
                    path: `/mobile/nga`,
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
            pushReply(row){
                this.$router.push(`/mobile/reply/${row.tid}`);
            },
            resetQuery(){
                this.form={};
                this.$router.push({
                    path: `/mobile/nga`,
                    query: {
                        ...this.$route.query,
                        page: 1,
                        subject: null,
                        author: null,
                        word: null,
                        fid:null,
                        sortField:null,
                        sort:null
                    }
                });
            },
            dataSort(column){
                this.$router.push({
                    path: `/mobile/nga`,
                    query: {
                        ...this.$route.query,
                        sortField: column.key,
                        sort: column.order
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
                    return this.$route.query.sort;
                }
            },
            focusFtSearch(){
                this.fullTextSearch = true;
            },
            blurFtSearch(){
                this.fullTextSearch = false;
            },
            toHome() {
                this.$router.push({path: '/'})
            }
        }
    }
</script>

<style scoped>

</style>