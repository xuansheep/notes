<template>
    <div style="width: 1024px; margin: auto">
        <Top active="calendar"></Top>
        <LoadingWarrior></LoadingWarrior>
        <!--<a-calendar
                @panelChange="onPanelChange"
                @select="onSelect"
        >
            <template slot="dateCellRender" slot-scope="value"></template>
            <template slot="monthCellRender" slot-scope="value"></template>
        </a-calendar>-->
    </div>
</template>

<script>
    // 默认语言为 en-US，所以如果需要使用其他语言，推荐在入口文件全局设置 locale
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    import Top from "../components/custom/Top";
    import LoadingWarrior from "../components/custom/LoadingWarrior";

    export default {
        name: "Calendar",
        components: {LoadingWarrior, Top},
    }
</script>

<style scoped>

</style>