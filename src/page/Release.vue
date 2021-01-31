<template>
    <div class="release-background">
        <div style="height: 100px;">
            <h1>{{groupName}}</h1>
            <Button style="margin-top: 60px" @click="openReleaseForm">新发布</Button>
        </div>
        <EventLine :data="tableData" />

        <Modal v-model="releaseFormShowStatus" fullscreen title="版本发布" :on-cancel="closeReleaseForm">
            <div style="width: 80%; margin: auto">
                <Form :model="releaseForm" label-position="top">
                    <FormItem prop="name" label="标题">
                        <Input v-model="releaseForm.name" placeholder="请输入标题" />
                    </FormItem>
                    <FormItem prop="name" label="版本">
                        <Input v-model="releaseForm.version" placeholder="请输入版本" />
                    </FormItem>
                    <FormItem prop="publisher" label="发布者">
                        <Input v-model="releaseForm.publisher" placeholder="请输入发布者" />
                    </FormItem>
                    <FormItem prop="name" label="内容">
                        <mavon-editor v-model="releaseForm.content" @change="htmlCode">

                        </mavon-editor>
                    </FormItem>
                    <FormItem prop="name" label="备注">
                        <Input v-model="releaseForm.remark" type="textarea" placeholder="请输入备注" />
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <Button style="margin-right: 5%" @click="closeReleaseForm" >取消</Button>
                <Button type="primary" @click="saveRelease">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>

    import EventLine from "../components/custom/EventLine";
    import '../assets/css/release.css'

    export default {
        name: "ReleaseGroup",
        components: {EventLine},
        data() {
            return{
                form:{
                    page:1,
                    size:1000,
                    groupId: ''
                },
                tableData: [],
                groupName: '',
                releaseForm:{
                    groupId: '',
                    name: '',
                    version: '',
                    publisher: '',
                    content: '',
                    htmlContent: '',
                    participant: '',
                    remark: ''
                },
                releaseFormShowStatus: false,
            }
        },
        created() {
            this.pageLoad();
            this.form.groupId = this.$route.params.groupId
        },
        methods: {
            pageLoad(){
                this.getReleaseGroupDetail(this.$route.params.groupId);
                this.getReleaseList();
            },
            getReleaseList(){
                this.http.post(this.ports.release.list, this.form, res => {
                    this.tableData = res.records;
                });
            },
            saveRelease() {
                if (!!this.form.id) {

                }else {
                    this.http.post(this.ports.release.save, this.releaseForm, res => {
                        this.closeReleaseForm();
                        this.getReleaseList();
                        this.$Message.success("创建成功");
                    });
                }
            },
            getReleaseGroupDetail(id){
                this.http.post(this.ports.release.group.detail, {id: id}, res => {
                    this.groupName = res.name;
                });
            },
            openReleaseForm() {
                this.releaseFormShowStatus = true;
                this.releaseForm.groupId = this.$route.params.groupId
            },
            closeReleaseForm() {
                this.releaseFormShowStatus = false;
                this.releaseForm = {};
            },
            htmlCode(value, render) {
                console.log(render)
                this.releaseForm.htmlContent = render;
            }
        }
    }
</script>

<style scoped>

</style>