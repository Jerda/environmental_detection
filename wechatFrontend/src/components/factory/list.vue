<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :environment="true"></tab>
        <card :header="{title:header}">
            <div slot="content" class="card-padding">

            </div>
            <div slot="footer">
                <span>查看区域</span>
                <span>添加区域</span>
            </div>
        </card>
        <x-button type="primary">添加圈舍</x-button>
    </div>
</template>

<script>
    import tab from '../layouts/tab.vue'
    import { Card, XButton } from 'vux'

    export default {
        components: {
            XButton,
            Card,
            tab
        },
        data () {
            return {
                title: '我的圈舍',
                header: 'xxx圈舍',
            }
        }
    }
</script>