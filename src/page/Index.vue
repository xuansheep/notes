<template>
    <div class="background">
        <div class="header">

        </div>
        <div class="content">
            <Card class="card" :bordered="true" v-for="item in categoryList">
                <p slot="title">{{item.name}}</p>
                <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
            </Card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Index",
        data() {
            return {
                params:{
                    page: 1,
                    size: 10,
                },
                categoryList:[]
            }
        },
        created() {
            this.pageLoad();
        },
        methods:{
            pageLoad(){
                this.http.post(this.ports.category.list, this.params, res => {
                    this.categoryList = res.records;
                })
            }
        }
    }
</script>

<style scoped>
    .background {
        height: 1000px;
        width: 1024px;
        background-color: gainsboro;
        margin: auto;
    }
    .header {
        height: 20%;
        background-color: antiquewhite;
    }
    .content {
        height: 80%;
        background-color: gainsboro;
    }

    .card {
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;
        width: 97%;
    }
</style>