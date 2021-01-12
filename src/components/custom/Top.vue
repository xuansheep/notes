<template>
    <Menu style="margin-bottom: 15px" mode="horizontal" :active-name="active">
        <MenuItem v-for="item in defaultList" :name="item.name" :to="item.link">
            {{item.title}}
        </MenuItem>
    </Menu>
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
                    {name: 'index', title: '首页', link: '/'},
                    {name: 'nga', title: 'NGA', link: '/nga'},
                    {name: 'person', title: '人物', link: '/person'},
                    {name: 'calendar', title: '日历', link: '/calendar'},
                ],
            }
        }
    }
</script>

<style scoped>
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