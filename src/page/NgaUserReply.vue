<template>
    <div class="nga-background">
        <div style="padding: 0 16px">
            <Avatar :src="user.avatar" icon="ios-person" size="100" />
            <span class="user-username-span">{{user.username}}</span>
        </div>
        <div style="height: 30px; padding: 0 16px">
            <Affix :offset-top="20">
            <p class="reply-lou">
                <Button size="small" style="font-size: 12px" v-bind:class={onlyImageButton:form.onlyImageFlag}
                        @click="onlyImage">只看图片</Button>
            </p>
            </Affix>
        </div>
        <div class="user-reply-div">
            <div class="reply-list">
                <List item-layout="vertical" :loading="loading">
                    <ListItem v-for="data in tableData" :key="data.id">
                        <p v-if="data.lou!==0" class="reply-lou">
                            <span class="reply-postdate">{{data.postDate|formatDate}}</span>
                            <span>#{{data.lou}}</span>
                        </p>
                        <div >
                            <ListItemMeta>
                                <h2 style="cursor: pointer" slot="title" @click="pushSubjectReply(data.tid)">{{data.subject}}</h2>
                            </ListItemMeta>
                        </div>
                        <p class="reply-text" v-html="data.content"></p>
                        <div style="height: 30px"></div>
                        <div style="height: 26px;">
                            <div class="reply-attach-icon" v-for="attach in data.attachList" @click="showAttach(attach)">显示附件</div>
                        </div>
                    </ListItem>
                </List>
            </div>
            <div class="pagination">
                <Page :total="totalSize" :current="form.page" :page-size="form.size"
                      @on-change="changePage" show-elevator show-sizer show-total />
            </div>
        </div>
    </div>
</template>

<script>

    import '../assets/css/nga.css'

    export default {
        name: "NgaUserReply",
        data(){
            return{
                form:{
                    page:1,
                    size:15,
                    tid: '',
                    authorId:'',
                    onlyImageFlag:false
                },
                userForm:{
                    uid:undefined
                },
                user:{},
                loading:false,
                tableData:[],
                totalSize:0,
            }
        },
        created() {
            this.pageLoad();
            this.form.authorId = this.$route.params.authorId;
            this.userForm.uid = this.$route.params.authorId;
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
                this.userDetail();
                this.replyList();
            },
            changePage(current){
                this.form.page = current;
                this.replyList();
            },
            replyList(){
                this.loading = true;
                this.http.post(this.ports.nga.user.replyList, this.form, res => {
                    this.tableData = res.records;
                    this.tableData.forEach(data => data.avatar = this.proxyImage(data.avatar));
                    this.form.size = res.size;
                    this.totalSize = res.total;
                    this.loading = false;
                })
            },
            userDetail(){
                this.http.post(this.ports.nga.user.detail, this.userForm, res => {
                    this.user = res;
                    this.user.avatar = this.proxyImage(this.user.avatar);
                });
            },
            showAttach(attach){
                open("https://img.nga.178.com/attachments/"+attach.attachurl)
            },
            pushSubjectReply(tid){
                this.$router.push(`/reply/${tid}`);
            },
            onlyImage(){
                this.form.onlyImageFlag = !this.form.onlyImageFlag;
                this.replyList();
            },
        }
    }
</script>

<style scoped>

</style>