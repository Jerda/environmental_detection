<template>
    <div>
        <top :title="title"></top>
        <group>
            <x-input title="密码" v-model="form.password"></x-input>
            <x-input title="确认密码" v-model="form.password_confirmation"></x-input>
        </group>
        <group>
            <x-button>注册</x-button>
        </group>
    </div>
</template>

<script>
    //todo 验证码未做
    import { Group, Cell, XInput, XButton } from 'vux'
    import top from '../layouts/top'

    export default {
        components: {
            Group,
            Cell,
            top,
            XInput,
            XButton
        },
        data () {
            return {
                title: '用户注册',
                form: {
                    username: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        methods: {
            /*
            注册动作
             */
            register: function() {

            }
        }
    }
</script>