<template>
    <div>
        <a-calendar
                @panelChange="onPanelChange"
                @select="onSelect"
        >
            <template slot="dateCellRender" slot-scope="value"></template>
            <template slot="monthCellRender" slot-scope="value"></template>
        </a-calendar>
    </div>
</template>

<script>
    // 默认语言为 en-US，所以如果需要使用其他语言，推荐在入口文件全局设置 locale
    import moment from 'moment';
    import 'moment/locale/zh-cn';
    moment.locale('zh-cn');

    export default {
        name: "Calendar"
    }
</script>

<style scoped>

</style>