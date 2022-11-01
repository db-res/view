

<style lang="scss">
    #taskListBox{
        position: sticky;
        z-index: 1;
        background-color: white;
        min-width: 200px;
        min-height: 300px;
        max-height: 300px;
        overflow-y: auto;
        height: fit-content;
        .listItemBox{
            // width: 100%;
            padding: 4px 10px;
            border-bottom: 1px solid #eee;
        }
    }
    @media (max-width:500px) {
        #taskListBox{
            display: none;
        }
    }
    @media (min-width:500px) {
        #taskListBox{
            top: 55px;
        }
    }
</style>

<template>
    <div id="taskListBox">
        <div class="listItemBox" style="font-weight: bold;">任务列表</div>
        <div class="listItemBox" v-for="item in list" :key="item.id">
            <p :style="{'text-decoration':item.finish?'line-through':''}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            list:[
                {name:'原神本地搭建实例', id:0, finish:true},
                {name:'threejs实例', id:1, finish:false},
                {name:'音乐实例', id:2, finish:false},
                {name:'markdown实例', id:3, finish:false},
            ]
        }
    }
}
</script>