<template>
    <div class="person-background">
        <!--操作栏-->
        <div class="person-header">
            <div class="person-header-content">
                <!--创建按钮-->
                <div class="person-header-add-icon" @click="drawerOpen">
                    <Icon custom="iconfont icon-xinzeng" size="20"/>
                    <span>创建</span>
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
                            <FormItem label="手机号">
                                <Input v-model="personForm.mobileNo" placeholder="请输入手机号" />
                            </FormItem>
                            <br>
                            <FormItem label="性别">
                                <RadioGroup v-model="personForm.sex" type="button">
                                    <Radio v-for="dict in sexDict" :label="dict.value">{{dict.name}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="生日">
                                <DatePicker v-model="personForm.birthday" @on-change="getDate" type="date" placeholder="请选择生日"></DatePicker>
                            </FormItem>
                            <br>
                            <FormItem label="身份证号">
                                <Input v-model="personForm.idCard" placeholder="请输入身份证号" />
                            </FormItem>
                            <FormItem label="籍贯">
                                <Input v-model="personForm.hometown" placeholder="请输入籍贯地址" />
                            </FormItem>
                            <FormItem label="籍贯地址">
                                <Input v-model="personForm.hometownAddress" placeholder="请输入籍贯地址" style="width: 500px" />
                            </FormItem>
                            <FormItem label="现居地址">
                                <Input v-model="personForm.liveAddress" placeholder="请输入现居地址" style="width: 500px" />
                            </FormItem>
                            <br>
                            <FormItem label="微信昵称">
                                <Input v-model="personForm.weChatName" placeholder="请输入微信昵称" />
                            </FormItem>
                            <FormItem label="微信号">
                                <Input v-model="personForm.weChatNo" placeholder="请输入微信号" />
                            </FormItem>
                            <br>
                            <FormItem label="爱好">
                                <CheckboxGroup v-model="personForm.hobby">
                                    <Checkbox v-for="dict in hobbyDict" :label="dict.value" border>{{dict.name}}</Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                        </Form>
                        <div class="demo-drawer-footer">
                            <Button style="margin-right: 8px" @click="drawerClose">取消</Button>
                            <Button type="primary" @click="savePerson">保存</Button>
                        </div>
                    </Drawer>
                </div>
                <!--筛选-->
                <div class="person-header-search">
                    <Input style="width: 900px" search placeholder="Enter something..." v-model="form.name" />
                </div>
            </div>
        </div>
        <!--人物信息-->
        <div class="person-content-background">
            <waterfall :col="col" :width="itemWidth" :gutterWidth="gutterWidth" :data="tableData" :loadDistance="1"  @loadmore="loadMore"  @scroll="scroll"  >
                <template>
                    <div style="margin-bottom: 24px" :loading="scrollLoading" v-for="(person,index) in tableData">
                        <Card style="border-radius: 10px">
                            <div class="person-card" @mouseover="hoverPersonCard(person, index)" @mouseleave="leavePersonCard(person, index)">
                                <div class="person-card-header">
                                    <Avatar shape="square" icon="ios-person" size="60" />
                                    <span class="person-card-header-name">{{person.name}}</span>
                                </div>
                                <div style="height: 10px"></div>
                                <CardLabel title="性别" :dictData="sexDict" :content="person.sex"/>
                                <CardLabel title="微信名" :content="person.weChatName"/>
                                <CardLabel title="籍贯" :content="person.hometown" />
                                <CardLabel title="生日" :content="person.birthday | formatDateyyyyMMdd" />
                                <div style="height: 20px">
                                    <Icon v-if="person.hoverStatus" class="person-card-more-button" custom="iconfont icon-chakan-copy" size="20" @click="openPersonDetail(person.id)" />
                                </div>
                            </div>
                        </Card>
                    </div>
                </template>
            </waterfall>
            <div class="scroll-loading" :style="{paddingBottom: scrollLoadingHeight + 'px'}">
                <Spin v-if="scrollLoading">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>拼命加载中...</div>
                </Spin>
            </div>
        </div>
        <!--详情弹窗-->
        <Modal ref="detailModal" v-model="detailWindowStatus" :mask-closable="false" footer-hide width="800" @on-cancel="closePersonDetail">
            <Tabs ref="cardLabelGroup">
                <TabPane label="基本信息">
                    <div class="detail-tab-div">
                        <CardLabel prop="name" title="姓名" :content="personDetail.name"/>
                        <CardLabel prop="sex" modify-type="radio" :dictData="sexDict" :method="updatePerson" title="性别" :content="personDetail.sex"/>
                        <CardLabel prop="idCard" modify-type="input" :method="updatePerson" title="身份证号" :content="personDetail.idCard"/>
                        <CardLabel prop="mobileNo" modify-type="input" :method="updatePerson" title="手机号" :content="personDetail.mobileNo"/>
                        <CardLabel prop="weChatName" modify-type="input" :method="updatePerson" title="微信昵称" :content="personDetail.weChatName"/>
                        <CardLabel prop="weChatNo" modify-type="input" :method="updatePerson" title="微信号" :content="personDetail.weChatNo"/>
                    </div>
                    <div class="detail-tab-div">
                        <CardLabel prop="birthday" modify-type="date" :method="updatePerson" title="生日" :content="personDetail.birthday | formatDateyyyyMMdd" />
                        <CardLabel prop="hometown" modify-type="input" :method="updatePerson" title="籍贯" :content="personDetail.hometown" />
                        <CardLabel prop="hometownAddress" modify-type="input" :method="updatePerson" title="籍贯地址" :content="personDetail.hometownAddress" />
                        <CardLabel prop="liveAddress" modify-type="input" :method="updatePerson" title="现居地址" :content="personDetail.liveAddress" />
                        <CardLabel prop="hobby" modify-type="checkBox" :dictData="hobbyDict" :method="updatePerson" title="爱好" :content="personDetail.hobby"/>
                    </div>
                </TabPane>
                <TabPane label="其他信息">

                </TabPane>
            </Tabs>
        </Modal>
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
                    size:16,
                },
                personForm:{
                    name: undefined,
                    sex: undefined,
                    mobileNo: undefined,
                    hometown: undefined,
                    hometownAddress: undefined,
                    liveAddress: undefined,
                    weChatNo: undefined,
                    weChatName: undefined,
                    birthday: undefined,
                    hobby:undefined,
                },
                tableData:[],
                personWindowStatus:false,
                detailWindowStatus:false,
                personDetail:{},

                /*dictData*/
                sexDict:[
                    {name: '男', value: 1},
                    {name: '女', value: 2},
                ],
                hobbyDict:[
                    {name: '篮球', value: 1},
                    {name: '足球', value: 2},
                    {name: '游泳', value: 3},
                    {name: '声乐', value: 4},
                    {name: '舞蹈', value: 5},
                ],

                //clientWidth:document.documentElement.clientWidth,
                clientWidth:1012,
                col:4,
                gutterWidth:24,
                scrollLoading:false,
                scrollLoadingHeight:0,
            }
        },
        created() {
            this.pageLoad();
        },
        computed:{
            itemWidth(){
                return this.clientWidth/this.col - this.gutterWidth;
            },
        },
        methods: {
            pageLoad(){
                this.getPersonList();
            },
            drawerOpen(){
                this.personWindowStatus = true;
            },
            drawerClose(){
                this.personForm = {};
                this.personWindowStatus = false;
            },
            savePerson(){
                if (!this.personForm.name) {
                    this.$Message.error("请输入姓名");
                    return;
                }
                this.http.post(this.ports.person.save, this.personForm, res => {
                    this.resetFormPage();
                    this.getPersonList();
                    this.personWindowStatus = false;
                    this.$Message.success("创建成功");
                    this.personForm = {};
                });
            },
            updatePerson(fieldName, value){
                this.$set(this.personDetail, fieldName, value);
                this.http.post(this.ports.person.update, this.personDetail, res => {
                    this.$Message.success("修改成功");
                    this.resetFormPage();
                    this.getPersonList();
                });
            },
            getPersonList(){
                this.http.post(this.ports.person.list, this.form, res => {
                    this.tableData = res.records;
                    this.tableData.forEach(item => item.hoverStatus = false);
                    this.pageAdd();
                });
            },
            pageAdd(){
                this.form.page++;
            },
            getDate(date){
                this.personForm.birthday = date;
            },
            openPersonDetail(personId){
                this.http.post(this.ports.person.detail, {id: personId}, res => {
                    this.personDetail = res;
                });
                this.detailWindowStatus = true;
            },
            closePersonDetail(){
                /*调用子组件函数，重置属性*/
                this.$refs.cardLabelGroup.$children.forEach(tabPane => {
                    tabPane.$children.forEach(cardLabel => {
                        if (cardLabel && cardLabel.hasOwnProperty('resetField')) {
                            cardLabel.resetField();
                        }
                    })
                })
            },
            hoverPersonCard(person, index){
                person.hoverStatus = true;
                this.$set(this.tableData, index, person);

            },
            leavePersonCard(person, index){
                person.hoverStatus = false;
                this.$set(this.tableData, index, person);
            },
            resetFormPage(){
                this.form.page = 1;
            },
            /**瀑布流*/
            scroll(scrollData){
                //console.log(scrollData)
            },
            loadMore(){
                if (this.scrollLoading) {
                    return;
                }
                this.scrollLoading = true;
                this.scrollLoadingHeight = 50;
                setTimeout(() => {
                    this.http.post(this.ports.person.list, this.form, res => {
                        if (!!res.records && res.records.length > 0){
                            this.pageAdd();
                            res.records.forEach(item => {
                                this.tableData.push(item);
                            })
                        }
                        this.scrollLoading = false;
                        this.scrollLoadingHeight = 0;
                    });
                }, 1000);
            },
            /**瀑布流*/
        }
    }
</script>

<style scoped>

</style>