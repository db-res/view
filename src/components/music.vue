

<template>
    <div id="musicBox" class="flex jc-center rel hv84">
        <div class="box pd-10 bor-8" style="">
            <div class="fdc aic pd-l-120 pd-r-120 mg-b-10" style="">
                <div class="imgBox mg-r-10 circle">
                    <img src="../assets/image/sphere.jpg" class="imgBox circle ani-circle" :class="[isplay?'aniPlay':'aniStop']" alt="" srcset="" />
                </div>
                <div class="mg-t-10">
                    <p>曲目：xxxxx</p>
                    <p class="gray f12">词作者：xxxxx</p>
                    <p class="gray f12">演唱者：xxxxx</p>
                </div>
            </div>
            <div class="flex jc-center" >
                <div class="">

                </div>
            </div>
        </div>
        <div class="fixed flex jc-center b0 l0 W100 bottomBox">
            <div class="h60 W70 fdc jc-center">
                <div class="flex aic jc-center mg-b-10">
                    <div class="icon iconfont icon-ziyuan1 pointer"></div>
                    <div class="f24 icon iconfont pointer mg-r-12 mg-l-12" :class="[isplay?'icon-ai07':'icon-bofang']" @click="play" data-type="1"></div>
                    <div class="icon iconfont icon-ziyuan pointer"></div>
                </div>
                <div class="W100 rel pre-box bor-20">
                    <div ref="schedule" class="W100 h3 bor-20"></div>
                    <div ref="scheduleMov" class="abs l0 h6 sche-box bor-20" style="top: -1.5px;" :style="{'width':`${schedule}%`}"></div>
                    <div class="abs t-6 sch-btn bor-50 w16 h16 z10 pointer" @mousedown="move" :style="{'left': `calc(${schedule}% - 10px)`}"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                type:1,// type=1 单曲  type=10 专辑  type=100 歌手  type=1000 歌单  type=1002 用户  type=1004 MV  type=1006 歌词  type=1009 主播电台
                keyWord:'',
                isplay:false,
                schedule:0,
                total:100,
                timer:null
            }
        },
        watch:{
            // let that = this
            isplay:function(n,o){
                if(n){
                    let that = this
                    this.timer = setInterval(function (params) {
                        if(that.schedule == 100){
                            clearInterval(that.timer)
                            that.isplay = false
                        }else{
                            that.schedule += 1
                        }
                    },1000)
                }else{
                    clearInterval(this.timer)
                }
            }
        },
        created(){
            // this.axios.get(`https://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s=${this.keyWord}&type=${this.type}&offset=0&total=true&limit=20`).then((response) => {
            //     console.log(response.data)
            // })
        },
        methods:{
            play(e){
                let {type} = e.currentTarget.dataset
                // console.log(type);
                this.isplay = !this.isplay
            },
            move(e){
                let box = e.target, pageX = e.pageX, boxX = pageX - box.offsetLeft, that=this;

                let a = function(es){ 
                    let pageXs = es.pageX
                    let l = pageXs - boxX
                    let w = (l / that.$refs.schedule.clientWidth) *100
                    if((l + 10) > 0 && l < that.$refs.schedule.clientWidth){
                        box.style.left = l +'px'
                        that.$refs.scheduleMov.style.width = l + 'px'
                        that.schedule = w
                    }
                 }
                 let b = function(){ 
                    document.removeEventListener("mousemove", a);
                    document.removeEventListener("mouseup", b);
                }
                document.addEventListener("mousemove", a);
                document.addEventListener("mouseup", b);
            },
            dragover(e){
                console.log(e);
            }
        }
    }
</script>


<style lang="scss" >
#musicBox{
    position: relative;
    z-index: 1;
    overflow: hidden;

    .box{
        background: linear-gradient(to bottom right, rgb(255, 147, 147), rgb(255, 255, 149));
        width: 70%;
    }
    .imgBox{
        width: 100px;
        height: 100px;
    }

    .sche-box{
        background: rgb(136, 170, 154);
    }

    .sch-btn{
        background: #eee;
    }
    
    // @for $i from 1 through 200 {
    //     .bor-#{$i} { border-radius: 1px * $i; }
    //     .Bor-#{$i} { border-radius: 1% * $i; }
    // }
    .bottomBox{
        background: rgba(167, 255, 150,.8);
        color: aliceblue;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    }
    .pre-box{
        background: rgb(206, 255, 232);
    }
}
</style>