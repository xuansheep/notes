<template>
    <div style="width: 1024px; margin: auto">
        <Top active="threeBody"></Top>
        <iframe width="100%" height="850" :src="baseUrl + '/threeBody/index.html'">

        </iframe>
    </div>
</template>

<script>
    import Top from "../components/custom/Top";

    export default {
        name: "ThreeBody",
        components: {Top},
        data() {
            return{
                baseUrl: '',
            }
        },
        created() {
            this.baseUrl = window.location.origin;
        }
    }
</script>

<style scoped>

</style>