<template>
  <div  style="width: 100%;">
    
  
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <first-child></first-child>
    <last-child></last-child>

  </div>  
</template>

<script>
import http from '@/api';

    export default {
        name: 'HelloWorld',
        mounted(){

            this.getData();
        },
        components:{
          'first-child': {
              name: 'first-child',
              template: '<div><button @click="send()">send</button></div>',
              methods: {
                  send(){
                      this.$bus.$emit('__msg', 'msg com from first-child')
                  }
              }
          },
          'last-child': {
              name: 'last-child',
              template: '<div>second -child</div>',
              mounted(){
                  this.$bus.$on('__msg', function(data){
                      console.log('last-child: I got msg ,data: ', data);
                  })
              }
          },
        },
        methods: {
            getData(){
              http.actions.cluster.list({
                clusterId: 'at2', 
                token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D',
                userId: 'duanyy'
              });
              
              
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
