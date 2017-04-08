<template>
    <div class="m-text">
        <textarea :readonly="groupId<=0" placeholder="按 Ctrl + Enter 发送" v-model="text" @keyup="inputing"></textarea>
        <div class="btn-group">
            <a class="btn btn-send" @click="sendMsg">发送</a>
        </div>
    </div>
</template>

<script>
import util from '../util.js'
    export default {
        props: ['user', 'groupId'],
        data () {
            return {
                text: ''
            };
        },
        methods: {
            inputing (e) {
                if (e.ctrlKey && e.keyCode === 13 && this.text.length) {
                    this.sendMessage();
                }
            },
            sendMsg(){
                if (this.text.length) {
                    this.sendMessage();
                }
            },
            sendMessage(){
                if(this.groupId <= 0){
                    return;
                }
                let msg = {};
                msg.message = this.text;
                msg.group = {id: this.groupId};
                msg.from = {id: this.user.id};
                msg.to = {};
                msg.date = new Date();
                this.$parent.msgList.push(msg);

                if(this.$parent.handleSendMsg){
                    this.$parent.handleSendMsg(msg);
                }
                this.text = '';
            }
        }
    };
</script>

<style lang="less">
    .m-text {
        height: 160px;
        border-top: 1px solid #ddd;
        
        textarea {
            padding: 10px;
            height: calc(~"100% - 40px");
            width: 100%;
            border: none;
            outline: none;
            font-family: "Micrsofot Yahei";
            resize: none;
        }
        .btn-group{
            height: 40px;
            .btn-send{
                right: 10px;
                position: absolute;
                &:hover{
                    color: white;
                    background-color: #0eb83a;
                }
            }
        }
    }
</style>