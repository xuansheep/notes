<template>
    <div class="release-background">
        <Top active="releaseGroup"></Top>
        <div class="release-content-div">
            <Row :gutter="16">
                <Col class="release-group-col" span="6" v-for="(group, index) in tableData">
                    <div @mouseover="overGroup(group, index)" @mouseleave="leaveGroup(group, index)">
                        <Card :to="'release/' + group.id">
                            <p>{{group.name}}</p>
                        </Card>
                        <div v-if="group.hoverStatus" class="release-group-delete-icon" @click="deleteGroup(group)">
                            <Icon type="ios-close" size="20" />
                        </div>
                    </div>
                </Col>
                <Col style="margin-bottom: 16px" span="6">
                    <div @click="openCreateWindow">
                        <Card style="cursor: pointer">
                            <Icon  style="color: #666666" type="ios-add" size="35" />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>

        <Modal v-model="releaseGroupWindowStatus" title="版本组" @on-ok="saveReleaseGroup" @on-cancel="releaseGroupWindowStatus = false">
            <Form :model="releaseGroupForm" label-position="top">
                <FormItem label="分组名称">
                    <Input v-model="releaseGroupForm.name"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    import '../assets/css/release.css'
    import Top from "../components/custom/Top";

    export default {
        name: "ReleaseGroup",
        components: {Top},
        data() {
            return{
                form:{
                    page:1,
                    size:1000
                },
                releaseGroupForm: {
                    name: ''
                },
                tableData: [],
                releaseGroupWindowStatus: false,
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad(){
                this.getReleaseGroupList();
            },
            getReleaseGroupList(){
                this.http.post(this.ports.release.group.list, this.form, res => {
                    this.tableData = res.records;
                });
            },
            openCreateWindow() {
                this.releaseGroupWindowStatus = true;
            },
            saveReleaseGroup() {
                this.http.post(this.ports.release.group.save, this.releaseGroupForm, res => {
                    this.releaseGroupWindowStatus = false;
                    this.releaseGroupForm.name = '';
                    this.getReleaseGroupList();
                    this.$Message.success('创建成功');
                });
            },
            deleteGroup(group) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确定要删除分组吗？',
                    onOk: () => {
                        this.http.post(this.ports.release.group.delete, {id: group.id}, res => {
                            this.$Message.success('删除成功');
                            this.getReleaseGroupList();
                        })
                    }
                });
            },
            overGroup(group, index) {
                group.hoverStatus = true;
                this.$set(this.tableData, index, group);
            },
            leaveGroup(group, index) {
                group.hoverStatus = false;
                this.$set(this.tableData, index, group);
            }
        }
    }
</script>

<style scoped>

</style>