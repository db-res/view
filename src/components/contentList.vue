

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
                    title:'原神本地搭建',
                    scenes:'没钱还想体验完整版角色（恼',
                    content:`采用的是Grasscutter，地址：https://github.com/Grasscutters/Grasscutter 
                    \n 以下为服务端环境相关搭建的必要软件，下载后安装好即可
                    \n java se，地址：https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
                    \n MongoDB （版本大于4.0即可），地址：https://www.mongodb.com/try/download/community
                    \n mitmproxy(代理，官方推荐)，地址：https://mitmproxy.org/`,
                    code:[`// 确保上面的软件下载安装好后，接下来就是本体相关的一些东西了
                    // 首先，获取最新的grasscutter.jar，最好放在一个新文件夹下，地址：
                    https://github.com/Grasscutters/Grasscutter/releases
                    // 然后，在grasscutter.jar所在的文件夹下打开cmd，或者power shell，执行：
                    java -jar grasscutter.jar  // 执行完后会得到一堆文件，另注意你的jar包文件名，执行命令时需要保持一致
                    // 接着，在当前文件夹下新建resources文件夹，下载Resources内容，地址：
                    https://github.com/Koko-boya/Grasscutter_Resources // 该资源也就是你游玩的版本
                    // 继续下载keystore文件，地址：
                    https://github.com/Grasscutters/Grasscutter/blob/main/keystore.p12
                    // 以上资源下载好后，在刚刚打开的控制台（cmd或power shell）执行：
                    java -jar grasscutter.jar -handbook  // 执行命令时需与jar包名一致
                    // 注意，在最后的启动中，可能会涉及到端口放行问题，所以最好前往config文件中修改443端口，换成其他端口如：888
                    // 最后执行代码
                    java -jar grasscutter.jar  // 如果没有报错，提示你服务已启动，说明服务端的部署已完成了


                    // 接着就是客户端启动链接上上面启动的服务端，第三方启动器地址：
                    https://github.com/Grasscutters/GrassClipper/releases  // 启动器有很多，也可以自行找其他的
                    // 打开后去设置里面更换语言，在把服务端给出的服务器地址填写上，当然上面的启动器，还需要下载一下代理，在他的设置页上有，下载完就可以直接链接了
                    // 最后就是登录了，先要创建一个角色，命令可在下方的页面找，地址：
                    https://github.com/Grasscutters/Grasscutter/wiki/Commands
                    // 备注：还有一些其他资源，插件，可以自行下载，地址：
                    https://mihoyo-is-in.icu/awesome#%E8%B5%84%E6%BA%90
                    `],
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