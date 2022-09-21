
<style>
  #viewer{}
</style>
<template>
  <div id="homeBox">
    <div id="viewer"></div>
  </div>
</template>

<script>
  import {Viewer} from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  // import sphere from '@/assets/image/sphere.jpg'
  // import s300 from '@/assets/image/300.jpg'
  export default {
    data () {
      return {
        view:null
      }
    },
    mounted(){
        let that = this
        this.view = new Viewer({
            container:document.querySelector('#viewer'),
            // panorama:sphere,
            panorama:'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
            size:{
                width: '100%',
                height: '100vh', 
            },
            autorotateDelay: 0,
            autorotateIdle: true,
        });
    },
    methods: {
      ready(){
        console.log(this.view)
      },
    },
  }
  </script>