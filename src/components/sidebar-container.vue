<template>
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
</template>
 
<script>

import sidebar from './sidebar';
import container from './container';

export default {
    name: 'sidebar-container',
    props: ['sidebars'],
    components: {sidebar, container}
}
    
</script>

<style scoped>
    .middle-block {
        width: 1140px;
        padding: 0;
        margin: 0 auto;
    }

    .el-menu {
        border-right: none;
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
        padding: 0 0 100px 270px;
    }
</style>

<style type="text/css">
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
</style>