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
                            <Tabs ref="cardLabelGroup">
                                <TabPane label="基本信息">
                                    <FormItem label="头像">
                                        <div class="demo-upload-list" v-if="!!personForm.avatar">
                                            <template>
                                                <img :src="personForm.avatar">
                                                <div class="demo-upload-list-cover">
                                                    <Icon type="ios-eye-outline" @click.native="handleView"></Icon>
                                                    <Icon type="ios-trash-outline" @click.native="handleRemove"></Icon>
                                                </div>
                                            </template>
                                        </div>
                                        <Upload v-else
                                                ref="upload"
                                                :show-upload-list="false"
                                                :on-success="handleSuccess"
                                                :format="['jpg','jpeg','png']"
                                                :max-size="2048"
                                                type="drag"
                                                name="file"
                                                :action="http.serverUrl + this.ports.file.upload"
                                                :data="{token: getToken()}"
                                                style="display: inline-block;width:58px;">
                                            <div style="width: 58px;height:58px;line-height: 58px;">
                                                <Icon type="ios-camera" size="20"></Icon>
                                            </div>
                                        </Upload>
                                        <Modal title="人物头像" v-model="avatarVisible">
                                            <img :src="personForm.avatar + '?x-oss-process=image/interlace,1'" v-if="avatarVisible" style="width: 100%">
                                        </Modal>
                                    </FormItem>
                                    <br>
                                    <FormItem label="姓名">
                                        <Input v-model="personForm.name" placeholder="请输入姓名" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="手机号">
                                        <Input v-model="personForm.mobileNo" placeholder="请输入手机号" style="width: 200px" />
                                    </FormItem>
                                    <br>
                                    <FormItem label="性别">
                                        <RadioGroup v-model="personForm.sex" type="button">
                                            <Radio v-for="dict in getDict('person.sex')" :label="dict.value">{{dict.name}}</Radio>
                                        </RadioGroup>
                                    </FormItem>
                                    <FormItem label="生日">
                                        <DatePicker v-model="personForm.birthday" @on-change="getDate" type="date" placeholder="请选择生日" style="width: 200px" />
                                    </FormItem>
                                    <br>
                                    <FormItem label="身份ID">
                                        <Input v-model="personForm.idCard" placeholder="请输入身份证号" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="籍贯">
                                        <Input v-model="personForm.hometown" placeholder="请输入籍贯地址" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="籍贯地址">
                                        <Input v-model="personForm.hometownAddress" placeholder="请输入籍贯地址" style="width: 400px" />
                                    </FormItem>
                                    <FormItem label="现居地址">
                                        <Input v-model="personForm.liveAddress" placeholder="请输入现居地址" style="width: 400px" />
                                    </FormItem>
                                    <br>
                                    <FormItem label="学历">
                                        <Select v-model="personForm.education" transfer clearable filterable style="width: 200px">
                                            <Option v-for="dict in getDict('person.education')" :value="dict.value" :key="dict.value">{{dict.name}}</Option>
                                        </Select>
                                    </FormItem>
                                    <FormItem label="毕业院校">
                                        <Input v-model="personForm.graduatedSchool" placeholder="请输入毕业院校" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="政治面貌">
                                        <Select v-model="personForm.politicalFace" transfer clearable filterable style="width: 200px">
                                            <Option v-for="dict in getDict('person.politicalFace')" :value="dict.value" :key="dict.value">{{dict.name}}</Option>
                                        </Select>
                                    </FormItem>
                                    <br>
                                    <FormItem label="主要职业">
                                        <Input v-model="personForm.profession" placeholder="请输入主要职业" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="副要职业">
                                        <Input v-model="personForm.secondProfession" placeholder="请输入副要职业" style="width: 200px" />
                                    </FormItem>
                                </TabPane>
                                <TabPane label="社交信息">
                                    <FormItem label="微信昵称">
                                        <Input v-model="personForm.weChatName" placeholder="请输入微信昵称" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="微信号">
                                        <Input v-model="personForm.weChatId" placeholder="请输入微信号" style="width: 200px" />
                                    </FormItem>
                                    <br>
                                    <FormItem label="QQ昵称">
                                        <Input v-model="personForm.qqName" placeholder="请输入QQ昵称" style="width: 200px" />
                                    </FormItem>
                                    <FormItem label="QQ号">
                                        <Input v-model="personForm.qqId" placeholder="请输入QQ号" style="width: 200px" />
                                    </FormItem>
                                </TabPane>
                                <TabPane label="其他信息">
                                    <FormItem label="爱好">
                                        <CheckboxGroup v-model="personForm.hobby">
                                            <Checkbox v-for="dict in getDict('person.hobby')" :label="dict.value" border>{{dict.name}}</Checkbox>
                                        </CheckboxGroup>
                                        <Input style="margin-top: 10px" v-model="personForm.hobbyDescription" placeholder="爱好说明" type="textarea" :rows="6"></Input>
                                    </FormItem>
                                </TabPane>
                            </Tabs>
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
                    <div style="margin-bottom: 24px" v-for="(person,index) in tableData">
                        <Card style="border-radius: 10px; padding: 0">
                            <div class="person-card" :style="{filter:person.hideFlag?'blur(4px)':''}" @mouseover="hoverPersonCard(person, index)" @mouseleave="leavePersonCard(person, index)">
                                <div class="person-card-header">
                                    <Avatar :src="!!person.avatar ? person.avatar+'?x-oss-process=image/resize,w_100' : ''" shape="square" icon="ios-person" size="60" />
                                    <span class="person-card-header-name">{{person.name}}</span>
                                </div>
                                <div style="height: 10px"></div>
                                <CardLabel title="性别" :dictData="getDict('person.sex')" :content="person.sex"/>
                                <CardLabel title="主要职业" :content="person.profession"/>
                                <CardLabel title="籍贯" :content="person.hometown" />
                                <CardLabel title="生日" :content="person.birthday | formatDateyyyyMMdd" />
                                <div v-if="!person.hideFlag" style="height: 20px; color: #c5cfe2;">
                                    <Icon v-if="person.hoverStatus" class="person-card-hide-button" custom="iconfont icon-yanjing1" size="20" @click="hiddenPersonCard(person, index)" />
                                    <Icon v-if="person.hoverStatus" class="person-card-more-button" custom="iconfont icon-chakan-copy" size="20" @click="openPersonDetail(person.id)" />
                                </div>
                            </div>
                            <div v-if="!!person.hideFlag" style="color: #c5cfe2">
                                <Icon class="person-card-show-button" custom="iconfont icon-yanjing" size="25" @click="beforeShowPersonCard(person, index)" />
                            </div>
                        </Card>
                    </div>
                </template>
            </waterfall>
            <div class="scroll-loading" :style="{paddingBottom: scrollLoadingHeight + 'px'}">
                <Spin v-if="scrollLoading">
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>{{scrollLoadingText}}</div>
                </Spin>
            </div>
        </div>
        <!--详情弹窗-->
        <Modal ref="detailModal" v-model="detailWindowStatus" :mask-closable="false" footer-hide width="800" @on-cancel="closePersonDetail">
            <Tabs ref="cardLabelGroup">
                <TabPane label="基本信息">
                    <div class="detail-tab-div">
                        <CardLabel prop="name" title="姓名" :content="personDetail.name"/>
                        <CardLabel prop="sex" modify-type="radio" :dictData="getDict('person.sex')" :method="updatePerson" title="性别" :content="personDetail.sex"/>
                        <CardLabel prop="idCard" modify-type="input" :method="updatePerson" title="身份ID" :content="personDetail.idCard"/>
                        <CardLabel prop="mobileNo" modify-type="input" :method="updatePerson" title="手机号" :content="personDetail.mobileNo"/>
                        <CardLabel prop="birthday" modify-type="date" :method="updatePerson" title="生日" :content="personDetail.birthday | formatDateyyyyMMdd" />
                        <CardLabel prop="hometown" modify-type="input" :method="updatePerson" title="籍贯" :content="personDetail.hometown" />
                        <CardLabel prop="hometownAddress" modify-type="input" :method="updatePerson" title="籍贯地址" :content="personDetail.hometownAddress" />
                        <CardLabel prop="liveAddress" modify-type="input" :method="updatePerson" title="现居地址" :content="personDetail.liveAddress" />
                    </div>
                    <div class="detail-tab-div">
                        <CardLabel prop="profession" modify-type="input" :method="updatePerson" title="主要职业" :content="personDetail.profession" />
                        <CardLabel prop="secondProfession" modify-type="input" :method="updatePerson" title="副要职业" :content="personDetail.secondProfession" />
                        <CardLabel prop="education" modify-type="radio" :dictData="getDict('person.education')" :method="updatePerson" title="学历" :content="personDetail.education" />
                        <CardLabel prop="graduatedSchool" modify-type="input" :method="updatePerson" title="毕业院校" :content="personDetail.graduatedSchool" />
                        <CardLabel prop="politicalFace" modify-type="radio" :dictData="getDict('person.politicalFace')" :method="updatePerson" title="政治面貌" :content="personDetail.politicalFace" />
                    </div>
                </TabPane>
                <TabPane label="社交信息">
                    <div class="detail-tab-div">
                        <CardLabel prop="weChatName" modify-type="input" :method="updatePerson" title="微信昵称" :content="personDetail.weChatName"/>
                        <CardLabel prop="weChatId" modify-type="input" :method="updatePerson" title="微信号" :content="personDetail.weChatId"/>
                        <CardLabel prop="qqName" modify-type="input" :method="updatePerson" title="QQ昵称" :content="personDetail.qqName"/>
                        <CardLabel prop="qqId" modify-type="input" :method="updatePerson" title="QQ号" :content="personDetail.qqId"/>
                    </div>
                </TabPane>
                <TabPane label="其他信息">
                    <div class="detail-tab-div">
                        <CardLabel prop="hobby" modify-type="checkBox" :dictData="getDict('person.hobby')" :method="updatePerson" title="爱好" :content="personDetail.hobby" :description="personDetail.hobbyDescription"/>
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
        <!--密码输入-->
        <Modal v-model="passwordWindowStatus" title="查看" :loading="passwordLoading"
               @on-ok="showPersonCard" @on-cancel="resetPasswordWindow">
            <Input v-model="password" placeholder="请输入查看密码" @on-enter="showPersonCard"></Input>
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
                    name: "",
                    sex: 0,
                    mobileNo: "",
                    hometown: "",
                    hometownAddress: "",
                    liveAddress: "",
                    weChatId: "",
                    weChatName: "",
                    qqId: "",
                    qqName: "",
                    birthday: "",
                    hobby:[],
                    hobbyDescription: "",
                    education: 0,
                    graduatedSchool: '',
                    politicalFace: 0,
                    profession: '',
                    secondProfession: '',
                },
                tableData:[],
                personWindowStatus:false,
                detailWindowStatus:false,
                personDetail:{},
                passwordWindowStatus:false,
                passwordLoading:false,
                password:"",

                currentPersonId:0,
                currentPersonIndex:0,

                //clientWidth:document.documentElement.clientWidth,
                clientWidth:1012,
                col:4,
                gutterWidth:24,
                scrollLoading:false,
                scrollLoadingHeight:0,
                scrollLoadingText:"拼命加载中...",

                avatarVisible: false,
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
                this.scrollLoading = true;
                this.http.post(this.ports.person.list, this.form, res => {
                    this.tableData = res.records;
                    this.tableData.forEach(item => item.hoverStatus = false);
                    this.pageAdd();
                    this.scrollLoading = false;
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
            hiddenPersonCard(person, index){
                person.hideFlag = true;
                this.$set(this.tableData, index, person);
                this.http.post(this.ports.person.hide, {id: person.id}, res => {});
            },
            beforeShowPersonCard(person, index){
                this.passwordWindowStatus = true;
                this.currentPersonId = person.id;
                this.currentPersonIndex = index;
            },
            showPersonCard(){
                if (!this.password || this.password.length === 0) {
                    this.$Message.error("请输入查看密码");
                    return;
                }
                this.passwordLoading = true;
                this.http.post(this.ports.person.show, {id: this.currentPersonId, personPassword: this.password}, res => {
                    this.$set(this.tableData, this.currentPersonIndex, res);
                    this.passwordWindowStatus = false;
                }, this.resetPasswordWindow());
            },
            resetPasswordWindow(){
                this.password = "";
                this.passwordLoading = false;
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
            /**图片上传*/
            handleSuccess(res, file) {
                if (res.data.success) {
                    this.personForm.avatar = res.data.url;
                    this.$forceUpdate();
                    this.$Message.success("上传成功")
                }else {
                    this.$Message.error("上传失败")
                }
            },
            handleView() {
                this.avatarVisible = true;
            },
            handleRemove() {
                this.personForm.avatar = "";
                this.$forceUpdate();
            },

        }
    }
</script>

<style scoped>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>