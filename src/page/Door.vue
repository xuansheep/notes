<template>
    <div>
        <div style="margin-top: 70%">
            <Button style="height: 50px; width: 100px" size="large" shape="circle" :type="buttonType" :loading="loading" @click="openDoor">{{message}}</Button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Door",
        data() {
            return{
                loading: false,
                buttonType: 'primary',
                message: '开门',
            }
        },
        created() {

        },
        methods: {
            openDoor(){
                this.http.post(this.ports.door.open, '', res => {
                    this.loading = true;
                    if (!!res && res.code == 0){
                        this.message = '开门成功';
                        this.buttonType = 'success';
                        this.loading = false;
                    } else {
                        this.message = res.error;
                        this.buttonType = 'warning';
                        this.loading = false;
                    }
                })
            },
        }

    }
</script>

<style scoped>

</style>