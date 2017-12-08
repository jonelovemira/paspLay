<template>
	<div class="navbar">
		<div class="logo">
			<a href=""><img src="./../assets/logo.png"></a>
			<a>中国电信AEP平台</a>
		</div>
		<div class="menu">
			<el-menu
				v-if="hasMenu"
				:default-active="activeIndex"
				:router="true"
				class="el-menu-demo"
				mode="horizontal"
				@select="handleSelect"
				background-color="#545c64"
				text-color="#fff"
				active-text-color="#ffd04b"
			>
			  	<el-menu-item 
			  		v-if="!n.sub" 
			  		v-for="(n, index) in navs" 
			  		:index="''+index "  
			  		:key="index"
			  		:route="{path: n.path}">
			  		{{n.name}}
			    </el-menu-item>
			  	<el-submenu v-else  :index="`${index}`">
			  		<template slot="title">
			  			{{n.name}}
			  		</template>
			  		<el-menu-item 
			  			v-for="(sub, sub_index) in n.sub" 
			  			:route="{path: sub.path}"
			  			:index="`${index}-${sub_index}`" 
			  			:key="sub_index">
			  			{{sub.name}}
			  		</el-menu-item>
			  	</el-submenu>
			</el-menu>
		</div>
		<div class="profile">
			  
			<el-dropdown >
			  <span class="el-dropdown-link">
			  	<img src="./../assets/user.png">
			    小明就是我<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item>我的主页</el-dropdown-item>
			    <el-dropdown-item>我的订单</el-dropdown-item>
			    <el-dropdown-item divided>退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>	
	</div>	
				
				
			
</template>
<script>
	export default {
		name: 'navbar',
		props: ['navs'],
		computed:{
			activeIndex(){
				let index = '0';
				for(let i = 0, l = this.navs.length; i < l; i++){
					if(this.navs[i].active){
						index = `${i}`;
						break;
					}
					if(this.navs[i].sub){
						for(let j = 0, jLength = this.navs[i].sub.length; j < jLength; j++){
							if(this.navs[i].sub[j].active){
								index = `${i}-${j}`;
								break;
							}
						}
					}
				}
				return index;
			},
			hasMenu(){
				return this.navs.length > 0;
			}
		},
		data(){
			return {
				
			}
		},
		methods: {
			getIndex(...args){
				return args.join('-');
			},
			handleSelect(key, keyPath){
				console.log(key, keyPath);
			}
		}

	}
</script>
<style scoped lang="scss">
	.el-dropdown{
		&:hover{
			cursor: pointer;
			background-color: black;
		}
		color: #fff;
		height: 60px;
		line-height: 60px;
		img{
			margin-bottom: -5px;
		}
	}
	.navbar{
		display: flex;
		background-color: #545c64;
		color: #fff;
		width: 100%;
		height: 60px;
	}
	.logo{
		float: left;
		display:flex;
		justify-content: flex-start;
		align-items: center;
		width: 20%;	
			a{
			}
			a:last-child{
				
				padding-left: 15px;

			}
		}
	.menu{
		float: left;
	}	
	.profile{
		float: right;
		width: 10%;
		height: 100%;

	}
	
</style>