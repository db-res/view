

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
      width: 100%;
      display: inline-block;
      height: fit-content;
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.404);
      .sceneBox{
        border-radius: 2px;
        background-color: #66666694;
        color: aliceblue;
      }
    }
}
</style>

<template>
    <div class="Listbox">
        <div class="contentbox pd-10 mg-b-10"  v-for="item in list" :style="{'display':type == item.type?'block':'none'}" :key="item.id"> 
            <div class="mg-b-10 f20" style="font-weight: 500;">{{item.title}}</div>
            <div :id="'filterBox'+item.id" class="mg-b-10" :style="{'height':(item.showMin ?'200':item.height)+'px'}" style="overflow: hidden;position: relative;">
                <div class="mg-b-10  pd-10 sceneBox" style="">
                    <p class="">场景：{{item.scenes}}</p>
                    <p class="mg-t-10">内容描述：{{item.content}}</p>
                    <p class="mg-t-10">代码参考如下：</p>
                </div>
                <code_view class="" :code="item.code[0]"></code_view>
                <div style="position: absolute;height: 50px;width: 100%;bottom: 0;left: 0;z-index: 9;">
                    <div style="width: 100%;height: 100%;filter: blur(20px);background: #ffffff;"></div>
                </div>
            </div>
            <div class="mg-b-10 f14" style="color: #666666;">{{item.createTime}} • <span v-for=" (i, j) in item.tab" :key="j">{{((j + 1) != item.tab.length)?'•':''}}{{i}}</span></div>
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
                            对此问题进行了查阅与搜索，发现custom-tab-bar文件属于自定义组件，在每个tab页上独立存在，
                            可通过在生命周期ready中或者页面中通过this.getTabBar().setData方法解决。`,
                    code:[`if (typeof this.getTabBar === 'function' && this.getTabBar()) { \n  this.getTabBar().setData({ \n  identity: 'user' //身份认证参数 \n }) \n}`],
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
                {
                    id:3,
                    title:'小程序使用css3滤镜踩坑',
                    scenes:'整个页面需要做灰白滤镜效果',
                    content:`需求需要把首页色调改成灰白色调，当时听到这个需求的第一个反应就是在层级上改一个蒙版，改成rgb通道改一下（ps错乱），但是层级上叠上一层的话，
                    对于一些点击交互就会受到影响，所以这个方法明显不太行，又想到当时有个网站已经有现成的了，直接去扒拉源码看看，翻查了下就找到了这个差点被我遗忘的css3新属性--滤镜filter；
                        grayscale值转灰度图像，值为0-1或0%-100%，100%为完全转化灰度，在小程序的使用期间遇到渲染性能问题，要转化的页面是一个无限滚动加载的页面，而滤镜是将页面转化为灰度图;
                        当在小程序页面中的page或者view中设置了该属性时，期望是在页面的最外层box上设置一次，即可完成整个页面的灰化，实际效果却出现了偏差，整个页面确实灰化了，但也出现了卡顿，
                    页面布局出现多余的空白等问题，在查阅相关资料与实际测试中，得到的解决方案也很简单，在页面中单独套一层view，或者单独给每个模块加一个filter，即可解决，通过对比，很明显可以看出卡顿跟空白是由page跟view处设置filter导致的；
                        在查找相关问题时，也浏览了官方社区，找到了类似的问题，不过并没找到官方对该问题给出的具体回复
                    `,
                    code:[`filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();
                        filter: grayscale(95%);
                        -webkit-filter: grayscale(95%);
                        -moz-filter: grayscale(95%);
                        -ms-filter: grayscale(95%);
                        -o-filter: grayscale(95%);
                        -webkit-filter: grayscale(.95);`],
                    createTime:'2022/12/05',
                    tab:['微信小程序'],
                    type:'xcx'
                },
                {
                    id:4,
                    title:'图片压缩-重绘',
                    scenes:'对图片打水印，压缩',
                    content:`js对图片压缩的方式，目前了解的有两种，大概的思路就是： 1、获取图片文件；2、对图片用cavas进行重绘；压缩主要在canvas重绘中进行，一种是重绘中将图片按一定的宽高比进行缩小按比例压缩，一种是根据canvas转blob时规定转成的图片类型与质量进行压缩，所以第一种可以简单称为按比例压缩，第二种可以叫质量压缩；`,
                    code:[`
                    // file为上传图片文件对象，将上传的图片文件，转成img节点抛出
                    const createImg  =function(file){
                        return new Promise((res,err)=>{
                            let reader = new FileReader()
                            reader.addEventListener('load', () => {
                                let img = new Image()
                                img.src = reader.result
                                img.addEventListener('load', () => res(img))
                            })
                            reader.readAsDataURL(file)
                        })
                    }
                    // 创建canvas对象，将img节点绘制到canvas上，按比例压缩时，将canvas宽高按一定比例缩小（如以下缩小为原图的5倍），drawImage绘制后，将canvas抛出
                    const imgToCanvas = function(file){
                        return new Promise((res,err)=>{
                            createImg(file).then(img=>{
                                let canvas = document.createElement('canvas')

                                canvas.width = img.width / 5
                                canvas.height = img.height / 5

                                let ctx = canvas.getContext('2d')
                                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                                res({canvas})
                            })
                        })
                    }
                    // 打水印与输出压缩后的图片，watermarkUrl为水印图地址，如果采用质量压缩，
                    // 那么就应该在canvas.toBlob()的第二个参数与第三个参数设置（image/jpeg(image/webp),(0~1)），前一个为类型，后一个为图片质量；
                    const watermark = function(file, watermarkUrl){
                        let canvas;
                        return new Promise((resolve, reject) => {
                            imgToCanvas(file).then(res=>{
                                canvas = res.canvas
                                let ctx = canvas.getContext('2d')
                                if(watermarkUrl){
                                    let img = new Image()
                                    img.src = watermarkUrl
                                    img.setAttribute("crossOrigin",'Anonymous')
                                    img.addEventListener('load', () => {
                                        //绘制图片
                                        let img_width = canvas.width * 0.6,
                                            img_height = img.height / (img.width / img_width),
                                            x = (canvas.width - img_width) /2,
                                            y = (canvas.height - img_height)/2;
                                        ctx.globalAlpha=0.3;//设置透明度
                                        ctx.drawImage(img, 0, 0, img.width, img.height, x, y, img_width, img_height )
                                        canvas.toBlob(blob => {
                                            let kb = blob.size / 1024 
                                            let m = blob.size / 1024 / 1024
                                            console.log(kb+'kb', m+'m');
                                            resolve(blob)
                                        })
                                    })
                                }else{
                                    canvas.toBlob(blob => {
                                        let kb = blob.size / 1024 
                                        let m = blob.size / 1024 / 1024
                                        console.log(kb + 'kb', m + 'm');
                                        resolve(blob)
                                    })
                                }
                            })
                        })
                    }
                    `],
                    createTime:'2022/12/08',
                    tab:['图片压缩','水印'],
                    type:'js'
                },
                {
                    id:5,
                    title:'小程序全局路由监听与控制显示相关组件与分享页面',
                    scenes:'实现小程序根据页面路径控制显示分享按钮组件',
                    content:`1、首先通过wx.onAppRoute(Function)监控页面跳转获取页面路径，2、再在需要显示的页面引入自定义组件，在自定义组件内部根据监控到的页面路径控制组件的显示与隐藏，
                    3、当用户点击组件触发分享周期函数时，对当前页面分享进行自定义分享内容，分享数据由自定义组件获取，属于异步操作，所以自定义分享参数需要用到promise`,
                    code:[`
                    // 监听页面跳转
                    wx.onAppRoute((res) => { 
                        console.log('监听数据',res)    
                    })
                    // 自定义分享内容
                    onShareAppMessage: function (e) {
                        if (e.from === 'button') {
                            let promise = new Promise(res=>{
                                setTimeout(function (params) {
                                    res({
                                        title: '自定义标题',
                                        path: '/pages/index/index',
                                        imageUrl: '自定义图片-网络地址',
                                    })
                                },300)
                            })
                            return {
                                title: '自定义标题',
                                path: '/pages/index/index',
                                imageUrl: '自定义图片-网络地址',
                                promise: promise
                            }
                        }
                    }`],
                    createTime:'2022/12/9',
                    tab:['微信小程序'],
                    type:'xcx'
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
    mounted(){
        // console.log(44444444555555555,document.getElementById('filterBox').clientHeight);
        this.list.forEach((item,index,arr)=>{
            arr[index].height = document.getElementById(('filterBox'+item.id)).clientHeight
            arr[index].showMin = arr[index].height > 200?true:false
        })
    },
}
</script>