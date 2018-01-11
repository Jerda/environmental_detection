<template>
    <confirm v-model="show"
             show-input
             ref="confirm5"
             :title="title"
             @on-cancel="onCancel"
             @on-confirm="reject"
             @on-show="onShow">
    </confirm>
</template>

<script>
    import { Confirm } from 'vux'

    export default {
        components: {
            Confirm
        },
        props: ['isShow'],
        data () {
            return {
                title: '驳回理由',
                show: this.isShow,
                content: '',
            }
        },
        methods: {
            reject: function() {
                this.$emit('close');
            },
            onCancel: function() {
                this.$emit('close');
            },
            onShow: function() {

            },
        },
        watch: {
            isShow () {
                this.show = this.isShow
            }
        }
    }
</script>