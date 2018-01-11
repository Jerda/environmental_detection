<template>
    <div>
        <card :header="{title:header}">
            <div slot="content" class="card-padding">
                <span>监控设备</span>
                <span>温度</span>
                <span>湿度</span>
                <span>CO2</span>
                <span>NH3</span>
            </div>
            <div slot="footer">
                <span>添加设备</span>
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