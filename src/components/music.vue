

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
            <div class="flex jc-center" style="height: calc(100% - 186px);">
                <div class="">
                    <audio ref="audioDom" src="https://anysss.s3.ladydaily.com/music/3189549952.mp3"></audio>
                </div>
                <div style="overflow-y: auto;" id="wordBox">
                    <div class="txal mg-b-6" :class="[item.time>time?'':'bold']" v-for="(item,index) in wordList">
                        <p>{{item.text}}</p>
                    </div>
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
                <div class="W100 flex aic">
                    <div class="mg-r-14">{{(schedule)}}</div>
                    <div class="fg1 h3 rel pre-box bor-20">
                        <div ref="schedule" class="W100 h3 bor-20"></div>
                        <div ref="scheduleMov" class="abs l0 h6 sche-box bor-20" style="top: -1.5px;" :style="{'width':`${schedule}%`}"></div>
                        <div class="abs t-6 sch-btn bor-50 w16 h16 z10 pointer" @mousedown="move" :style="{'left': `calc(${schedule}% - 10px)`}"></div>
                    </div>
                    <div class="mg-l-14">{{total}}</div>
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
                timer:null,
                musicWord:{
                    '00:00.91':'Beyond',
                    '00:03.20':'海闊天空',
                    '00:06.32':'作詞：黃家駒',
                    '00:09.48':'作曲：黃家駒',
                    '00:12.60':'',
                    '00:18.04':'今天我　寒夜裡看雪飄過',
                    '01:42.28':'今天我　寒夜裡看雪飄過',
                    '00:24.64':'懷著冷卻了的心窩漂遠方',
                    '01:48.92':'懷著冷卻了的心窩漂遠方',
                    '00:30.52':'風雨裡追趕',
                    '01:54.68':'風雨裡追趕',
                    '00:33.60':'霧裡分不清影蹤',
                    '01:57.84':'霧裡分不清影蹤',
                    '00:36.76':'天空海闊你與我',
                    '02:01.00':'天空海闊你與我',
                    '00:39.84':'可會變(誰沒在變)',
                    '02:04.12':'可會變(誰沒在變)',
                    '00:42.37':'',
                    '00:43.01':'多少次　迎著冷眼與嘲笑',
                    '00:49.58':'從沒有放棄過心中的理想',
                    '00:55.48':'一剎那恍惚',
                    '00:58.60':'若有所失的感覺',
                    '01:01.68':'不知不覺已變淡',
                    '01:04.72':'心裡愛(誰明白我)',
                    '01:07.97':'',
                    '01:08.34':'原諒我這一生不羈放縱愛自由',
                    '02:07.61':'原諒我這一生不羈放縱愛自由',
                    '03:19.32':'原諒我這一生不羈放縱愛自由',
                    '03:56.72':'原諒我這一生不羈放縱愛自由',
                    '01:15.40':'也會怕有一天會跌倒',
                    '02:14.64':'也會怕有一天會跌倒',
                    '03:26.36':'也會怕有一天會跌倒',
                    '04:03.80':'也會怕有一天會跌倒',
                    '01:21.56':'背棄了理想　誰人都可以',
                    '02:20.88':'背棄了理想　誰人都可以',
                    '03:32.64':'背棄了理想　誰人都可以',
                    '03:45.08':'背棄了理想　誰人都可以',
                    '04:10.04':'背棄了理想　誰人都可以',
                    '01:27.79':'那會怕有一天只你共我',
                    '02:27.08':'那會怕有一天只你共我',
                    '03:38.84':'那會怕有一天只你共我',
                    '03:51.26':'那會怕有一天只你共我',
                    '04:16.28':'那會怕有一天只你共我',
                    '01:33.64':'',
                    '02:07.20':'',
                    '02:32.96':'',
                    '03:18.80':'',
                    '03:43.92':'',
                    '03:56.04':'',
                    '03:08.01':'仍然自由自我',
                    '03:11.52':'永遠高唱我歌',
                    '03:14.68':'走遍千里',
                    '04:20.92':'完',
                },
                wordList:[],
                time:0,
            }
        },
        watch:{
            // let that = this
            isplay:function(n,o){
                // if(n){
                //     let that = this
                //     this.timer = setInterval(function (params) {
                //         if(that.schedule == 100){
                //             clearInterval(that.timer)
                //             that.isplay = false
                //         }else{
                //             that.schedule += 1
                //         }
                //     },1000)
                // }else{
                //     clearInterval(this.timer)
                // }
            }
        },
        created(){
            // this.axios.get(`https://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s=${this.keyWord}&type=${this.type}&offset=0&total=true&limit=20`).then((response) => {
            //     console.log(response.data)
            // })
            this.wordList = []
            for (let index in this.musicWord) {
                // console.log(index,this.musicWord[index]);
                let a = index.split(':')
                a.forEach((item,index,arr)=>{
                    arr[index] = Number(item)
                })
                this.wordList.push({
                    text: this.musicWord[index],
                    time: (a[0] * 60) + a[1]
                }) 
                // debugger
                // if (Object.hasOwnProperty.call(object, index)) {
                    //     const element = object[index];
                    
                    // }
                }
                this.wordList = JSON.parse(JSON.stringify(this.wordList))
                console.log(this.wordList);
            
        },
        mounted(){
            let audio= this.$refs.audioDom,that = this
            audio.addEventListener('canplay',function(){
                console.log(audio.duration);
                that.total = that.numFun(audio.duration.toFixed(2))
            })
        },
        methods:{
            numFun(n){
                let nc = Number(n),s,m;
                if(nc / 60 > 1){
                    s = (nc % 60).toFixed(0) + ''
                    m = Math.floor(nc / 60) + ''
                }else{
                    m = '00'
                    s = nc + ""
                }
                return this.toSt(m) +":"+ this.toSt(s)
            },
            toSt(i){
                return i.length > 1?i:( '0' + i )
            },
            play(e){
                let {type} = e.currentTarget.dataset, audio= this.$refs.audioDom,that=this;
                this.isplay = !this.isplay
                if(this.isplay){
                    audio.play()
                    audio.addEventListener('timeupdate',that.listenterPlay)
                }else{
                    audio.pause()
                    audio.removeEventListener('timeupdate',that.listenterPlay)
                }
            },
            listenterPlay(){
                let audio= this.$refs.audioDom
                let a = ((audio.currentTime / audio.duration) * 100).toFixed(0)
                console.log(audio.currentTime, audio.duration, a);
                this.schedule = this.numFun(a)
                this.time = audio.currentTime
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
    // #wordBox{
        /* 设置滚动条的样式 */
        #wordBox::-webkit-scrollbar {
            width:6px;
        }
        /* 滚动槽 */
        #wordBox::-webkit-scrollbar-track {
            -webkit-box-shadow:inset 0 0 6px #b3b3b370;
            border-radius:10px;
        }
        /* 滚动条滑块 */
        #wordBox::-webkit-scrollbar-thumb {
            border-radius:10px;
            background:#acacac50;
            -webkit-box-shadow:inset 0 0 6px #acacac80;
        }
        #wordBox::-webkit-scrollbar-thumb:window-inactive {
            background:#aaaaaa70;
        }
        #wordBox::-webkit-scrollbar-corner{
            border-radius:10px;
        }
    // }
}
</style>