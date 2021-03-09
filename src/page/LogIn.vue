<template>
    <div style="text-align: center; ">
        <div style="padding-top: 12%">
            <div>
                <h1>NOTES</h1>
                <!--<img style="height: 42px" src="../assets/image/logo2-2.png">-->
            </div>
            <div style="margin-top: 20px">
                <Input style="width: 200px" v-model="form.userName" type="text" placeholder="Enter name" @on-enter="focusPassword">
                    <Icon type="md-contact" slot="prefix" />
                </Input>
            </div>
            <div style="margin-top: 5px">
                <Input ref="password" style="width: 200px" v-model="form.passWord" @on-enter="singIn"
                       type="password" prefix="md-lock" placeholder="Enter password" >
                    <Button :loading="loading" type="text" slot="suffix" icon="md-arrow-round-forward" @click="singIn"  />
                </Input>
            </div>
        </div>
    </div>
</template>

<script>

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
        beforeCreate () {
            let backgroundColor = [
                '135deg, #C2FFD8 20%, #465EFB 100%',
                '135deg, #ABDCFF 20%, #0396FF 100%',
                '135deg, #90F7EC 20%, #32CCBC 100%',
                '135deg, #FFF6B7 20%, #F6416C 100%',
                '135deg, #FFD26F 20%, #3677FF 100%',
                '135deg, #FAD7A1 20%, #E96D71 100%',
                '135deg, #F1CA74 20%, #A64DB6 100%',
                '135deg, #FFF886 20%, #F072B6 100%',
                '135deg, #FFD3A5 20%, #FD6585 100%',
                '135deg, #81FFEF 20%, #F067B4 100%',
                '135deg, #FFF5C3 20%, #9452A5 100%'
            ];
            let r = Math.floor(Math.random() * backgroundColor.length);
            console.log("1.", backgroundColor[r]);
            document.querySelector('html').setAttribute('style', 'height: 100%');
            document.querySelector('body').setAttribute('style', 'background: linear-gradient('+backgroundColor[r]+')');
        },
        beforeDestroy () {
            document.querySelector('body').setAttribute('style', '')
        },
        created() {
            let user = this.store.fetch('user')
            if (!!user) {
                this.$router.push({path:'/index'})
            }
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
                        this.http.post(this.ports.dataDict.list, {}, res => {
                            this.store.save('noteDict',res);
                        });
                        this.$router.push({path:'/index'})
                    });
                    this.loading = false;
                },1000);
            },
            focusPassword(){
                this.$refs.password.focus();
            }
        }
    }
</script>

<style scoped>
    .ivu-btn:focus {
         box-shadow: 0 0 0 0 rgba(45,140,240,.2);
    }
    .ivu-btn-text.active,
    .ivu-btn-text:active,
    .ivu-btn:not([disabled]):hover{
        background-color: transparent;
    }
    >>> .ivu-input:hover {
        border-color: transparent;
    }
    >>> .ivu-input:focus{
        border-color: transparent;
        outline: 0;
        box-shadow: 0 0 0 2px rgba(241, 121, 92, 0.2);
    }
    >>> .ivu-btn:hover {
        color: transparent;
        background-color: #fff;
        border-color: transparent;
    }
</style>