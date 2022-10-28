
<style lang="scss" scoped>
#homeBox{

}
</style>
<template>
  <div id="homeBox">
    <photoSphere :background="true"></photoSphere>
    
    <contentList></contentList>
  </div>
</template>
<script setup>
  import photoSphere from '../components/photoSphere.vue'
  import contentList from '../components/contentList.vue'
</script>
<script>
  export default {
    components: {
    },
    data () {
      return {
        
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