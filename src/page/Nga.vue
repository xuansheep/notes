<template>
    <div>
        <div class="search">
            <Input style="width: 200px" search placeholder="Enter something..." v-model="form.subject" @on-enter="subjectList" />
        </div>
        <div>
            <Table :columns="columns" :data="tableDate" @on-row-click="pushReply"></Table>
        </div>
        <div class="pagination">
            <Page :total="totalSize" :current="form.page" :page-size="form.size"
                  @on-change="changePage" show-elevator show-sizer show-total />
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
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad(){
                this.subjectList();
            },
            changePage(current){
                this.form.page = current;
                this.subjectList();
            },
            subjectList(){
                this.http.post(this.ports.nga.subject.list, this.form, res => {
                    this.tableDate = res.records;
                    this.totalSize = res.total;
                })
            },
            pushReply(row){
                this.$router.push(`/reply/${row.tid}`);
            },
        }
    }
</script>

<style scoped>

</style>