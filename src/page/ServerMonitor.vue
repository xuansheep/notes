<template>
    <div class="serverMonitor-background">
        <Top active="serverMonitor"></Top>
        <div class="serverMonitor-content-div">
            <Row :gutter="16">
                <Col style="margin-bottom: 16px" class="release-col" span="6" v-for="(serverMonitor, index) in tableData">
                    <div @mouseover="overServerMonitor(serverMonitor, index)" @mouseleave="leaveServerMonitor(serverMonitor, index)">
                        <div @click="openUpdateWindow(serverMonitor)">
                            <Card style="cursor: pointer">
                                <p>{{serverMonitor.name}}</p>
                            </Card>
                        </div>
                        <div v-if="serverMonitor.hoverStatus"  class="serverMonitor-delete-icon" @click="deleteServerMonitor(serverMonitor)">
                            <Icon type="ios-close" size="20" />
                        </div>
                        <div :style="{color: statusDataDict[serverMonitor.status]}" class="serverMonitor-status-icon">
                            <Icon type="ios-radio-button-on" size="20" />
                        </div>
                    </div>
                </Col>
                <Col style="margin-bottom: 16px" span="6">
                    <div @click="openCreateWindow">
                        <Card style="cursor: pointer">
                            <Icon  style="color: #666666" type="ios-add" size="35" />
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>

        <Modal v-model="serverMonitorWindowStatus" title="服务监控" @on-ok="saveServerMonitor" @on-cancel="cancelServerMonitorWindow">
            <Form :model="serverMonitorForm" label-position="top">
                <FormItem label="名称">
                    <Input v-model="serverMonitorForm.name"></Input>
                </FormItem>
                <FormItem label="地址">
                  <Input v-model="serverMonitorForm.url"></Input>
                </FormItem>
                <FormItem label="分组">
                  <Input v-model="serverMonitorForm.groupId"></Input>
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
                    groupId: ''
                },
                tableData: [],
                serverMonitorWindowStatus: false,
                statusDataDict: {
                    'un_know': '#c5c8ce',
                    'active': '#19be6b',
                    'warn': '#ff9900',
                    'error': '#ed4014'
                },

                webSocket: null,
            }
        },
        created() {
            // this.pageLoad();
            this.initWebSocket();
        },
        destroyed: function (){
            this.webSocket.close();
        },
        methods: {
            pageLoad(){
                // this.getServerMonitorList();
            },
            getServerMonitorList() {
                this.http.post(this.ports.serverMonitor.list, this.form, res => {
                    this.tableData = res;
                });
            },
            getServerMonitorById(item) {
                this.http.post(this.ports.serverMonitor.detail, {id: item.id}, res => {
                    return res;
                });
            },
            openCreateWindow() {
                this.serverMonitorWindowStatus = true;
            },
            openUpdateWindow(item) {
                this.serverMonitorWindowStatus = true;
                this.serverMonitorForm = item;
            },
            cancelServerMonitorWindow() {
                this.serverMonitorWindowStatus = false;
                this.serverMonitorForm = {};
            },
            saveServerMonitor() {
                this.http.post(this.ports.serverMonitor.save, this.serverMonitorForm, res => {
                    this.serverMonitorWindowStatus = false;
                    this.serverMonitorForm = {};
                    this.getServerMonitorList();
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
                            this.getServerMonitorList();
                        })
                    },
                });
            },
            overServerMonitor(serverMonitor, index) {
                serverMonitor.hoverStatus = true;
                this.$set(this.tableData, index, serverMonitor);
            },
            leaveServerMonitor(serverMonitor, index) {
                serverMonitor.hoverStatus = false;
                this.$set(this.tableData, index, serverMonitor);
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