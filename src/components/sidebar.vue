<template>
    <el-menu
        v-if="hasMenu"
        :default-active="activeIndex"
        :router="true"
        @select="handleSelect">
        <el-menu-item
            v-for="(n, index) in sidebars"
            v-if="!n.sub"
            :index="'' + index"
            :key="index"
            :route="{path: n.path, name: n.route_name, params: n.params}">
            {{n.name}}
        ></el-menu-item>
        <el-submenu
            v-else
            :index="'' + index"
        >
            <template slot="title">
                {{n.name}}
            </template>
            <el-menu-item
                v-for="(sub, sub_index) in n.sub"
                v-if="!sub.sub && !sub.group"
                :route="{path: sub.path,name: sub.route_name, params: sub.params}"
                :index="`${index}-${sub_index}`"
                :key="`${index}-${sub_index}`">
                {{sub.name}}
            </el-menu-item>
            <el-menu-item-group 
                v-for="(sub, sub_index) in n.sub"
                v-if="sub.group"
                :key="`${index}-${sub_index}`">
                <template slot="title">{{sub.name}}</template>
                <el-menu-item
                    v-for="(subsub, subsub_index) in sub.group"
                    :index="`${index}-${sub_index}-${subsub_index}`"
                    :route="{path: subsub.path,name: subsub.route_name, params: subsub.params}"
                    :key="`${index}-${sub_index}-${subsub_index}`"
                >{{subsub.name}}</el-menu-item>
            </el-menu-item-group>
            <el-submenu
                v-for="(sub, sub_index) in n.sub"
                v-if="sub.sub"
                :index="`${index}-${sub_index}`"
                :key="`${index}-${sub_index}`"
            >
                <template slot="title">
                    {{sub.name}}
                </template>
                <el-menu-item
                    v-for="(subsub, subsub_index) in sub.sub"
                    :index="`${index}-${sub_index}-${subsub_index}`"
                    :route="{path: subsub.path,name: subsub.route_name, params: subsub.params}"
                    :key="`${index}-${sub_index}-${subsub_index}`"
                >{{subsub.name}}</el-menu-item>
            </el-submenu>
        </el-submenu>
    </el-menu>
</template>

<script>
    /* 第一层只有sub，然后第二级只有item，group，sub三种，第二级的group和sub里面只能是item 
        active先判断当前路由，如果没有找到则使用配置项中的active=true项。
    */
    export default {
        name: 'sidebar',
        props: ['sidebars'],
        computed: {
            activeIndex() {
                let currentPath = this.$route.path;

                let getResultIndex = function(origin, postfix) {
                    if (origin.length == 0) {
                        return postfix + '';
                    }
                    return origin + '-' + postfix;
                };
                let searchActiveInNode = function(node, prefix, checkActive) {

                    for (let i = 0, l = node.length; i < l; i++) {
                        let index = getResultIndex(prefix, i);
                        if (checkActive(node[i])) {
                            return index;
                        }

                        if (node[i].sub) {
                            let newIndex = searchActiveInNode(node[i].sub, index, checkActive);
                            if (newIndex && newIndex != index) {
                                return newIndex;
                            }
                        }

                        if (node[i].group) {
                            let newIndex = searchActiveInNode(node[i].group, index, checkActive);
                            if (newIndex && newIndex != index) {
                                return newIndex;
                            }
                        }
                    }
                };

                let checkActiveByFlag = function (node) {
                    if (node && node.active) {
                        return true;
                    }
                    return false;
                }

                let activeIndex = searchActiveInNode(this.sidebars, '', this.checkActiveByPath);
                if (!activeIndex) {
                    activeIndex = searchActiveInNode(this.sidebars, '', checkActiveByFlag);
                }
                return activeIndex;
            },
            hasMenu(){
                return this.sidebars.length > 0;
            }
        },
        methods: {
            handleSelect(key, keyPath){
                // console.log(key, keyPath);
            },
            checkActiveByPath(node) {
                let result = false;

                if (node.path || node.router_name) {
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
