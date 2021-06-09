<template>
    <div class="stat-background">
        <Top active="stat"></Top>
        <div class="stat-content">
            <div style="height: 500px">
                <p class="stat-title">NGA热词统计</p>
                <div style="margin: 10px 0; text-align: right">
                    <DatePicker style="width: 240px" :value="dateRange" @on-change="selectDate" split-panels type="daterange" placement="bottom-end" placeholder="Select date"></DatePicker>
                    <Button style="margin-left: 10px" @click="getTopTermList">查询</Button>
                </div>
                <CellGroup :loading="termLoading">
                    <Row>
                        <Col span="12">
                            <Cell v-for="(term, index) in topTermList.slice(0, 10)" :title="term.word" :extra="term.count.toString()" :to="'/nga?word=' + term.word">
                                <div style="width: 20px" slot="icon">
                                    <Icon v-if="index === 0" type="md-flame" color="#FF0000" size="20"></Icon>
                                    <Icon v-if="index === 1" type="md-flame" color="#FF5718" size="20"></Icon>
                                    <Icon v-if="index === 2" type="md-flame" color="#FFA53E" size="20"></Icon>
                                </div>
                            </Cell>
                        </Col>
                        <Col span="12">
                            <Cell v-for="(term, index) in topTermList.slice(10, 20)" :title="term.word" :extra="term.count.toString()" :to="'/nga?word=' + term.word">
                                <div style="width: 20px" slot="icon"></div>
                            </Cell>
                        </Col>
                    </Row>
                </CellGroup>
                <Loading :loading="termLoading"></Loading>
            </div>
            <div id="postNumLineChart" style="height: 300px">
                <Loading :loading="postNumLoading"></Loading>
            </div>
        </div>
    </div>
</template>

<script>

    import '../assets/css/stat.css'
    import LoadingWarrior from "../components/custom/LoadingWarrior";
    import Top from "../components/custom/Top";
    import Loading from "../components/custom/Loading";

    export default {
        name: "NgaStat",
        components: {Top, LoadingWarrior, Loading},
        data() {
            return {
                topTermForm: {
                    startTime: null,
                    endTime: null,
                    size: 20
                },
                dateRange: [],
                statList: [],
                topTermList: [],
                lineChart: null,
                termLoading: false,
                postNumLoading: false
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.postNumLoading = true;
                this.http.post(this.ports.nga.stat.postNum, {}, res => {
                    this.statList = res;
                    let xAxisData = this.statList.map(stat => stat.axisX.substring(3));
                    let yAxisData = this.statList.map(stat => stat.postNum);
                    this.initPostNumLineChart(xAxisData, yAxisData);
                    this.postNumLoading = false;
                });
                this.getTopTermList();
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
                                color:'#f18970'
                            },
                        }]
                    });
                })
            },
            getTopTermList() {
                this.topTermList = [];
                this.termLoading = true;
                this.http.post(this.ports.nga.stat.topTerms, this.topTermForm, res => {
                    this.topTermList = res;
                    this.termLoading = false;
                });
            },
            selectDate(dateRange) {
                this.topTermForm.startTime = dateRange[0];
                this.topTermForm.endTime = dateRange[1];
            }
        }
    }
</script>

<style scoped>

</style>