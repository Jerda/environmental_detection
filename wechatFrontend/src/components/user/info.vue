<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :user="true"></tab>
        <group>
            <x-input title="姓名" v-model="form.name"></x-input>
            <x-input title="手机号" v-model="form.mobile"></x-input>
            <x-input title="验证码" v-model="form.captcha"></x-input>
            <x-input title="身份证" v-model="form.idcard"></x-input>
            <x-input title="养户编号" v-model="form.code"></x-input>
            <x-input title="所属机构" v-model="form.organization"></x-input>
            <x-input title="QQ" v-model="form.QQ"></x-input>
            <!--<selector title="负责人" v-model="form.worker_id"></selector>-->
        </group>
        <group>
            <x-button type="primary">修改资料</x-button>
        </group>
    </div>
</template>

<script>
    import tab from '../layouts/tab.vue'
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