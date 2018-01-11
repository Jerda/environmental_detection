<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :user="true"></tab>
        <group>
            <x-input title="姓名" :show-clear="false" v-model="user.name"></x-input>
            <x-input title="手机号" :show-clear="false" v-model="user.mobile"></x-input>
            <cell title="申请时间" v-model="user.updated_at"></cell>
        </group>
        <group>
            <x-button type="primary">同意</x-button>
            <x-button type="warn" @click.native="showRejectConfirm = true">驳回</x-button>
        </group>

        <reject-confirm :isShow="showRejectConfirm" @close="showRejectConfirm = false"></reject-confirm>
    </div>
</template>

<script>
    import tab from '../../layouts/tab.vue'
    import RejectConfirm from '../../modules/reject'
    import { Group, XInput, Selector, XButton, Cell } from 'vux'

    export default {
        components: {
            Group,
            XInput,
            Selector,
            XButton,
            Cell,
            RejectConfirm,
            tab
        },
        props: ['user_id'],
        data () {
            return {
                title: '申请者信息',
                user: {
                    name: 'xxxx',
                    mobile: '13213434',
                    updated_at: '1027-32-12',
                },
                showRejectConfirm: false,
            }
        },
        methods: {

        }
    }
</script>