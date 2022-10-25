
<style lang="scss" scoped>
#homeBox{
  display: flex;
  // align-items: center;
  justify-content: center;
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
    background-color: #00000090;
  }
  .contentbox{
    position: relative;
    z-index: 9;
    // height: 100vh;
    // overflow-y: auto;
    background: white;
    width: 80%;
    display: inline-block;
  }
}
</style>
<template>
  <div id="homeBox">
    <div id="viewer"></div>
    <div class="mode"></div>
    <div class="contentbox pd-10 mg-t-20"> 
      <div class="mg-b-10 f20" style="font-weight: 500;">小程序自定义tab踩坑1</div>
      <div class="mg-b-10  pd-10" style="border-radius: 4px;background-color: #666666;color: aliceblue;">
        <p class="">场景：权限控制底部tab显示</p>
        <p class="mg-t-10">内容描述：在实现权限切换tab时，在custom-tab-bar文件内的生命周期attached中进行更改list列表或者状态参数，无法生效，对此问题进行了查阅与搜索，该问题曾在2020年被提出，至今仍未修复，最后通过在生命周期ready中或者页面中通过this.getTabBar().setData方法解决。</p>
        <p class="mg-t-10">代码参考：if (typeof this.getTabBar === 'function' && this.getTabBar()) { this.getTabBar().setData({ identity: 'user' }) }</p>
      </div>
      <div class="mg-b-10 f14" style="color: #666666;">2022/10/25 • 微信小程序 </div>
    </div>
  </div>
</template>

<script>
  import {Viewer} from 'photo-sphere-viewer'
  import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
  import sphere from '@/assets/image/sphere.jpg'
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
            panorama:sphere,
            // panorama:'https://photo-sphere-viewer-data.netlify.app/assets/sphere.jpg',
            size:{
                width: '100%',
                height: '100vh', 
            },
            autorotateDelay: 0,
            autorotateIdle: true,
            navbar:false,
            plugins:[],
        });
    },
    methods: {
      ready(){
        console.log(this.view)
      },
    },
  }
  </script>