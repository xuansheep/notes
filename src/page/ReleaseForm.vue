<template>
    <Modal v-model="showStatus" fullscreen title="版本发布">
        <div style="width: 80%; margin: auto">
            <Form :model="form" label-position="top">
                <FormItem prop="name" label="标题">
                    <Input v-model="form.name" placeholder="请输入标题" />
                </FormItem>
                <FormItem prop="name" label="版本">
                    <Input v-model="form.version" placeholder="请输入版本" />
                </FormItem>
                <FormItem prop="name" label="内容">
                    <mavon-editor v-model="form.content">

                    </mavon-editor>
                </FormItem>
                <FormItem prop="name" label="备注">
                    <Input v-model="form.remark" type="textarea" placeholder="请输入备注" />
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="text-align: center">
            <Button style="margin-right: 5%" >取消</Button>
            <Button type="primary" @click="saveRelease">保存</Button>
        </div>
    </Modal>
</template>

<script>

    import EventLine from "../components/custom/EventLine";
    import '../assets/css/release.css'

    export default {
        name: "ReleaseForm",
        components: {EventLine},
        data() {
            return{
                form:{
                    groupId: ''
                },
                tableData: [],
                showStatus: true
            }
        },
        created() {
            this.pageLoad();
            this.form.groupId = this.$route.params.groupId
        },
        methods: {
            pageLoad(){
                this.getReleaseList();
            },
            getReleaseList(){
                this.http.post(this.ports.release.group.list, this.form, res => {
                    this.tableData = res.records;
                });
            },
            saveRelease() {
                if (!!this.form.id) {

                }else {
                    this.http.post(this.ports.release.save, this.form, res => {
                        this.$Message.success("创建成功");
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>