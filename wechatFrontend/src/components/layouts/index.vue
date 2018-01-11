<template>
    <router-view></router-view>
    <tab></tab>
</template>

<script>
    import tab from './tab.vue'

    export default {
        name: 'app',
        components: {
            tab
        }
    }
</script>