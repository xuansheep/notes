<template>
    <div>
        <div v-if="title || $slots.title" style="width: 70px; text-align: right; float: left">
            <div><slot name="title">{{ title }}：</slot></div>
        </div>
        <div v-if="title || $slots.title" style="margin-left: 70px;">
            <div><slot name="content">{{ !!content ? content : '--' }}</slot></div>
        </div>
    </div>

</template>
<script>

    export default {
        name: 'CardLabel',
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
        }
    };
</script>
