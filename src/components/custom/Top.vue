<template>
    <div class="background-div">
        <Menu mode="horizontal" :active-name="active">
            <MenuItem name="index" to="/index">
                <Icon type="ios-home" size="23" />
                <span>首页</span>
            </MenuItem>
            <MenuItem v-for="item in defaultList" :name="item.name" :to="!!item.mobileLink&&isMobile() ? item.mobileLink : item.link">
                {{item.title}}
            </MenuItem>
        </Menu>
    </div>
</template>

<script>
    export default {
        name: "Top",
        props: {
            active: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                defaultList: [
                    {name: 'nga', title: 'NGA', link: '/nga', mobileLink: '/mobile/nga'},
                    {name: 'person', title: '人物', link: '/person'},
                    {name: 'calendar', title: '日历', link: '/calendar'},
                    {name: 'stat', title: '统计', link: '/stat'},
                    // {name: 'releaseGroup', title: '版本管理', link: '/releaseGroup'},
                    {name: 'serverMonitor', title: '服务监控', link: '/serverMonitor'},
                ],
            }
        },
    }
</script>

<style scoped>
    .background-div {
        background-color: #ffffff;
        margin-bottom: 15px;
        border-radius: 4px;
        padding-top: 16px;
    }
    .ivu-menu-horizontal {
        height: 40px;
        line-height: 30px;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active {
        color: #f1795c;
        font-weight: bold;
        border-bottom: 2px solid #f1795c;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover {
        color: #f1795c;
        border-bottom: 2px solid #f1795c;
    }
    .ivu-menu-item {
        font-size: 18px;
        margin-right: 20px;
    }
</style>