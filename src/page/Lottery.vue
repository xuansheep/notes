<template>
    <div class="background">
        <div class="lottery-option-background">
            <Button class="lottery-option" v-bind:class="{lotteryOptionActive:item.activeFlag}" v-for="item in tableDate">{{item.name}}</Button>
        </div>
        <div class="lottery-button">
            <Button :loading="lotteryButtonLoading" type="success" @click="lottery">抽奖</Button>
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
                lotteryButtonLoading: false,
                initProperty: {
                    maxIntervals: 1000,
                    currentIntervals: 100,
                    growIntervals: 10,
                    rounds: 24,
                },
                currentIndex: null,
                maxIndex: null,
                maxIntervals: null,
                currentIntervals: null,
                growIntervals: null,
                rounds: null,
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
                    this.maxIndex = this.tableDate.length;
                })
            },
            lottery(){
                this.lotteryButtonLoading = true;
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

                    this.offset(index);
                    this.initConfig();
                    this.setActive(0);
                })
            },
            /*动画*/
            initConfig() {
                this.currentIndex = 0;
                this.maxIntervals = this.initProperty.maxIntervals;
                this.currentIntervals = this.initProperty.currentIntervals;
                this.growIntervals = this.maxIntervals / this.rounds;
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

                this.rounds--;

                if (this.rounds < this.maxIndex * 6) {
                    this.currentIntervals += this.growIntervals;
                }

                if (this.rounds <= 0) {
                    this.lotteryButtonLoading = false;
                    return;
                }

                setTimeout(() => {
                    this.setActive(this.currentIndex)
                }, this.currentIntervals);
            },
            offset(resultIndex){
                let totalRounds = this.maxIndex * 10;
                this.rounds = totalRounds + 1 + resultIndex - totalRounds % this.maxIndex;
                console.log()
            }
            /*动画*/
        }
    }
</script>

<style scoped>

</style>