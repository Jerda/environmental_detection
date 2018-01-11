<template>
    <div>
        <group>
            <x-input title="姓名" v-model="form.name"></x-input>
            <x-input title="手机号" v-model="form.mobile"></x-input>
            <x-input title="验证码" v-model="form.captcha"></x-input>
            <x-input title="身份证" v-model="form.idcard"></x-input>
            <x-input title="养户编号" v-model="form.code"></x-input>
            <x-input title="所属机构" v-model="form.organization"></x-input>
            <x-input title="QQ" v-model="form.QQ"></x-input>
            <selector title="负责人" v-model="form.worker_id"></selector>
        </group>
    </div>
</template>

<script>
    import { Group, XInput, Selector } from 'vux'

    export default {
        components: {
            Group,
            XInput,
            Selector
        },
        data () {
            return {
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