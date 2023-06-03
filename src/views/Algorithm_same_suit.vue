<template>
    <div class="box">
        <div style="width: 60%;height: 80%;">
            <div style="display: flex;flex-wrap: wrap;">
                <div @click="getPoint(item)" 
                    style="margin-right: 10px;margin-bottom: 10px;flex-shrink: 0;border: 1px solid #666;background-color: #eee;cursor: pointer;padding: 2px 6px;" 
                    :style="{background:item.checked?'#ffb5b5':' #eee'}"
                    v-for="item in deck" :key="item.point">
                    {{ item.suit }} {{ strPoint(item.point) }}
                </div>
            </div>
            <div style="margin-top: 20px;">
                <button class="btn" @click="getBestCombination">输出最佳组合</button>
                <span v-if="loading">筛选中...</span>
            </div>
            <div style="display: flex;flex-wrap: wrap;margin-top: 20px;">
                <div 
                    style="margin-right: 10px;margin-bottom: 10px;flex-shrink: 0;border: 1px solid #666;background-color: #eee;padding: 2px 6px;" 
                    v-for="item in bestCombination" :key="item.point">
                    {{ item.suit }} {{ strPoint(item.point) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scope>
    .box{
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        .btn{
            padding: 4px 8px;
            border: 1px solid #a3a3a3;
            background: #ececec;
            border-radius: 4px;
            cursor: pointer;
        }
    }
</style>
<script>
export default {
    data() {
        return {
            deck:[],
            selectedCards:[],
            bestCombination:[],
            loading:false
        }
    },
    created() {
        // 设置一套 52 张卡片
        const deck = this.generateDeck();
        this.deck = deck
        // 从牌组中随机抽取 20 张牌
        let selectedCards = [];
        // while (selectedCards.length < 20) {
        //   const randomIndex = Math.floor(Math.random() * deck.length);
        //   const card = deck.splice(randomIndex, 1)[0];
        //   selectedCards.push(card);
        // }
        selectedCards = [
            { suit: '♠', point: 2 },
            { suit: '♥', point: 12 },
            { suit: '♦', point: 7 },
            { suit: '♣', point: 8 },
            { suit: '♣', point: 9 },
            { suit: '♠', point: 11 },
            { suit: '♠', point: 3 },
            { suit: '♦', point: 10 },
            { suit: '♥', point: 2 },
            { suit: '♠', point: 10 },
            { suit: '♥', point: 11 },
            { suit: '♣', point: 11 },
            { suit: '♠', point: 5 },
            { suit: '♥', point: 3 },
            { suit: '♠', point: 13 },
            { suit: '♣', point: 1 },
            { suit: '♠', point: 9 },
            { suit: '♣', point: 1 },
            { suit: '♣', point: 13 },
            { suit: '♣', point: 12 }
        ]
        // console.log(selectedCards);
        // 在所选卡片中找到最佳组合
        // const bestCombination = findBestCombinations(selectedCards);
        
        // // 输出最佳组合
        // console.log("随机抽取 20 张牌:");
        // for (const card of selectedCards) {
        //     console.log(`${card.point}${card.suit}`);
        // }
        
        // console.log("\n最佳组合:");
        // if (bestCombination) {
        //     for (const card of bestCombination) {
        //     console.log(`${card.point}${card.suit}`);
        //     }
        // } else {
        //     console.log("No valid combination found.");
        // }
    },
    methods: {
        getBestCombination(){
            this.loading = true
            const bestCombination = this.findBestCombinations(this.selectedCards);
            if (bestCombination) {
                console.log(bestCombination);
                for (const card of bestCombination) {
                    console.log(`${card.point}${card.suit}`);
                }
                this.bestCombination = bestCombination
            }
            // this.loading = false
        },  
        getPoint(data){
            this.deck.map(item=>{
                if(item.point===data.point&&item.suit===data.suit){
                    item.checked = true
                    if (this.selectedCards.includes(item)) {
                        item.checked = false
                    }
                }
            })
            this.selectedCards=this.deck.filter(i=>i.checked)
        },  
        strPoint(value){
            let a = value
            switch (value) {
                case 1:
                    a = 'A'
                    break;
                case 11:
                    a = 'J'
                    break;
                case 12:
                    a = 'Q'
                    break;
                case 13:
                    a = 'K'
                    break;
                default:
                    a = value
                    break;
            }
            return a
        },
        // 生成一副牌
        generateDeck() {
            const suits = ["♠", "♥", "♦", "♣"];
            // const points = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
            const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
            const deck = [];
        
            for (const suit of suits) {
            for (const point of points) {
                deck.push({ suit, point });
            }
            }
        
            return deck;
        },

        // 从数组中获取给定大小的所有组合
        getCombinations(array, size) {
            const combinations = [];
        
            function generateCombination(currentCombination, startIndex) {
            if (currentCombination.length >= size) {
                combinations.push(currentCombination);
                // return;
            }
        
            for (let i = startIndex; i < array.length; i++) {
                generateCombination([...currentCombination, array[i]], i + 1);
            }
            }
        
            generateCombination([], 0);
            return combinations;
        },

        // 计算组合的点数
        calculatePoints(combination) {
            let points = 0;
            for (const card of combination) {
            switch (card.point) {
                case "A":
                points += 1;
                break;
                case "K":
                case "Q":
                case "J":
                points += 10;
                break;
                default:
                points += parseInt(card.point);
            }
            }
            return points;
        },
    
        // 在给定的一组卡片中找到最佳组合
        findBestCombinations(cards) {
            const combinations = this.getCombinations(cards, 3);
            // console.log('所有组合',combinations);
            const straightFlushCombinations = combinations.filter(combination => {
            // const sorted = combination.sort((a, b) => a.point.localeCompare(b.point));
            const sorted = combination.sort((a, b) => a.point - b.point);
            const isStraight = sorted.every((card, index) => index === 0 || card.point === (sorted[index - 1].point + 1));
            const isFlush = sorted.every(card => card.suit === sorted[0].suit);
            // if (isStraight && isFlush) {
            //     console.log(sorted,isStraight);
            // }
            return isStraight && isFlush;
            });

            // console.log(straightFlushCombinations);
        
            let bestCombination = null;
            let bestPoints = 0;
        
            for (const combination of straightFlushCombinations) {
            const points = this.calculatePoints(combination);
            if (points > bestPoints) {
                bestCombination = combination;
                bestPoints = points;
            }
            }
            this.loading= false
            return bestCombination;
        }
  
    },
}
</script>