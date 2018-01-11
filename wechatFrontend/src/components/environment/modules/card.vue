<template>
    <div>
        <card :header="{title:header}">
            <div slot="content" class="card-padding">
                <div style="width:50%;float:left">
                    <img  width="50" height="50">
                </div>
                <div style="width:50%;float:right;">
                    <div style="font-size: 12px"></div>
                    <div style="font-size: 12px"></div>
                </div>
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