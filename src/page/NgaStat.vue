<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "NgaStat",
        data() {
            return {
                statList: [],
            }
        },
        created() {

        },
        methods: {
            pageLoad() {
                this.http.post(this.ports.nga.stat, {}, res => {
                    this.statList = res;
                })

            }
        }
    }
</script>

<style scoped>

</style>