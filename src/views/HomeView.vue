
<style lang="scss" scoped>
#homeBox{
  .content{
    display: flex;
  }
  .show{
    position: relative;
    width: 100%;
    // height: 100%;
    height: calc(100vh - 60px);
    z-index: 2;
  }
  .frame{
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
<template>
  <div id="homeBox">
    <photoSphere :background="true"></photoSphere>
    <navT class=""></navT>
    <div class="content mg-t-10" style="flex-grow: 6;">
      <contentList class="mg-r-10 mg-l-10 W100" v-show="isShowContentList"></contentList>
      <div class="mg-r-10 mg-l-10 W100" v-show="isShowIframe">
        <iframe style="background-color: #eeeeee;" :src="iframeUrl" loading class="show frame" frameborder="0"></iframe>
      </div>
      <div class="mg-r-10 mg-l-10 W100" v-show="type == 'music'">
        <musicBox></musicBox>
      </div>
      <taskList class="mg-r-10 pc-only" style="flex-grow: 1;"></taskList>
    </div>
  </div>
</template>
<script setup>
  import photoSphere from '../components/photoSphere.vue'
  import contentList from '../components/contentList.vue'
  import navT from '../components/nav.vue'
  import taskList from '../components/taskList.vue'
  import musicBox from '../components/music.vue'
</script>
<script>
  export default {
    components: {
    },
    data () {
      return {
        type: this.$store.state.nav.type,
        iframeUrl:''
      }
    },
    computed:{
      isShowContentList(){
        let type = this.type
        return type == 'xcx' || type == 'game' || type == 'js'
      },
      isShowIframe(){
        let type = this.type
        switch (type) {
          case 'three':
            this.iframeUrl = "https://db-res.github.io/move/"
            break;
          default:
            break;
        }
        return type == 'three'
      },  
    },
    watch:{
        '$store.state.nav.type':{
            handler(n,o){
                this.type = n
                console.log(n);
            }
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