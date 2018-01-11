<template>
    <div>
        <popup v-model="show" height="100%">
            <div class="popup">
                <group title="申请圈舍">
                    <x-input title="名称" v-model="form.name"></x-input>
                    <selector title="类型" v-model="form.type" :options="option.type" placeholder="请选择类型"></selector>
                    <selector title="饲养模式" v-model="form.farm_mode" :options="option.farm_mode" placeholder="请选择饲养模式"></selector>
                    <selector title="密封性" v-model="form.sealing" :options="option.sealing" placeholder="请选择密封性"></selector>
                    <selector title="排污" v-model="form.sewage" :options="option.sewage" placeholder="请选择排污"></selector>
                    <selector title="通风方式" v-model="form.fan_mode" :options="option.fan_mode" placeholder="请选择通风方式"></selector>
                    <x-input title="圈舍长" v-model="form.length"></x-input>
                    <x-input title="圈舍宽" v-model="form.width"></x-input>
                    <x-input title="面积" v-model="form.area"></x-input>
                    <x-input title="风机数量" v-model="form.fan_num"></x-input>
                    <x-input title="湿帘数量" v-model="form.cooling_pad_num"></x-input>
                    <x-input title="畜生数" v-model="form.animal_num"></x-input>
                    <x-input title="详情地址" v-model="form.address"></x-input>
                    <x-input title="备注" v-model="form.remark"></x-input>
                </group>
                <x-button type="primary" @click.native="add">申请圈舍</x-button>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XButton, Group, XInput, Selector, Popup } from 'vux'

    export default {
        components: {
            XButton,
            Group,
            XInput,
            Selector,
            Popup,
        },
        props: ['isShow'],
        data () {
            return {
                title: '申请圈舍',
                show: this.isShow,
                form: {
                    name: '',
                    factory_status: '',
                    type: '',
                    farm_mode: '',
                    sealing: '',
                    sewage: '',
                    fan_mode: '',
                    length: '',
                    width: '',
                    fan_num: '',
                    cooling_pad_num: '',
                    area: '',
                    animal_num: '',
                    province: '',
                    city: '',
                    district: '',
                    address: '',
                    remark: '',
                },
                option: {
                    type: [{key:1, value: '无自动'}, {key:2, value: '半自动'}, {key:3, value: '全自动'}],
                    farm_mode: [{key:1, value: '散养'}, {key:2, value: '限位栏'}],
                    sealing: [{key:0, value: '无'}, {key:1, value: '有'}],
                    sewage: [{key:0, value: '无'}, {key:1, value: '有'}],
                    fan_mode: [{key:0, value: '无'}, {key:1, value: '有'}],
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