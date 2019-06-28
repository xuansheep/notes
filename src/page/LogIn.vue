<template>
    <div style="text-align: center">
        <div style="margin-top: 12%">
            <div>
                <h1>NOTES</h1>
            </div>
            <div style="margin-top: 20px">
                <Input type="text" placeholder="Enter name" style="width: 200px" v-model="form.userName">
                    <Icon type="md-contact" slot="prefix" />
                </Input>
            </div>
            <div style="margin-top: 5px">
                <Input type="password" placeholder="Enter password" style="width: 200px" v-model="form.passWord">
                    <Icon type="md-lock" slot="prefix" />
                </Input>
            </div>
            <div style="margin-top:20px">
                <Button :loading="loading" type="success" style="width: 200px" @click="singIn">LogIn</Button>
            </div>
        </div>
    </div>
</template>

<script>

    import eruda from 'eruda/eruda.min.js';

    export default {
        name: "Login",
        data() {
            return{
                form:{
                    userName:'',
                    passWord:'',
                },
                loading: false,
            }
        },
        created() {
            eruda.init();
        },
        methods: {
            singIn(){
                if (!this.form.userName.trim()) {
                    this.$Message.warning('请输入用户名');
                    return;
                }
                if (!this.form.passWord.trim()) {
                    this.$Message.warning('请输入密码');
                    return;
                }
                this.loading = true;
                setTimeout(() => {
                    this.http.post(this.ports.user.signIn, this.form, res => {
                        this.store.save('user',res);
                        this.$router.push({path:'/index'})
                    });
                    this.loading = false;
                },1000);
            }
        }
    }
</script>

<style scoped>

</style>