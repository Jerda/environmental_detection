<template>
    <div>
        <popup v-model="show" height="100%">
            <div class="popup">
                <group title="申请圈舍">
                    <x-input title="名称" v-model="form.name"></x-input>
                    <x-input title="备注" v-model="form.remark"></x-input>
                </group>
                <x-button type="primary" @click.native="add">申请区域</x-button>
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