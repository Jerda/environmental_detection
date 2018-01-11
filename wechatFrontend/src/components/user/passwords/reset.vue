<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :user="true"></tab>
        <group>
            <x-input title="原始密码" v-model="form.name"></x-input>
            <x-input title="新密码" v-model="form.mobile"></x-input>
            <x-input title="确认新密码" v-model="form.captcha"></x-input>
        </group>
        <group>
            <x-button type="primary">修改密码</x-button>
            <x-button type="primary" link="/userForgotPassword">忘记密码</x-button>
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