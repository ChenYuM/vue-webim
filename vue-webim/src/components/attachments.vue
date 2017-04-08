<template>
<section class="attachments-box">
	<p class="box-title"><i class="icon-color icon-box-add"></i> 用户附件</p>
	<div class="attachments-list">
		<ul>
			<li v-for="item in []">
				<span class="nowrap attachments-name">附件名称</span>
			</li>
		</ul>
	</div>
</section>
</template>

<script>
</script>

<style lang="less">
.attachments-box{
	box-shadow: 0 0 1px #333;
	.attachments-list{
		height: calc(~'100% - 40px');
		overflow-x: hidden;
		ul li{
			height: 40px;
			padding: 5px 10px;
			border-bottom: 1px solid #eee;
			&:hover{
				cursor: pointer;
				.attachments-name{
					text-decoration: underline;
				}
			}
			.attachments-name{
				top: 8px;
				position: relative;
				font-size: 12px;
				display: inline-block;
				max-width: 100%;
			}
		}
	}
}
</style>