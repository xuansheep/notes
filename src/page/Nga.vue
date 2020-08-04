<template>
    <div>
        <div class="search">
            <Input style="width: 500px" search placeholder="Enter something..." v-model="form.subject" @on-enter="handleChange" />
            <i-button style="margin-left: 20px" type="default" icon="ios-redo-outline" @click="resetQuery">重置</i-button>
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
                },
                queryForm: {
                    subject:'',
                },
                columns:[
                    {title:"主题", key:"subject"},
                    {title:"作者", key:"author"},
                ],
                tableDate:[],
                totalSize:0,
                pageSizeOpts:[10, 15, 20, 30]
            }
        },
        created() {
            if (!this.$route.query.page){
                this.$route.query.page = this.form.page;
            }
            if (!this.$route.query.size){
                this.$route.query.size = this.form.size
            }
            this.form.subject = this.$route.query.subject;
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
                console.log('参数： ', this.$route.query)
                this.http.post(this.ports.nga.subject.list, this.$route.query, res => {
                    this.tableDate = res.records;
                    this.totalSize = res.total;
                })
            },
            handleChange() {
                this.$router.push({
                    path: `/nga`,
                    query: {
                        ...this.$route.query,
                        subject: this.form.subject
                    }
                })
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
            },
        }
    }
</script>

<style scoped>

</style>