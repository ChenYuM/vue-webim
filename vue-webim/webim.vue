<template>
    <app :user="user" :user-list="userList" :def-image="defImage" :cur-group-id="curGroupId" :user-groups="userGroups" :msg-list="groupMsgs" :handle-send-msg="handleSendMsg"
         :handleClose="handleCloseFun" :handleGroupSelect="handleGroupSelect">
    </app>
</template>
<script>
import Vue from 'vue'
import {client, stompClient} from '../../store/api'
import app from './src/components/app.vue';
export default {
    props: ['handleClose'],
    data () {
        return {
            defImage: '/public/images/defUserImage.jpg',
            userGroups: [],
            groupMsgs: [],
            curGroupId: -1,
            userList: [],
        };
    },
    mounted() {
        //注册webSocket监听器
        stompClient.register([
            {//接收到新消息
              route: '/topic/newChatMessage',
              callback: (message =>{
                let body = JSON.parse(message.body);
                //保存消息到数组中
                if(body.fromId != this.user.id){
                    this.handleReceiveMsg(body);
                }
              })
            },
        ], this.$store.state.auth.token);

        //获取组及聊天内容
        this.requestGroupInfo();
        
    },
    computed: {
        user(){
            return this.$store.getters.user;
        }
    },
    methods: {
        requestGroupInfo(){
            //获取组
            let groupids = this.$store.getters.user.groupids;
            if(!groupids || groupids.length <= 0)return;
            let ids = '';
            groupids.forEach((id, index) => {
                ids += id;
                if(index < groupids.length -1){
                    ids += ",";
                }
            });
            client({
                methods: "GET",
                url: "/api/groups/search/findByIdIn",
                params: {
                    ids: ids,
                    projection: "select",
                }
            })
            .then(resp=>{
                this.userGroups = resp.data._embedded.groups;
                if(this.userGroups.length > 0){
                    this.curGroupId = this.userGroups[0].id
                    this.requireGroupUsers(this.curGroupId);
                }
                //发送请求获取所有消息
                // /api/chatMessages/search/findByFromOrTo?fromId=1&toId=0&projection=select
                // /api/chatMessages/search/findByFromAndTo?fromId=1&toId=2&projection=select
                client({
                    method: "GET",
                    url: "/api/chatMessages/search/findByGroupIn",
                    params: {
                        'groupIds': ids,
                        projection: "select",
                        pageSize: 100,
                    }
                })
                .then(resp=>{
                    this.groupMsgs = resp.data._embedded.chatMessages;
                })
            });
        },
        //发送消息的钩子函数
        handleSendMsg(msg){
            //发送消息到后台
            let data = Object.assign({}, msg);
            data.fromId = msg.from.id;
            data.toId = msg.to.id;
            data.groupId = msg.group.id;
            delete data.from;
            delete data.to;
            delete data.group;
            client({
                method: "POST",
                url: "/api/chatMessages",
                data: data,
                headers: {'Content-Type': 'application/json'}
            });
        },
        //保存消息到消息数组中
        handleReceiveMsg(msg){
            msg.from = {id: msg.fromId};
            msg.to = {id: msg.toId};
            msg.group = {id: msg.groupId};
            this.groupMsgs.push(msg);
        },
        //点击关闭按钮的处理方法
        handleCloseFun(){
            if(this.handleClose){
                this.handleClose();
            }
        },
        //选择组的钩子
        handleGroupSelect(group){
            if(group){
                this.requireGroupUsers(group.id);
            }
        },
        //发送请求获取组中的所有用户
        requireGroupUsers(groupId){
            if(!groupId) return;
            client({
                method: "GET",
                url: "/api/persons/search/findByFixGroupId",
                params: {
                    groupId: groupId,
                    projection: 'select',
                }
            }).then(resp=>{
                this.userList = resp.data._embedded.persons;
            });
        },
    },
    components: {
        app
    }
};


</script>
<style>
*, *:before, *:after {
    box-sizing: border-box;
}
body, ul {
    margin: 0;
    padding: 0;
}
ul {
    list-style: none;
}
.icon-color{
    color: #696969;
}
#chat {
    width: 0;
    height: 0;
    min-width: 800px;
    min-height: 550px;
    margin: 20px auto;
}
</style>