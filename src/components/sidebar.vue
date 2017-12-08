<template>
	<div class="sidebar">
			<ul>
				<li><a class="active" href="javascript:;"><i class="el-icon-edit"></i><span>首页</span></a></li>
				<li><router-link to="/order"><i class="el-icon-share"></i><span>评论评论评论</span></router-link></li>
				<li><a href="#/order"><i class="el-icon-delete"></i><span>消息</span></a></li>
				<li><a href="javascript:;"><i class="el-icon-info"></i><span></span>企业</a></li>
				<li><a href="javascript:;"><i class="el-icon-d-caret"></i><span></span>个人</a></li>
			</ul>
			<ul>
				<li><a href="javascript:;"><i class="el-icon-goods"></i><span></span>讨论</a></li>
				<li><a href="javascript:;"><i class="el-icon-location"></i><span></span>收藏</a></li>
				<li><a href="javascript:;"><i class="el-icon-document"></i><span></span>帮助</a></li>
				<li><a href="javascript:;"><i class="el-icon-bell"></i><span></span>社区</a></li>
				<li><a href="javascript:;"><i class="el-icon-news"></i><span></span>FAQ</a></li>
			</ul>
		
		
	</div>
</template>

<script>
	export default {
		name: 'sidebar'
	}
</script>
<style scoped lang="scss">
	.sidebar{
		display: flex;
		flex-direction: column;
		width: 120px;
		transition: all .1s linear;
	}
	ul{
		list-style: none;
		border-top: 1px solid #f1f1f1;
   		padding: 6px 0;
   		margin: 0px;
   		&:first-child{
			border-top: none;
   		}
	}
	li{
		a{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #222;
			padding: 6px 0;
			line-height: 30px;
			height: 30px;
			text-align: center;
			text-decoration:none;
			vertical-align: baseline;
			&.active{
				color: #05a;
				font-size: 18px;
				font-weight: 600;
			}
		}
	}
</style>