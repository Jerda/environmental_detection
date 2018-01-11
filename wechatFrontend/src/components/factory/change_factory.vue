<template>
    <div>
        <popup v-model="show" height="40%" @on-hide="close">
            <div>
                <picker :data='options' v-model='data' @on-change='change'></picker>
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
                    ['圈舍名称1', '圈舍名称2', '圈舍名称3', '圈舍名称4'],
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