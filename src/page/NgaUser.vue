<template>
    <div class="nga-background">
        <div>
            <Avatar :src="user.avatar" icon="ios-person" size="100" />
            <span class="user-username-span">{{user.username}}</span>
            <div class="user-card">
                <p>威望：{{(user.rvrc/10).toFixed(1)}}</p>
                <p>铜币：{{user.money}}</p>
                <p>总发帖：{{user.postNum}}</p>
                <p>注册时间：{{user.regDate|formatDate}}</p>
            </div>
        </div>
        <Card icon="ios-options" :padding="0" shadow style="width: 100%;">
            <CellGroup>
                <div style="height: 30px"></div>
                <Cell extra="查看" :to="isMobile() ? '/mobile/nga?author='+user.username : '/nga?author='+user.username">
                    <span style="margin-right: 10px">所有主题</span>
                    <Badge v-if="subjectNum || subjectNum >= 0" :count="subjectNum" overflow-count="999" show-zero type="normal"></Badge>
                    <div v-else class="user-center-spin">
                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    </div>
                </Cell>
                <Cell extra="查看" :to="'/userReply/'+user.uid">
                    <span style="margin-right: 10px">所有回复</span>
                    <Badge v-if="replyNum  || replyNum >= 0" :count="replyNum" overflow-count="999" show-zero type="normal"></Badge>
                    <div v-else class="user-center-spin">
                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    </div>
                </Cell>
            </CellGroup>
        </Card>
    </div>
</template>

<script>

    import '../assets/css/nga.css'

    export default {
        name: "NgaUser",
        data(){
            return{
                form:{
                    uid:"undefined"
                },
                user:{},
                subjectNum:undefined,
                replyNum:undefined

            }
        },
        created() {
            this.form.uid = this.$route.params.uid;
            this.pageLoad();
        },
        methods: {
            pageLoad(){
                this.userDetail();
            },
            userDetail(){
                this.http.post(this.ports.nga.user.detail, this.form, res => {
                    this.user = res;
                    this.user.avatar = this.proxyImage(this.user.avatar);

                    this.http.post(this.ports.nga.user.subjectNum, this.form, res => {
                        this.subjectNum = res;
                    });
                    this.http.post(this.ports.nga.user.replyNum, this.form, res => {
                        this.replyNum = res;
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>