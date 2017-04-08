<template>
    <div id="chat">
        <div class="sidebar">
            <card :user="user" :def-image="defImage"></card>
            <list :group-list="userGroups" :group-id="groupId" :handle-group-select="handleGroupSelect"></list>
        </div>
        <div class="rightBox">
            <div class="topBox">
                <top :cur-group="curGroup" :handle-close="handleClose"></top>
            </div>
            <div class="bottomBox">
                <div class="mainBox">
                    <message :def-image="defImage" :user="user" :user-list="userList" :msg-list="messages"></message> 
                    <input_text :user="user" :group-id="groupId"></input_text>
                </div>
                <div class="rightSidebar">
                    <users :user-list="userList" :def-image="defImage"></users>
                    <attachments></attachments>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import store from '../store';
    import card from './card.vue';
    import list from './list.vue';
    import top from './top.vue';
    import input_text from './text.vue';
    import message from './message.vue';
    import users from './users.vue';
    import attachments from './attachments.vue';

    export default {
        props: [
                'user', 'userList', 'defImage', 'curGroupId', 'userGroups', 'msgList', 'handleSendMsg', 
                'handleClose', 'handleGroupSelect',
        ],
        data () {
            return {
                // 搜索key
                // search: '',
                groupId: this.curGroupId || -1,
            };
        },
        computed: {
            curGroup (){
                return this.userGroups && this.userGroups.filter(item=>item.id == this.groupId)[0];
            },
            // userList () {
            //     if(this.userGroups){
            //         let group = this.userGroups.filter(item=>item.id == this.groupId);
            //         return group[0] && group[0].persons;
            //     }
            // },
            //筛选当前组的消息
            messages(){
                if(this.msgList && this.msgList.length > 0){
                    return this.msgList.filter(item=>item.group.id == this.groupId)
                }
            },
        },
        watch: {
            curGroupId(val){
                this.groupId = val;
            },
        },
        methods:{
        },
        components: {
            card, list, input_text, message, users, attachments, top
        }
    };

</script>

<style lang="less">
#chat {
    overflow: hidden;
    border-radius: 3px;
    box-shadow: 0 0 6px #666;

    .nowrap{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .sidebar, .main {
        height: 100%;   
    }
    .sidebar {
        float: left;
        width: 180px;
        color: #f4f4f4;
        background-color: #2e3238;
        border-right: 1px solid #1b1b1b;
    }
    .rightBox {
        float: left;
        width: calc(~'100% - 180px');
        height: 100%;
        padding: 8px 10px;
        background: #2e3238;
        border-left: 1px solid #585555;
        .topBox{
            width: 100%;
            height: 40px;
            background: #eee;
            border-bottom: 1px solid #ccc;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
        }
        .bottomBox{
            width: 100%;
            height: calc(~"100% - 40px");
            .mainBox {
                width: calc(~'100% - 170px');
                height: 100%;
                position: relative;
                overflow: hidden;   
                background-color: #eee;
                float: left;
                border-bottom-left-radius: 3px;
            }
            .m-text {
                position: absolute;
                width: 100%;
                bottom: 0;
                left: 0;
                background: #fff;
            }
            .m-message {
                position: absolute;
                min-width: 100%;
                height: ~'calc(100% - 160px)';
                .main{
                    width: 100%;
                }
            }
            .rightSidebar{
                width: 170px;
                height: 100%;
                float: left;
                overflow: hidden;
                background: #fff;
                border-left: 1px solid #bdbdbd;
                border-bottom-right-radius: 3px;
                .box-title{
                    margin: 0;
                    padding: 10px 14px;
                    border-bottom: 1px solid #bdbdbd;
                }
                .users-box{
                    height: 60%;
                }
                .attachments-box{
                    height: 40%;
                }
            }
        }
    }
}
</style>