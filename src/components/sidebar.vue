<template>
  <nav class="sidebar">
    <div class="menu">
      <el-menu v-if="sidebars.length" :default-active="current" :router="true">
         <el-submenu v-for="item in sidebars" :key="item.index" :index="item.index">
           <template slot="title">
            <i></i>
            <span>{{item.name}}</span>
          </template>
           <el-menu-item v-for="$item in item.sub" :key="$item.index" :index="$item.index"
            :route="{path: $item.path, name: $item.route_name, params: $item.params}"
           >
            <span slot="title">{{$item.name}}</span>
          </el-menu-item>
         </el-submenu>
      </el-menu>
    </div>
  </nav>
</template>

<script>


export default {
  name: 'sidebar',
  props: ['sidebars'],
  computed: {
    current() {
      let menuIndex = this.$route.meta.menuIndex;
      console.log(menuIndex);
      return menuIndex;
    }
  }
}
</script>

<style scoped lang="scss">
@import '../theme/variable';

nav.sidebar {
  position: fixed;
  top: $topbar-height;
  bottom: 0;
  left: 0;
  width: $sidebar-width;
  background: $sidebar-bg;
  display: flex;
  flex-direction: column;
  .menu {
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    /deep/ .el-menu {
      border-right: none;
      background: transparent;
      &-item {
        padding: $sidebar-menu-item-padding !important;
        font-size: 12px;
        color: $sidebar-menu-item-font-color;
        height: $sidebar-menu-item-height;
        line-height: $sidebar-menu-item-height;
        background-color: $sidebar-menu-item-bg;
        &:hover,
        &:focus {
          background: #27384b;
        }
        &.is-active {
          background: $theme-color;
          color: #fff;
          i {
            color: $theme-color;
          }
        }
        a {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
    /deep/ .el-submenu {
      &__title {
        color: $sidebar-menu-item-font-color;
        height: $sidebar-menu-item-height;
        line-height: $sidebar-menu-item-height;
        &:hover,
        &:focus {
          background: #27384b;
        }
      }
    }
  }
}
</style>
