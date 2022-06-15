<template>
    <div class="serverMonitor-background">
        <Top active="serverMonitor"></Top>
        <div class="serverMonitorGroup-opt">
            <span type="text" class="serverMonitorGroup-opt-add" @click="openGroupCreateWindow">新增分组</span>
        </div>
        <div class="serverMonitor-content-div">
            <div v-for="(group, gIndex) in tableData">
                <div class="serverMonitorGroup-name">
                    <span style="font-size: 24px; font-weight: bold">{{group.name}}</span>
                    <div class="serverMonitorGroup-setting-icon" @click="openGroupUpdateWindow(group)">
                        <Icon size="16" type="ios-options" />
                    </div>
                    <div class="serverMonitorGroup-delete-icon" @click="deleteServerMonitorGroup(group)">
                        <Icon size="16" type="ios-trash" />
                    </div>
                </div>
                <Row :gutter="16">
                    <Col style="margin-bottom: 16px" class="release-col" span="4" v-for="(serverMonitor, index) in group.serverMonitorList">
                        <div @mouseover="overServerMonitor(group, gIndex, serverMonitor, index)" @mouseleave="leaveServerMonitor(group, gIndex, serverMonitor, index)">
                            <div @click="openUpdateWindow(serverMonitor)">
                                <Card style="cursor: pointer">
                                    <p>{{serverMonitor.name}}</p>
                                </Card>
                            </div>
                            <div v-if="serverMonitor.hoverStatus" class="serverMonitor-delete-icon" @click="deleteServerMonitor(serverMonitor)">
                                <Icon type="ios-close" size="20"/>
                            </div>
                            <div :style="{color: statusDataDict[serverMonitor.status]}" class="serverMonitor-status-icon">
                                <Icon type="ios-radio-button-on" size="20"/>
                            </div>
                        </div>
                    </Col>
                    <Col style="margin-bottom: 16px" span="4">
                        <div @click="openCreateWindow(group.id)">
                            <Card style="cursor: pointer">
                                <Icon style="color: #666666" type="ios-add" size="35"/>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

        <Modal v-model="serverMonitorWindowStatus" title="服务监控" @on-ok="saveServerMonitor" @on-cancel="cancelServerMonitorWindow">
            <Form :model="serverMonitorForm" label-position="top">
                <FormItem label="名称">
                    <Input v-model="serverMonitorForm.name"></Input>
                </FormItem>
                <FormItem label="地址">
                    <Input v-model="serverMonitorForm.url"></Input>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber style="width: 100%" v-model="serverMonitorForm.sort"></InputNumber>
                </FormItem>
                <FormItem label="分组">
                    <Select v-model="serverMonitorForm.groupId">
                        <Option v-for="group in serverMonitorGroupList" :value="group.id" :key="group.id">
                            {{group.name}}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
        <Modal v-model="serverMonitorGroupWindowStatus" title="服务监控分组" @on-ok="saveServerMonitorGroup" @on-cancel="cancelServerMonitorGroupWindow">
            <Form :model="serverMonitorGroupForm" label-position="top">
                <FormItem label="名称">
                    <Input v-model="serverMonitorGroupForm.name"></Input>
                </FormItem>
                <FormItem label="排序">
                    <InputNumber style="width: 100%" v-model="serverMonitorGroupForm.sort"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>

    import '../assets/css/serverMonitor.css'
    import Top from "../components/custom/Top";

    export default {
        name: "ServerMonitor",
        components: {Top},
        data() {
            return{
                form:{
                    page:1,
                    size:1000
                },
                serverMonitorForm: {
                    name: '',
                    url: '',
                    sort: 0,
                    groupId: ''
                },
                serverMonitorGroupForm: {
                    name: '',
                    sort: 0
                },
                tableData: [],
                serverMonitorWindowStatus: false,
                serverMonitorGroupWindowStatus: false,
                statusDataDict: {
                    'un_know': '#c5c8ce',
                    'active': '#19be6b',
                    'warn': '#ff9900',
                    'error': '#ed4014'
                },
                serverMonitorGroupList: [],

                webSocket: null,
            }
        },
        created() {
            // this.pageLoad();
            this.initWebSocket();
            this.getServerMonitorGroupList();
        },
        destroyed: function (){
            this.webSocket.close();
        },
        methods: {
            pageLoad(){
                // this.getServerMonitorIndex();
            },
            getServerMonitorIndex() {
                this.http.post(this.ports.serverMonitor.index, this.form, res => {
                    this.tableData = res;
                });
            },
            getServerMonitorById(item) {
                this.http.post(this.ports.serverMonitor.detail, {id: item.id}, res => {
                    return res;
                });
            },
            openCreateWindow(groupId) {
                this.serverMonitorWindowStatus = true;
                this.serverMonitorForm.groupId = groupId;
            },
            openUpdateWindow(item) {
                this.serverMonitorWindowStatus = true;
                this.serverMonitorForm = {...item};
            },
            cancelServerMonitorWindow() {
                this.serverMonitorWindowStatus = false;
                this.serverMonitorForm = {};
            },
            saveServerMonitor() {
                this.http.post(this.ports.serverMonitor.save, this.serverMonitorForm, res => {
                    this.serverMonitorWindowStatus = false;
                    this.serverMonitorForm = {};
                    this.getServerMonitorIndex();
                    this.$Message.success('保存成功');
                });
            },
            deleteServerMonitor(item) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确定要删除服务监控吗？',
                    onOk: () => {
                        this.http.post(this.ports.serverMonitor.delete, {id: item.id}, res => {
                            this.$Message.success('删除成功');
                            this.getServerMonitorIndex();
                        })
                    },
                });
            },
            overServerMonitor(group, groupIndex, serverMonitor, index) {
                serverMonitor.hoverStatus = true;
                this.$set(group, index, serverMonitor);
                this.$set(this.tableData, groupIndex, group);
            },
            leaveServerMonitor(group, groupIndex, serverMonitor, index) {
                serverMonitor.hoverStatus = false;
                this.$set(group, index, serverMonitor);
                this.$set(this.tableData, groupIndex, group);
            },

            /**group*/
            getServerMonitorGroupList() {
                let params = {};
                this.http.post(this.ports.serverMonitor.group.list, params, res => {
                    this.serverMonitorGroupList = res;
                });
            },
            openGroupCreateWindow() {
                this.serverMonitorGroupWindowStatus = true;
            },
            openGroupUpdateWindow(item) {
                this.serverMonitorGroupWindowStatus = true;
                this.serverMonitorGroupForm = {...item};
            },
            cancelServerMonitorGroupWindow() {
                this.serverMonitorGroupWindowStatus = false;
                this.serverMonitorGroupForm = {};
            },
            saveServerMonitorGroup() {
                this.http.post(this.ports.serverMonitor.group.save, this.serverMonitorGroupForm, res => {
                    this.serverMonitorGroupWindowStatus = false;
                    this.serverMonitorGroupForm = {};
                    this.getServerMonitorIndex();
                    this.getServerMonitorGroupList();
                    this.$Message.success('保存成功');
                });
            },
            deleteServerMonitorGroup(item) {
                this.$Modal.confirm({
                    title: '删除',
                    content: '确定要删除服务监控分组吗？',
                    onOk: () => {
                        this.http.post(this.ports.serverMonitor.group.delete, {id: item.id}, res => {
                            this.$Message.success('删除成功');
                            this.getServerMonitorIndex();
                            this.getServerMonitorGroupList();
                        })
                    },
                });
            },

            /**webSocket*/
            initWebSocket(){ //初始化weosocket
                let userId = this.store.get('userId');
                console.log("userId", userId)
                if (!!userId) {
                    let url = this.http.webSocketUrl + this.ports.webSocket.serverMonitor + "/" + userId;
                    console.log("url:", url);
                    this.webSocket = new WebSocket(url);
                    this.webSocket.onmessage = this.webSocketOnMessage;
                    this.webSocket.onopen = this.webSocketOnOpen;
                    this.webSocket.onerror = this.webSocketOnError;
                    this.webSocket.onclose = this.webSocketClose;
                } else {
                    this.$Message.error('未获取到用户信息');
                }
            },
            webSocketOnOpen(){ //连接建立之后执行send方法发送数据
                this.webSocketSend(JSON.stringify(this.form));
            },
            webSocketOnError(){//连接建立失败重连
                this.initWebSocket();
            },
            webSocketOnMessage(e){ //数据接收
                let res = JSON.parse(e.data);
                if (res.code !== 200) {
                    this.$Message.error(res.message);
                    return;
                }
                this.tableData = res.data;
            },
            webSocketSend(data){//数据发送
                this.webSocket.send(data);
            },
            webSocketClose(e){  //关闭
                console.log('断开连接',e);
            },
        }
    }
</script>

<style scoped>

</style>