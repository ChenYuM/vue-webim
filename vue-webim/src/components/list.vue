<template>
    <div class="m-list">
        <ul>
            <li v-for="item in groupList" :class="{ active: groupId === item.id }" @click="select(item)">
                <!-- <img class="avatar"  width="30" height="30" :alt="item.name" :src="item.img"> -->
                <span class="icon-users"></span>
                <p class="nowrap name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import util from '../util.js'
export default {
    props: ['groupList', 'groupId', 'search', 'handleGroupSelect'],
    methods: {
        //群组List的点击的方法
        select (value) {
            // 更改当前组的index
            this.$parent.groupId = value.id;
            if(this.handleGroupSelect){
                this.handleGroupSelect(this.$parent.curGroup);
            }
        }
    },
    filters: {
        search (list) {
            return list.filter(item => item.name.indexOf(this.search) > -1);
        }
    }
};
</script>

<style lang="less">
    .m-list {
        border-top: 1px solid #636363;
        li {
            padding: 12px 15px;
            border-bottom: 1px solid #292C33;
            cursor: pointer;
            transition: background-color .1s;
            
            &:hover {
                background-color: rgba(255, 255, 255, 0.03);
            }
            &.active {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
        .avatar, .name {
            vertical-align: middle;
        }
        .avatar {
            border-radius: 2px;
        }
        .name {
            display: inline-block;
            margin: 0 0 0 5px;
            max-width: 80%;
        }
    }
</style>