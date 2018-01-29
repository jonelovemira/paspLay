<template>
                
    <div class="middle-block">
        <img src="../assets/telecom.png" width="50" style="float:left; margin-top:8px; margin-right:5px">
        <span class="title-logo">中国电信AEP平台</span>
        <div style="float:right;">
            <el-dropdown>
                <span class="el-dropdown-link">
                    个人中心<i class="el-icon-location-outline el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>我的主页</el-dropdown-item>
                    <el-dropdown-item>我的订单</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div style="width:500px; float:right;">
            <el-menu 
                v-if="hasMenu"
                :default-active="activeIndex"
                :router="true"
                class="el-menu-demo"
                mode="horizontal">
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
        
        
    </div>      
            
</template>
<script>
    export default {
        name: 'navbar',
        props: ['navs'],
        computed:{
            activeIndex(){
                let activeResult, currentPath = this.$route.path;

                let findActive = function (checkActiveFunc) {
                    let index;
                    for(let i = 0, l = this.navs.length; i < l; i++){
                        if(!this.navs[i].sub && checkActiveFunc(this.navs[i])){
                            index = `${i}`;
                            break;
                        }
                        if(this.navs[i].sub){
                            for(let j = 0, jLength = this.navs[i].sub.length; j < jLength; j++){
                                if(checkActiveFunc(this.navs[i].sub[j])){
                                    index = `${i}-${j}`;
                                    break;
                                }
                            }
                        }
                    }
                    return index;
                }

                let checkActiveByFlag = function (node) {
                    if (node && node.active) {
                        return true;
                    }
                    return false;
                };

                activeResult = findActive.call(this, this.checkActiveByPath);

                if (!activeResult) {
                    activeResult = findActive.call(this, checkActiveByFlag);
                }

                return activeResult;
            },
            hasMenu(){
                return this.navs.length > 0;
            }
        },
        methods: {
            getIndex(...args){
                return args.join('-');
            },
            checkActiveByPath(node) {
                let result = false;

                if (node.path || node.route_name) {
                    let routeNode = {
                        name: node.route_name,
                        path: node.path,
                        params: node.params
                    };

                    let route = this.$router.resolve(routeNode);

                    if (route && route.route) {
                        if (this.$route.name) {
                            result = route.route.name == this.$route.name;
                        } else {
                            result = route.route.path == this.$route.path;
                        }
                    }

                };

                return result;
                
            }
        }
    }
</script>
<style scoped lang="css">


    .title-logo {
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: #409EFF;
    }

    .el-menu-demo:child {
        float: right;
    }

    .el-menu {
        z-index: 10;
    }
</style>