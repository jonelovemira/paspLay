<template>
    <div>
        <topbar></topbar>
        <sidebar></sidebar>
        <container></container>
    </div>
</template>

<script>

import Vue from 'vue';
import ElementUI from 'element-ui';

import sidebar from '@/components/sidebar';
import container from '@/components/container';

import header from 'aep-portalweb/src/base/components/page-header'

Vue.use(ElementUI);


export default {
    name: 'app',
    props: ['navs'],
    components:{topbar: header, sidebar, container}
}
</script>

<style scoped>

    .middle-block {
        width: 1140px;
        padding: 0;
        margin: 0 auto;
    }

    .header-style {
        height: 60px;
        font-size: 12px;
        position: fixed;
        width: 100%;
    }

    .main-block {
        margin-top: 110px;
    }

    .scrollbar-all {
        overflow-x:hidden;
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

    .spec-container {
        position: absolute;
        width: 100%;
        height: 100%;
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

    body > div:first-of-type {
        height: 100%;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
</style>


