
<style lang="scss" scoped>
    #viewer{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100vh;
    }
    .mode{
      position: fixed;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: linear-gradient(to left, rgba(123, 255, 123, 0), rgba(255, 81, 133, 0.5));
      animation: lg-an 18s linear infinite;
    }

    @keyframes lg-an{
      0%{background-color: rgb(121, 255, 226);}
      20%{background-color: rgb(255, 148, 116);}
      40%{background-color: rgb(255, 253, 119);}
      60%{background-color: rgb(121, 255, 132);}
      80%{background-color: rgb(128, 172, 255);}
      100%{background-color: rgb(121, 255, 226);}
    }
</style>
<template>
    <div>
        <div id="viewer"></div>
        <div class="mode" v-if="background"></div>
    </div>
</template>

<script>
  import {Viewer} from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  import sphere from '@/assets/image/sphere.jpg'
  import s300 from '@/assets/image/300.jpg'

  function init1(params) {
    return {
        container:document.querySelector('#viewer'),
        panorama:s300,
        // panorama:'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
        size:{
            width: '100%',
            height: '100vh', 
        },
        autorotateDelay: 0,
        autorotateIdle: true,
        navbar:false,
        plugins:[],
    }
  }
  function init2(params) {
    return {
        container:document.querySelector('#viewer'),
        panorama:sphere,
        // panorama:'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
        size:{
            width: '100%',
            height: '100vh', 
        },
        autorotateDelay: 0,
        autorotateIdle: true,
    }
  }

  export default {
    props:['background'],
    components: {
    },
    data () {
      return {
        view:null
      }
    },
    mounted(){
        let that = this,data = this.background?new init1():new init2()
        // this.view = new Viewer(data);
    },
    methods: {
      ready(){
        console.log(this.view)
      },
    },
  }
</script>