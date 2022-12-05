<style lang="scss">
@media (min-width:500px) {
    #navBox{
        width: 100%;
        background-color: white;
        z-index: 10;
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #eeeeee;
        .navList{
            display: flex;
            align-items: center;
            width: 80%;
            .itemBox{
                padding: 4px 10px;
                margin-right: 10px;
                cursor: pointer;
            }
        }
    }
}
@media (max-width:500px){
    #navBox{
        display: none;
    }
}
</style>

<template>
    <div id="navBox" class="pd-10">
        <div class="navList">
            <div class="itemBox" :style="{'color':type==item.value?'red':'',}" v-for="item in list" :key="item.id" @click="clickLink" :data-type="item.value">
                {{item.name}}
            </div>
        </div>
    </div>
</template>

<script>
    // import { useStore } from 'vuex'
    export default{
        data(){
            return {
                list:[
                    {name:'小程序',value:'xcx',id:1},
                    {name:'游戏',value:'game',id:2},
                    {name:'threejs',value:'three',id:3},
                    {name:'音乐',value:'music',id:4},
                    {name:'js',value:'js',id:5},
                ],
                type:''
            }
        },
        created(){
            this.type = this.$store.state.nav && this.$store.state.nav.type || ''
        },
        methods:{
            clickLink(e){
                let {type} = e.target.dataset  
                this.type = type
                this.$store.commit('updateNtype',type)
            }
        }
    }
</script>