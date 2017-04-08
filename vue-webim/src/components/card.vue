<template>
    <div class="m-card">
        <header>
            <img class="avatar" width="40" height="40" :alt="user.realname" :src="user.headImage ?`/api/files/${user.headImage}` :defImage">
            <p class="nowrap name">{{user.realname}}</p>
        </header>
        <!-- <footer>
            <input class="search" type="text" placeholder="search user..." v-model="search">
        </footer> -->
    </div>
</template>

<script>
    export default {
        props: ['user', 'defImage'],
    };
</script>

<style lang="less">
.m-card {
    padding: 12px;
    border-bottom: solid 1px #24272C;
    
    footer {
        margin-top: 10px;
    }
    
    .avatar, .name {
        vertical-align: middle;
    }
    .avatar {
        border-radius: 2px;
    }
    .name {
        display: inline-block;
        margin: 0 0 0 15px;
        font-size: 16px;
        max-width: calc(~'90% - 40px')
    }
    .search {
        padding: 0 10px;
        width: 100%;
        font-size: 12px;
        color: #fff;
        height: 30px;
        line-height: 30px;
        border: solid 1px #3a3a3a;
        border-radius: 4px;
        outline: none;
        background-color: #26292E;
    }
}
</style>