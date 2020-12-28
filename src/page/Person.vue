<template>
    <div class="background">
        <!--操作栏-->
        <div class="header">
            <div class="header-content">
                <div>
                    <Button type="primary" ghost @click="drawerOpen">创建</Button>
                    <Drawer
                            title='创建人物'
                            v-model=personWindowStatus
                            width="40"
                            :mask-closable="false"
                            :draggable="true"
                    >
                        <Form :model="personForm" inline>
                            <FormItem label="姓名">
                                <Input v-model="personForm.name" placeholder="请输入姓名"></Input>
                            </FormItem>
                            <br>
                            <FormItem label="手机号">
                                <Input v-model="personForm.mobileNo" placeholder="请输入手机号" />
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button style="margin-right: 8px" @click="drawerClose">取消</Button>
                            <Button type="primary" @click="savePerson">保存</Button>
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
        <!--人物信息-->
        <div class="person-background">
            <Scroll :on-reach-bottom="handleReachBottom" height="820">
                <Row :gutter="12">
                    <Col span="6" style="margin-bottom: 12px" v-for="person in tableData">
                        <Card>
                            <div class="person-header">
                                <Avatar shape="square" icon="ios-person" size="60" />
                                <span class="person-header-name">{{person.name}}</span>
                            </div>
                            <div style="height: 10px"></div>
                            <CardLabel title="手机号" :content="person.mobileNo"/>
                            <CardLabel title="籍贯地址" content="江西省九江市" />
                            <CardLabel title="现居地址" content="深圳市南山区" />
                        </Card>
                    </Col>
                </Row>
            </Scroll>
        </div>
    </div>
</template>

<script>

    import '../assets/css/person.css'
    import CardLabel from "../components/custom/CardLabel";

    export default {
        name: "Person",
        components: {CardLabel},
        data(){
            return{
                form:{
                    page:1,
                    size:15,
                },
                personForm:{

                },
                tableData:[],
                personWindowStatus:false,

                list1:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad(){
                this.getPersonList();
            },
            handleReachBottom () {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const last = this.list1[this.list1.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list1.push(last + i);
                        }
                        resolve();
                    }, 2000);
                });
            },
            drawerOpen(){
                this.personWindowStatus = true;
            },
            drawerClose(){
                this.personWindowStatus = false;
            },
            savePerson(){
                if (!this.personForm.name) {
                    this.$Message.success("请输入姓名");
                    return;
                }
                this.http.post(this.ports.person.save, this.personForm, res => {
                    this.getPersonList();
                    this.personWindowStatus = false;
                    this.$Message.success("创建成功");
                });
            },
            getPersonList(){
                this.http.post(this.ports.person.list, this.form, res => {
                    this.tableData = res.records;
                });
            }
        }
    }
</script>

<style scoped>

</style>