
<style lang="scss" scoped>
#homeBox{
  .content{
    display: flex;
  }
}
</style>
<template>
  <div id="homeBox">
    <photoSphere :background="true"></photoSphere>
    <navT></navT>
    <div class="content mg-t-10">
      <contentList class="mg-r-10 mg-l-10" style="flex-grow: 6;"></contentList>
      <taskList class="mg-r-10" style="flex-grow: 1;"></taskList>
    </div>
  </div>
</template>
<script setup>
  import photoSphere from '../components/photoSphere.vue'
  import contentList from '../components/contentList.vue'
  import navT from '../components/nav.vue'
  import taskList from '../components/taskList.vue'
</script>
<script>
  export default {
    components: {
    },
    data () {
      return {
        
      }
    },
    created(){
      let search = location.search.split('?'),obj={}
      search.map(item=>{
        let i = item&&item.split('=')
        if(i){
          obj[i[0]] = i[1]
        }
      })
      console.log(obj);
      if(obj.type){
        this.$store.commit('updateNtype',obj.type)
      }
    },  
    mounted() {

    },
    methods: {
      ready() {
        
      },
    },
  }
  </script>