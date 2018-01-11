<template>
    <x-header :title="top_title" :left-options="{showBack: isBack}"></x-header>
</template>

<script>
    import { XHeader } from 'vux'

    export default {
        components: {
            XHeader
        },
        props: ['title', 'isBack', 'left', 'right'],
        data() {
            return {
                top_title: this.title,
                back: this.isBack,
            }

        }
    }
</script>