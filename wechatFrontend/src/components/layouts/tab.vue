<template>
    <div>
        <tabbar>
                <tabbar-item :selected="selected.environment" link="environment">
                    <img slot="icon" src="">
                    <span slot="label">监测中心</span>
                </tabbar-item>
                <tabbar-item :selected="selected.video" show-dot link="video">
                    <img slot="icon" src="" >
                    <span slot="label">监控中心</span>
                </tabbar-item>
                <tabbar-item :selected="selected.user" link="/">
                    <img slot="icon" src="">
                    <span slot="label">个人中心</span>
                </tabbar-item>
            </tabbar>
    </div>
</template>

<script>
    import { Tabbar, TabbarItem } from 'vux'

    export default {
        components: {
            Tabbar,
            TabbarItem,
        },
        props: ['environment', 'video', 'user'],
        data () {
            return {
                selected: {
                    environment: this.environment,
                    video: this.video,
                    user: this.user
                }
            }
        }
    }
</script>