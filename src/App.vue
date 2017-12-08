<template>
  <div>
      <section class="el-container is-vertical" >
          <navbar :navs="navs"></navbar>
          <section class="el-container vertical-middle" >
              <sidebar></sidebar>
              <section class="el-container is-vertical">
                  <container></container>

              </section>
              
          </section>
          <al-footer></al-footer>
          
      </section>
  </div>
  
</template>

<script>
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import navbar from '@/components/navbar';
import sidebar from '@/components/sidebar';
import container from '@/components/container';
import alFooter from '@/components/al-footer';


Vue.use(ElementUI);
export default {
  name: 'app',
  props: ['navs'],
  
  components:{navbar, sidebar, container, alFooter}
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .is-vertical{
        flex-direction: column;
    }
    .vertical-middle{
        width: 1300px;
        margin: 0 auto;
    }

</style>
<style type="text/css">
    html,body{
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
</style>
