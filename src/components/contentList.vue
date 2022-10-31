

<style lang="scss" scoped>
.Listbox{
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    .contentbox{
      position: relative;
      z-index: 9;
      // height: 100vh;
      // overflow-y: auto;
      background: white;
      width: 100%;
      display: inline-block;
      height: fit-content;
    }
}
</style>

<template>
    <div class="Listbox">
        <div class="contentbox pd-10 mg-b-10"  v-for="item in list" :style="{'display':type == item.type?'block':'none'}" :key="item.id"> 
            <div class="mg-b-10 f20" style="font-weight: 500;">{{item.title}}</div>
            <div class="mg-b-10  pd-10" style="border-radius: 0px;background-color: #666666;color: aliceblue;">
                <p class="">场景：{{item.scenes}}</p>
                <p class="mg-t-10">内容描述：{{item.content}}</p>
                <p class="mg-t-10">代码参考如下：</p>
            </div>
            <code_view class="mg-b-10" :code="item.code[0]"></code_view>
            <div class="mg-b-10 f14" style="color: #666666;">{{item.createTime}} • <span v-for=" (i, j) in item.tab" :key="j">{{i}}</span> </div>
        </div>
    </div>
</template>

<script setup>
import code_view from '../components/code.vue';
</script>
<script>
export default {
    data(){
        return {
            type:'',
            list:[
                {
                    id:1,
                    title:'小程序自定义tab踩坑',
                    scenes:'权限控制底部tab显示',
                    content:`在实现权限切换tab时，在custom-tab-bar文件内的生命周期attached中进行更改list列表或者状态参数，无法生效，
                            对此问题进行了查阅与搜索，该问题曾在2020年被提出，至今仍未修复，
                            最后通过在生命周期ready中或者页面中通过this.getTabBar().setData方法解决。`,
                    code:[`if (typeof this.getTabBar === 'function' && this.getTabBar()) { \n  this.getTabBar().setData({ \n  identity: 'user' \n }) \n}`],
                    createTime:'2022/10/25',
                    tab:['微信小程序'],
                    type:'xcx'
                },
                {
                    id:2,
                    title:'原神私服本地搭建',
                    scenes:'没钱还想体验完整版角色（恼',
                    content:'',
                    code:[``],
                    createTime:'2022/10/31',
                    tab:['游戏','原神'],
                    type:'game'
                },
            ]
        }
    },
    watch:{
        '$store.state.nav.type':{
            handler(n,o){
                this.type = n
            }
        }
    },  
    created(){
        this.type = this.$store.state.nav && this.$store.state.nav.type || ''
    },  
}
</script>