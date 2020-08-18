<template>
    <div class="nga-background">
        <div class="search">
            <Input style="width: 500px" search placeholder="Enter something..." v-model="form.subject" @on-search="handleChange" />
            <i-button style="margin-left: 20px"
                      type="default" icon="ios-redo-outline" @click="resetQuery">重置</i-button>
        </div>
        <div>
            <Table :columns="columns" :data="tableDate" @on-row-click="pushReply"></Table>
        </div>
        <div class="pagination">
            <Page :total="totalSize" :current="form.page" :page-size="form.size" :page-size-opts="pageSizeOpts"
                  @on-change="changePage" @on-page-size-change="changeSize" show-elevator show-sizer show-total />
        </div>
    </div>
</template>

<script>

    import '../assets/css/nga.css'

    export default {
        name: "Nga",
        data() {
            return{
                form: {
                    page:1,
                    size:15,
                    subject:'',
                    word:'',
                },
                columns:[
                    {title:"主题", key:"subject", className:"row-background",
                        render: (h, params) => {
                            return h('div', {
                                domProps: {
                                    innerHTML: params.row.subject
                                }
                            })
                        }
                    },
                    {title:"作者", key:"author", className:"row-background", width:240},
                    {
                        title: "发布时间",
                        key: "postDate",
                        className: "row-background",
                        render: (h, params) => {
                            return h('div', !!params.row.postDate ?
                                new Date(params.row.postDate).Format('yyyy-MM-dd HH:mm:ss') : params.row.postDateStr);
                        },
                        width:200
                    },
                    {title:"回复数", key:"replyNum", className:"row-background", width:100},
                ],
                tableDate:[],
                totalSize:0,
                pageSizeOpts:[10, 15, 20, 30]
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
            this.form.subject = this.$route.query.subject;
            this.form.word = this.$route.query.word;
            this.pageLoad();
        },
        watch: {
            $route() {
                this.subjectList();
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
                console.log('参数： ', this.$route.query);
                let isSearch = !!this.$route.query.word;
                this.http.post(isSearch ? this.ports.search.subject.list : this.ports.nga.subject.list, this.$route.query, res => {
                    this.tableDate = res.records;
                    this.totalSize = res.total;
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
                        word: this.form.subject
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
                this.$router.push(`/reply/${row.tid}`);
            },
            resetQuery(){
                this.form={};
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        page: 1,
                        subject: '',
                        word: ''
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>