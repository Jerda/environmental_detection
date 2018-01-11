<template>
    <div>
        <card :header="{title:header}">
            <div slot="content" class="card-padding">
                <span>状态</span>
                <span>地址</span>
            </div>
            <div slot="footer">
                <span>查看区域</span>
                <span>添加区域</span>
            </div>
        </card>
    </div>
</template>

<script>
    import { Card } from 'vux'

    export default {
        components: {
            Card
        },
        props: [],
        data () {
            return {
                header: '',
                content: '',
                footer: '',
            }
        }
    }
</script>