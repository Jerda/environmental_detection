<template>
    <div>
        <popup v-model="show" height="40%" @on-hide="close">
            <div>
                <picker :data='options' v-model='data' @on-change='change' :columns=2></picker>
            </div>
            <x-button>确定</x-button>
            <x-button>取消</x-button>
        </popup>
    </div>
</template>

<script>
    import { Picker, Popup, XButton } from 'vux'

    export default {
        components: {
            Picker,
            Popup,
            XButton
        },
        props: ['isShow'],
        data () {
            return {
                show: this.isShow,
                data: [],
                options: [
                    {
                        name: '区域1',
                        value: '1',
                        parent: 0
                    },
                    {
                        name: '区域2',
                        value: '2',
                        parent: 0
                    },
                    {
                        name: '视频1',
                        value: 's1',
                        parent: '1'
                    },
                    {
                        name: '视频2',
                        value: 's2',
                        parent: '1'
                    },
                    {
                        name: '视频1',
                        value: 's3',
                        parent: '2'
                    },
                ],
            }
        },
        methods: {
            change: function() {

            },
            close: function() {
                this.$emit('close');
            }
        },
        watch: {
            isShow () {
                this.show = this.isShow;
            }
        }
    }
</script>