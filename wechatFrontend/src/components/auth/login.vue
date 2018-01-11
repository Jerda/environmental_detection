<template>
    <div>
        <top :title="title"></top>
        <group>
            <x-input title="密码" v-model="form.password"></x-input>
        </group>
        <group>
            <x-button>登录</x-button>
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
                title: '用户登录',
                form: {
                    username: '',
                    password: '',
                    password_confirmation: '',
                }
            }
        },
        methods: {
            /*
             登录动作
             */
            login: function() {
                this.$store.dispatch('loginRequest', this.form).then(response => {
                    this.$router.push({'name':'user'});
                });
            },
            /*
            获取用户open_id
             */
            getOpenId: function() {
                this.axios.post('/api/user/openid').then(response => {
                    this.username = response.data;
                });
            }
        },
        mounted: function() {
            this.getOpenId();
        }

    }
</script>