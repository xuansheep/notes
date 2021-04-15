<template>
    <div class="release-background">
        <Top active="releaseGroup"></Top>
        <div class="release-content-div">
            <Row :gutter="16">
                <Col style="margin-bottom: 16px" span="6" v-for="(group) in tableData">
                    <Card :to="'release/' + group.id">
                        <p>{{group.name}}</p>
                    </Card>
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

                },
                tableData: [],
                releaseGroupWindowStatus: false
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
                this.releaseGroupWindowStatus = false;
            }
        }
    }
</script>

<style scoped>

</style>