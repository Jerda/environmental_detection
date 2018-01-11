<template>
    <div>
        <popup v-model="show" height="100%">
            <div class="popup">
                <group title="申请监控">
                    <x-input title="名称" v-model="form.name"></x-input>
                    <x-input title="序列号" v-model="form.deviceSerial"></x-input>
                    <x-input title="验证码" v-model="form.validateCode"></x-input>
                </group>
                <x-button type="primary" @click.native="add">申请监控</x-button>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XButton, Group, XInput, Selector, Popup } from 'vux'

    export default {
        component: {
            XButton,
            Group,
            XInput,
            Selector,
            Popup,
        },
        props: ['isShow'],
        data () {
            return {
                show: this.isShow,
                form: {
                    name: '',
                    remark: ''
                }
            }
        },
        methods: {
            add: function() {
                this.$emit('close');
//                this.$emit('add', this.form);
            }
        },
        watch: {
            isShow (val) {
                this.show = this.isShow;
            }
        }
    }
</script>