<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :user="true"></tab>
        <group>
            <x-input title="手机号" v-model="form.mobile"></x-input>
        </group>
        <group>
            <x-button type="primary"></x-button>
        </group>
    </div>
</template>

<script>
    import tab from '../../layouts/tab.vue'
    import { Group, XInput, Selector, XButton } from 'vux'

    export default {
        components: {
            Group,
            XInput,
            Selector,
            XButton,
            tab
        },
        data () {
            return {
                title: '用户信息',
                form: {
                    name: '',
                    mobile: '',
                    captcha: '',
                    idcard: '',
                    code: '',
                    organization: '',
                    QQ: '',
                    worker_id: ''
                }
            }
        }
    }
</script>