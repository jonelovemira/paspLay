<template>
    <el-container style="height:100%;">
        <el-header class="header-style">
            <navbar :navs="navs"></navbar>
        </el-header>
        <el-container direction="horizontal">
            <el-scrollbar wrap-style="overflow-x:hidden;" class="main-block width-100-percent limit-height">
                <el-container class="middle-block">
                    <el-aside class="my-aside" width="240px">
                        <el-scrollbar wrap-style="overflow-x:hidden;" style="height:100%;">
                            <sidebar :sidebars="sidebars"></sidebar>
                        </el-scrollbar>
                    </el-aside>
                    <el-main class="my-main">
                        <container></container>
                    </el-main>
                </el-container>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<script>

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navbar from './components/navbar';
import sidebar from './components/sidebar';
import container from './components/container';

Vue.use(ElementUI);
export default {
    name: 'app',
    props: ['navs', 'sidebars'],
    mounted(){
            
    },
    components:{container, navbar, sidebar}
}
</script>

<style scoped>

        .el-main {
            height: calc(100% - 80);
        }

        .middle-block {
            width: 1140px;
            padding: 0;
            margin: 0 auto;
        }

        .middle-block p {
            margin: 0 auto;
            color: #666;
            font-size: 12px;
        }

        .header-style {
            height: 60px;
            font-size: 12px;
            position: fixed;
            width: 100%;
        }

        .main-block {
            padding-top: 110px;
        }

        .el-menu {
            border-right: none;
        }

        .scrollbar-all {
            overflow-x:hidden;
        }

        .my-aside {
            position: fixed;
            width: 240px;
            top: 0;
            bottom: 0;
            margin-top: 60px;
            overflow: hidden;
            padding-top: 50px;
        }

        .my-main {
            padding-left: 270px;
            padding-top: 0px;
            padding-bottom: 100px;
        }

        .width-100-percent {
            width: 100%;
        }

        .limit-height {
            height: calc(100% - 60px);
        }

        .el-header {
            background: #fff;
            color: #333;
            line-height: 60px;
            box-shadow: 0 1px 3px 0 rgba(0,34,77,.1);
            z-index: 200;
        }
        
</style>
<style type="text/css">
    html,body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    body > div {
        height: 100%;
    }

    .el-submenu__title:hover {
        background-color: #fff!important;
        color: #409EFF;
    }

    .el-submenu__title:hover i {
        color: #409EFF;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background-color: #fff!important;
        color: #409EFF;
    }

    .el-menu .el-submenu__title{
        font-size: 16px;
    }

    .el-submenu .el-submenu__title {
        font-size: 14px;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
</style>


