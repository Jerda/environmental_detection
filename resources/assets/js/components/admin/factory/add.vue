<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>圈舍管理</el-breadcrumb-item>
                        <el-breadcrumb-item>添加圈舍</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11" :class="custom_col">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="名称">
                            <el-input size="small" v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-col :span="8">
                                    <el-select size="small" v-model="form.factory_status" placeholder="请选择状态">
                                        <el-option label="空置" :value="0"></el-option>
                                        <el-option label="正常" :value="1"></el-option>
                                        <el-option label="满载" :value="2"></el-option>
                                    </el-select>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">类型</el-col>
                            <el-col :span="8">
                                    <el-select size="small" v-model="form.type" placeholder="请选择类型">
                                        <el-option label="无自动" :value="0"></el-option>
                                        <el-option label="半自动" :value="1"></el-option>
                                        <el-option label="全自动" :value="2"></el-option>
                                    </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="饲养模式">
                            <el-col :span="8">
                                <el-select size="small" v-model="form.farm_mode" placeholder="请选择饲养模式">
                                    <el-option label="散养" :value="0"></el-option>
                                    <el-option label="限位栏" :value="1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">密封性</el-col>
                            <el-col :span="8">
                                <el-select size="small" v-model="form.sealing" placeholder="请选择密封性">
                                    <el-option label="无" :value="0"></el-option>
                                    <el-option label="有" :value="1"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="排污">
                            <el-col :span="8">
                                <el-select size="small" v-model="form.sewage" placeholder="请选择排污">
                                    <el-option label="无" :value="0"></el-option>
                                    <el-option label="有" :value="1"></el-option>
                                </el-select>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">通风方式</el-col>
                            <el-col :span="8">
                                <el-select size="small" v-model="form.fan_mode" placeholder="请选择通风方式">
                                    <el-option label="无" :value="0"></el-option>
                                    <el-option label="有" :value="1"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="圈舍长">
                            <el-col :span="8">
                                <el-input size="small" v-model="form.length">
                                    <template slot="append">米</template>
                                </el-input>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">圈舍宽</el-col>
                            <el-col :span="8">
                                <el-input size="small" v-model="form.width">
                                    <template slot="append">米</template>
                                </el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="风机数量">
                            <el-col :span="8">
                                <el-input size="small" v-model="form.fan_num"></el-input>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">湿帘数量</el-col>
                            <el-col :span="8">
                                <el-input size="small" v-model="form.cooling_pad_num"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="面积">
                            <el-col :span="8">
                                <el-input size="small" v-model="form.area"></el-input>
                            </el-col>
                            <el-col class="line" :span="4" :offset="3">畜生数</el-col>
                            <el-col :span="8">
                                <el-input size="small" v-model="form.animal_num"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="地址">
                            <custom_address :province="form.province"
                                     :city="form.city"
                                     :district="form.district"
                                     @change="address"></custom_address>
                        </el-form-item>
                        <el-form-item label="详细地址">
                            <el-input size="small" v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="form.remark">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button v-if="page_mode == 'add'" size="small" type="primary" @click="add">添加</el-button>
                            <el-button v-else size="small" type="primary" @click="modify">修改</el-button>
                            <el-button size="small">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="11" :class="custom_col">
                    <el-row type="flex" justify="center">
                        <el-col :span="14">
                            <div v-for="item in form.region" style="border: 1px solid rgb(223, 223, 223);border-radius: 4px;height: 28px">
                                <div style="float: left;margin-top: 3px;margin-left: 10px">
                                    <span>{{ item.name }}</span>
                                </div>
                                <div style="margin-top: -1px;margin-right: -1px;float: right;">
                                    <el-button size="mini" icon="el-icon-delete"></el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <!--<el-row type="flex" justify="center">
                        <el-form>
                            <el-form-item>
                                <el-select size="small" v-model="form.region" placeholder="请选择活动区域">
                                    <el-option label="区域一" value="shanghai"></el-option>
                                    <el-option label="区域二" value="beijing"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-if="page_mode == 'add'" size="small" type="primary" @click="">添加区域</el-button>
                                <el-button v-else size="small" type="primary" @click="">修改区域</el-button>
                                <el-button size="small">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-row>-->
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import custom_address from '../modules/address.vue';
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Form, FormItem, Select, Option, Card } from 'element-ui';

    export default {
        components: {
            custom_address,
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-select': Select,
            'el-option': Option,
            'el-card': Card,
        },
        data() {
            return {
                page_mode: 'add',
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
                    regions: [],
                },
                custom_col: 'custom_col',
                custom_row_1: 'custom_row_1',
                custom_row_2: 'custom_row_2'
            }
        },
        props: ['id'],
        methods: {
            add() {
                axios.post('/current/factory/add', this.form).then(response =>{
                    if (response.data.factory_status == 1) {
                        this.$message.success(response.data.msg);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            modify() {
                this.form.id = this.id;

                axios.post('/current/factory/modify', this.form).then(response =>{
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            address: function(value) {
                this.form.province = value.province;
                this.form.city = value.city;
                this.form.district = value.district;
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                if (this.id !== undefined) {
                    axios.post('/current/factory/get', {id:this.id}).then(response => {
                        this.form = response.data.data;
                        this.page_mode = 'modify';
                    });
                }
            });
        }
    }
</script>

<style scoped>
    .custom_col {
        padding: 20px;
        margin-left: 15px;
        border: 1px solid #d5d6d6;
    }

    .custom_row_1 {
        border: 1px solid #d5d6d6;
    }

    .custom_row_2 {
        border: 1px solid #d5d6d6;
    }
</style>