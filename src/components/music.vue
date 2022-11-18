

<template>
    <div id="musicBox">
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                type:1,// type=1 单曲  type=10 专辑  type=100 歌手  type=1000 歌单  type=1002 用户  type=1004 MV  type=1006 歌词  type=1009 主播电台
                keyWord:'ttt',
            }
        },
        created(){
            this.axios.get(`https://music.163.com/api/search/get/web?csrf_token=hlpretag=&hlposttag=&s=${this.keyWord}&type=${this.type}&offset=0&total=true&limit=20`).then((response) => {
                console.log(response.data)
            })
        },
        methods:{

        }
    }
</script>


<style lang="scss" >
#musicBox{
    position: relative;
    z-index: 1;
}
</style>