

<style lang="scss">
    #taskListBox{
        position: sticky;
        z-index: 1;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.404);
        min-width: 200px;
        min-height: 300px;
        max-height: 300px;
        overflow-y: auto;
        height: fit-content;
        .listItemBox{
            padding: 4px 10px;
            border-bottom: 1px solid #eee;
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
                {name:'threejs实例', id:1, finish:true},
                {name:'音乐实例', id:2, finish:true},
                {name:'markdown实例', id:3, finish:false},
                {name:'文字游戏', id:3, finish:false},
                {name:'uni音乐app', id:4, finish:true},
                {name:'uni记账app', id:5, finish:true},
            ]
        }
    }
}
</script>