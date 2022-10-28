

<style lang="scss" scoped>
.Listbox{
    display: flex;
    justify-content: center;
    .contentbox{
      position: relative;
      z-index: 9;
      // height: 100vh;
      // overflow-y: auto;
      background: white;
      width: 80%;
      display: inline-block;
      height: fit-content;
    }
}
</style>

<template>
    <div class="Listbox">
        <div class="contentbox pd-10 mg-t-10"> 
            <div class="mg-b-10 f20" style="font-weight: 500;">小程序自定义tab踩坑</div>
            <div class="mg-b-10  pd-10" style="border-radius: 0px;background-color: #666666;color: aliceblue;">
                <p class="">场景：权限控制底部tab显示</p>
                <p class="mg-t-10">内容描述：在实现权限切换tab时，在custom-tab-bar文件内的生命周期attached中进行更改list列表或者状态参数，无法生效，对此问题进行了查阅与搜索，该问题曾在2020年被提出，至今仍未修复，最后通过在生命周期ready中或者页面中通过this.getTabBar().setData方法解决。</p>
                <p class="mg-t-10">代码参考如下：</p>
            </div>
            <code_view class="mg-b-10" code="if (typeof this.getTabBar === 'function' && this.getTabBar()) { 
    this.getTabBar().setData({ 
        identity: 'user'
    })
}"></code_view>
            <div class="mg-b-10 f14" style="color: #666666;">2022/10/25 • 微信小程序 </div>
        </div>
    </div>
</template>

<script setup>
import code_view from '../components/code.vue'
</script>