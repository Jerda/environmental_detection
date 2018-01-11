<template>
    <x-header :title="top_title" :left-options="{showBack: isBack}">
        <div slot="left" @click="onLeft">切换圈舍</div>
        <div slot="right" @click="onRight">选择区域</div>
    </x-header>
</template>

<script>
    import { XHeader } from 'vux'

    export default {
        components: {
            XHeader
        },
        props: ['title', 'isBack'],
        data() {
            return {
                top_title: this.title,
                back: this.isBack
            }
        },
        methods: {
            onLeft: function() {
                this.$emit('left');
            },
            onRight: function() {
                this.$emit('right');
            }
        },
    }
</script>