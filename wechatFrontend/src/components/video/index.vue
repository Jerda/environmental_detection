<template>
    <div>
        <video-top :title="title" :isBack="false" @left="show_factory = true" @right="show_region = true"></video-top>
        <tab :video="true"></tab>
        <div>
            <video  src="http://hls.open.ys7.com/openlive/e5e050d0ee1a4db0b5aa8a676c611eb4.hd.m3u8"
                    width="360px" height="250px" controls="" x5-playsinline="true" playsinline="true"
                    webkit-playsinline="" poster="" autoplay="true" preload="auto"></video>
        </div>
        <change-factory :isShow="show_factory" @close="show_factory = false"></change-factory>
        <change-region :isShow="show_region" @close="show_region = false"></change-region>
    </div>
</template>

<script>
    import tab from '../layouts/tab.vue'
    import VideoTop from '../layouts/video_top.vue'
    import ChangeFactory from '../factory/change_factory.vue'
    import ChangeRegion from '../region/change_region.vue'

    export default {
        components: {
            tab,
            VideoTop,
            ChangeFactory,
            ChangeRegion
        },
        data () {
            return {
                title: '监控中心',
                show_factory: false,
                show_region: false,
            }
        },
        methods: {

        }

    }
</script>