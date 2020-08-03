<template>
    <div>
        <Button @click="send(1)">发送</Button>
        <Button @click="reply">回复</Button>
    </div>
</template>

<script>
    export default {
        name: "Web",
        date() {
            return{
                webSocket: null,
            }
        },
        created() {
            this.initWebSocket();
        },
        destroyed() {
            this.webSocket.close() //离开路由之后断开webSocket连接
        },
        methods: {
            initWebSocket(){ //初始化webSocket
                const wsUri = "ws://localhost:10001/webSocket";
                this.webSocket = new WebSocket(wsUri);
                this.webSocket.onmessage = this.onMessage;
                this.webSocket.onopen = this.onOpen;
                this.webSocket.onerror = this.onError;
                this.webSocket.onclose = this.close;
            },
            onOpen(){ //连接建立之后执行send方法发送数据
                console.log('connection ok!');
                this.send('connection ok!');
            },
            onError(){//连接建立失败重连
                this.initWebSocket();
            },
            onMessage(e){ //数据接收
                console.log('get message：',e.data)
            },
            send(Data){//数据发送
                this.webSocket.send(Data);
            },
            close(e){  //关闭
                console.log('connection close!',e);
            },

            reply(){
                let params = {
                    message: '测试回复'
                };
                this.http.post(this.ports.chat.send, params, res => {

                });
            }
        },
    }
</script>

<style scoped>

</style>