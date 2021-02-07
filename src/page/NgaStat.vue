<template>
    <div class="stat-background">
        <Top active="stat"></Top>
        <div class="stat-content">
            <div id="postNumLineChart" style="height: 300px"></div>
        </div>
    </div>
</template>

<script>

    import '../assets/css/stat.css'
    import LoadingWarrior from "../components/custom/LoadingWarrior";
    import Top from "../components/custom/Top";

    export default {
        name: "NgaStat",
        components: {Top, LoadingWarrior},
        data() {
            return {
                statList: [],
                lineChart: null
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.http.post(this.ports.nga.stat.postNum, {}, res => {
                    this.statList = res;
                    let xAxisData = this.statList.map(stat => stat.axisX.substring(3));
                    let yAxisData = this.statList.map(stat => stat.postNum);
                    this.initPostNumLineChart(xAxisData, yAxisData);
                });
            },
            initPostNumLineChart(xAxisData, yAxisData) {
                let newPromise = new Promise((resolve) => {
                    resolve()
                });
                newPromise.then(() => {
                    if (this.lineChart === null) {
                        this.lineChart = this.$echarts.init(document.getElementById("postNumLineChart"));
                    }
                    this.lineChart.setOption({
                        title: { text: 'NGA发帖量趋势' },
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        xAxis: {
                            data: xAxisData,
                            lineStyle: {

                            }
                        },
                        yAxis: {},
                        series: [{
                            name: '发帖量',
                            type: 'line',
                            smooth: true,
                            data: yAxisData,
                            itemStyle : {
                                color:'#f8895c'
                            },
                        }]
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>