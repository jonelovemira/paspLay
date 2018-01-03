<template>
  <div  style="width: 100%;">
    
  
    
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>1</div>
    <div>
      <router-link :to="{name: 'cluster'}">我要去cluster</router-link> <br>
      <router-link :to="{name: 'datacenter'}">我要去datacenter</router-link> <br>
      <router-link :to="{name: 'log'}">我要去log</router-link> <br>
    </div>

    <first-child></first-child>
    <second-child></second-child>

  </div>  
</template>

<script>
    import FirstChild from './FirstChild';
    import SecondChild from './SecondChild';

    export default {
        name: 'HelloWorld',
        mounted(){
            this.getData();
        },
        components:{
          FirstChild,
          SecondChild
        },
        methods: {
            getData(){

              this._$http.cluster.list({
                clusterId: 'at2', 
                token: 'jKhum9rBRkiZAVEYdtHJVIliDILBZ8nCRhP7201XL7U%3D',
                userId: 'duanyy'
              }).then(data => {
                console.log('I got data: ', data);
              });
              
              
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
