<template>
    <div class="release-background">
        <Top active="releaseGroup"></Top>
        <div style="padding: 16px">
            <Row :gutter="16">
                <Col span="6" v-for="(group) in tableData">
                    <Card :to="'release/' + group.id">
                        <p>{{group.name}}</p>
                    </Card>
                </Col>
            </Row>
        </div>
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
                tableData: [],
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
        }
    }
</script>

<style scoped>

</style>