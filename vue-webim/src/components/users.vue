<template>
<section class="users-box">
	<p class="box-title"><i class="icon-color icon-users"></i> 群组用户</p>
	<div class="users-list">
		<ul v-if="userList && userList.length > 0">
			<li v-for="user in userList">
				<img :src="user.headImage ?`/api/files/${user.headImage}` :defImage" width="30" height="30" />
				<span class="nowrap user-name">{{user.username}}</span>
			</li>
		</ul>
	</div>
</section>
</template>

<script>
import Vue from 'vue'
    export default {
        props: ['userList', 'defImage'],
        methods: {
        },
    };
</script>


<style lang="less">
.users-box{
	.users-list{
		height: calc(~'100% - 40px');
		overflow-x: hidden;
		ul li{
			height: 40px;
			padding: 5px 10px;
			border-bottom: 1px solid #eee;
			&:hover{
				cursor: pointer;
				background-color: #FCFCD8;
			}
			img{
				border-radius: 50%;
			}
			.user-name{
				padding-left: 8px;
			    position: relative;
			    line-height: 30px;
			    font-size: 12px;
			    max-width: calc(100% - 30px);
			    display: inline-block;
			}
		}
	}
}
</style>