<template>
    <div class="calendar-background">
        <Top active="calendar"></Top>
        <a-calendar @panelChange="panelChange">
            <ul slot="dateCellRender" slot-scope="value">
                <div class="lunar-day">{{ getLunarDay(value) }}</div>
                <li v-for="item in getDataForDay(value)" :key="item.title">
                    <Badge :status="item.type" />
                    <span class="title-text">{{item.title}}</span>
                </li>
            </ul>
            <template slot="monthCellRender" slot-scope="value"></template>
        </a-calendar>
    </div>
</template>

<script>
    // 默认语言为 en-US，所以如果需要使用其他语言，推荐在入口文件全局设置 locale
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    import Top from "../components/custom/Top";
    import LoadingWarrior from "../components/custom/LoadingWarrior";

    import '../assets/css/calendar.css'

    export default {
        name: "Calendar",
        components: {LoadingWarrior, Top},
        data() {
            return {
                dataList: []
            }
        },
        created() {
            this.pageLoad();
        },
        methods: {
            pageLoad() {
                this.panelChange(moment());
            },
            getDataForDay(day) {
                //day(moment对象)
                let formatDay = day.format('yyyy-MM-DD');
                let resultList = [];
                this.dataList.forEach(item => {
                    if (item.date === formatDay) {
                        // console.log("match:",formatDay, item.events)
                        resultList = item.events;
                        return false;
                    }
                });
                return resultList;
            },
            getLunarDay(day) {
                let lunarDay = this.$solarLunar.solar2lunar(day.year(), day.month()+1, day.date());
                if (lunarDay.isTerm) {
                    return lunarDay.term;
                }
                if (lunarDay.dayCn === "初一") {
                    return lunarDay.monthCn;
                }
                return lunarDay.dayCn;
            },
            panelChange(day) {
                let formatDay = day.format('yyyy-MM-DD');
                let params = {
                    date: formatDay
                };
                this.http.post(this.ports.person.birthday, params, res => {
                    this.dataList = res;
                })
            }
        }
    }
</script>

<style scoped>

</style>