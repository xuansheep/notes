<template>
    <div>
        <div class="list">
            <List item-layout="vertical">
                <ListItem v-for="data in tableData" :key="data.lou">
                    <ListItemMeta :avatar="data.avatar | proxyImage" />
                    <p class="reply-text" v-html="data.content"></p>
                </ListItem>
            </List>
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
        name: "NgaReply",
        data(){
            return{
                form:{
                    page:1,
                    size:15,
                    tid: '',
                },
                tableData:[],
                totalSize:0,
            }
        },
        created() {
            this.pageLoad();
            this.form.tid = this.$route.params.tid
        },
        methods: {
            pageLoad(){
                this.replyList();
            },
            changePage(current){
                this.form.page = current;
                this.replyList();
            },
            replyList(){
                this.http.post(this.ports.nga.reply.list, this.form, res => {
                    this.tableData = res.records;
                    this.totalSize = res.total;
                })
            },
        },
        filters: {
            proxyImage(url){
                return "http://127.0.0.1:10001/file/proxy?url="+url;
            },
        }
    }
</script>

<style scoped>

</style>