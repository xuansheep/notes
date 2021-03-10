<template>
    <div class="nga-background">
        <Affix>
        <div class="reply-title">
            <p>{{subject.subject}}</p>
        </div>
        </Affix>
        <div class="reply-list">
            <List item-layout="vertical">
                <ListItem v-for="data in tableData" :key="data.lou">
                    <Affix :offset-top="20">
                    <p v-if="data.lou===0" class="reply-lou">
                        <Button size="small" style="font-size: 12px" v-bind:class={onlyImageButton:form.onlyImageFlag}
                                @click="onlyImage">只看图片</Button>
                        <Button size="small" style="font-size: 12px; margin-left: 5px" v-bind:class={onlyLouButton:onlyLouFlag}
                                @click="onlyLou(data.authorId)">只看楼主</Button>
                    </p>
                    </Affix>
                    <p v-if="data.lou!==0" class="reply-lou">
                        <span class="reply-postdate">{{data.postDate|formatDate}}</span>
                        <span>#{{data.lou}}</span>
                    </p>
                    <div >
                        <ListItemMeta :title="data.username" >
                            <img class="reply-avatar" :src="data.avatar" slot="avatar" @click="pushUserCenter(data.authorId)">
                        </ListItemMeta>
                    </div>
                    <p class="reply-text" v-html="data.content"></p>
                    <div style="height: 30px"></div>
                    <div style="width: 100%">
                        <div class="reply-attach-icon" v-for="attach in data.attachList" @click="showAttach(attach)">显示附件</div>
                    </div>
                </ListItem>
            </List>
        </div>
        <div class="pagination">
            <Page :total="totalSize" :current="form.page" :page-size="form.size"
                  @on-change="changePage" size="small" show-elevator />
        </div>
    </div>
</template>

<script>

    import '../../assets/css/nga.css'

    export default {
        name: "NgaReply",
        data(){
            return{
                form:{
                    page:1,
                    size:15,
                    tid: '',
                    authorId:'',
                    onlyImageFlag:false
                },
                tableData:[],
                totalSize:0,
                subject:{},
                onlyLouFlag:false
            }
        },
        created() {
            this.pageLoad();
            this.form.tid = this.$route.params.tid
        },
        computed: {
            thePage(){
                return this.form.page;
            }
        },
        watch: {
            thePage(){
                window.scrollTo(0, 0);
            }
        },
        methods: {
            pageLoad(){
                this.replyList();
                this.subjectDetail();
            },
            changePage(current){
                this.form.page = current;
                this.replyList();
            },
            subjectDetail(){
                this.http.post(this.ports.nga.subject.detail, this.form, res => {
                    this.subject = res;
                })
            },
            replyList(){
                this.http.post(this.ports.nga.reply.list, this.form, res => {
                    this.tableData = res.records;
                    this.tableData.forEach(data => data.avatar = this.proxyImage(data.avatar));
                    this.form.size = res.size;
                    this.totalSize = res.total;
                })
            },
            onlyLou(authorId){
                this.onlyLouFlag = !this.onlyLouFlag;
                if (this.onlyLouFlag){
                    this.form.authorId = authorId;
                }else {
                    this.form.authorId = null;
                }
                this.replyList();
            },
            onlyImage(){
                this.form.onlyImageFlag = !this.form.onlyImageFlag;
                this.replyList();
            },
            showAttach(attach){
                open("https://img.nga.178.com/attachments/"+attach.attachurl)
            },
            pushUserCenter(uid){
                this.$router.push(`/user/${uid}`);
            }
        },
        filters: {
            formatDate:function (date) {
                return new Date(date).Format('MM-dd HH:mm:ss');
            }
        }
    }
</script>

<style scoped>

</style>