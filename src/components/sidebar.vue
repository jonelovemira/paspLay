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
        :route="{path: n.path}">
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
          :route="{path: sub.path}"
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
            :route="{path: subsub.path}"
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
            :route="{path: subsub.path}"
            :key="`${index}-${sub_index}-${subsub_index}`"
          >{{subsub.name}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
</template>

<script>
  /* group与sub互不嵌套 */
	export default {
		name: 'sidebar',
    props: ['sidebars'],
    computed: {

      activeIndex() {


        let getResultIndex = function(origin, postfix) {
          if (origin.length == 0) {
            return postfix;
          }
          return origin + '-' + postfix;
        };
        let searchActiveInNode = function(node, prefix) {

          for (let i = 0, l = node.length; i < l; i++) {
            let index = getResultIndex(prefix, i);
            if (node[i].active) {
              return index;
            }

            if (node[i].sub) {
              let newIndex = searchActiveInNode(node[i].sub, index);
              if (newIndex && newIndex != index) {
                return newIndex;
              }
            }

            if (node[i].group) {
              let newIndex = searchActiveInNode(node[i].group, index);
              if (newIndex && newIndex != index) {
                return newIndex;
              }
            }
          }
        };

        let activeIndex = searchActiveInNode(this.sidebars, '')
        console.log(activeIndex);
        return activeIndex;
      },
      hasMenu(){
          return this.sidebars.length > 0;
      }
    },
    methods: {
      handleSelect(key, keyPath){
          console.log(key, keyPath);
      }
    }
	}
</script>
