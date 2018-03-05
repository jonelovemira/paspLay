<template>
    <div class="full-body">
        <topbar></topbar>
        <el-scrollbar wrap-style="overflow-x:hidden;" class="main-block width-100-percent limit-height">
            <div class="middle-block">
                <router-view></router-view>
            </div>
        </el-scrollbar>
    </div>
</template>

<script>

import Vue from 'vue';
import ElementUI from 'element-ui';
import sidebarContainer from './components/sidebar-container';
import header from 'aep-portalweb/src/base/components/page-header';
import privilegeSingle from './components/privilege/privilege-single.vue';
import privilegeMenu from './components/privilege/privilege-menu.vue';

Vue.component('sidebar-container', sidebarContainer);

Vue.use(ElementUI);

//权限插件
Vue.component('privilege-single', privilegeSingle);
Vue.component('privilege-menu', privilegeMenu);


export default {
    name: 'app',
    components:{topbar: header}
}
</script>

<style scoped lang="scss">
@import './theme/variable';

    .middle-block {
        width: 1140px;
        padding: 0;
        margin: 0 auto;
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

    .full-body {
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


