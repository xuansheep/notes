<template>
    <div class="background">
        <div class="lottery-option-background">
            <Button class="lottery-option" v-bind:class="{lotteryOptionActive:item.activeFlag}" v-for="item in tableDate">{{item.name}}</Button>
        </div>
        <div class="lottery-button">
            <Button @click="lottery">抽奖</Button>
        </div>
    </div>
</template>

<script>

    import '../assets/css/lottery.css'

    export default {
        name: "Lottery",
        data() {
            return{
                form: {},
                tableDate: [],
                initProperty: {
                    currentIndex: 0,
                    maxIndex: null,
                    maxIntervals: 1000,
                    currentIntervals: 100,
                    growIntervals: 20,
                    growRate: null
                },
                currentIndex: null,
                maxIndex: null,
                maxIntervals: null,
                currentIntervals: null,
                growIntervals: null,
                growRate: null,

                offsetValue: 0,

                beforeCount: 0,
                afterCount: 0,
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad(){
                this.getList();
            },
            getList(){
                this.http.post(this.ports.lottery.option.list, {}, res => {
                    this.tableDate = res;
                    this.initProperty.maxIndex = this.tableDate.length;
                    this.offsetValue = this.offset();
                })
            },
            lottery(){
                this.http.post(this.ports.lottery.rand, {}, res => {
                    this.form = res;
                    this.form.activeFlag = true;
                    let index = 0;
                    for (let i = 0; i < this.tableDate.length; i++) {
                        if (this.tableDate[i].id === this.form.id){
                            index = i;
                        }else {
                            this.tableDate[i].activeFlag = false;
                        }
                    }
                    this.$set(this.tableDate, index, this.form);

                    this.initConfig(index);
                    this.setActive(0);
                })
            },
            /*动画*/
            initConfig(resultIndex) {
                this.currentIndex = this.initProperty.currentIndex;
                this.maxIndex = this.initProperty.maxIndex;
                this.maxIntervals = this.initProperty.maxIntervals;
                this.currentIntervals = this.initProperty.currentIntervals;
                this.growIntervals = this.initProperty.growIntervals;

                this.growRate = this.initProperty.maxIntervals / 2 / this.initProperty.growIntervals / (resultIndex  + this.initProperty.maxIndex);
                console.log("this.growRate", this.growRate)
                return true;
            },
            setActive(index){
                for (let i = 0; i < this.tableDate.length; i++) {
                    this.tableDate[i].activeFlag = i === index;
                }
                this.tableDate.push();

                this.currentIndex++;
                if (this.currentIndex >= this.maxIndex){
                    this.currentIndex = 0;
                }
                this.currentIntervals += this.growIntervals;
                if (this.currentIntervals > this.maxIntervals / 2 && this.growIntervals === this.initProperty.growIntervals) {
                    //消除偏移量
                    this.currentIntervals -= this.growIntervals * this.growRate * (this.offsetValue - 1);
                    this.growIntervals *= this.growRate;
                }

                if (this.currentIntervals > this.maxIntervals) {
                    return;
                }

                setTimeout(() => {
                    this.setActive(this.currentIndex)
                }, this.currentIntervals);
            },
            offset(){
                let rounds = (this.initProperty.maxIntervals / 2 - this.initProperty.currentIntervals) / this.initProperty.growIntervals;
                let offset = rounds % this.initProperty.maxIndex;
                console.log("offset", offset);
                return offset ;
            }
            /*动画*/
        }
    }
</script>

<style scoped>

</style>