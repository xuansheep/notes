<template>
    <div class="release-background">
        <div style="height: 100px;">

        </div>
        <EventLine></EventLine>
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
        }
    }
</script>

<style scoped>

</style>