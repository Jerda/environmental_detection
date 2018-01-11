<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>微信配置</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12" :offset="1" style="margin-top: 10px">
                    <el-card class="box-card">
                        <el-form ref="form" :model="form" label-width="120px">
                            <el-form-item label="公众号名称">
                                <el-input size="small" v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="微信号">
                                <el-input size="small" v-model="form.wechat_id"></el-input>
                            </el-form-item>
                            <el-form-item label="原始ID">
                                <el-input size="small" v-model="form.init_wechat_id"></el-input>
                            </el-form-item>
                            <el-form-item label="AppID">
                                <el-input size="small" v-model="form.app_id"></el-input>
                            </el-form-item>
                            <el-form-item label="AppSecret">
                                <el-input size="small" v-model="form.app_secret"></el-input>
                            </el-form-item>
                            <el-form-item label="API">
                                <el-input size="small" v-model="form.api"></el-input>
                            </el-form-item>
                            <el-form-item label="TOKEN">
                                <el-input size="small" v-model="form.token"></el-input>
                            </el-form-item>
                            <el-form-item label="EncodingAESKey">
                                <el-input size="small" v-model="form.encoding_aes_key"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="set">设置</el-button>
                                <el-button>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem, Form, FormItem, Card } from 'element-ui';

    export default {
        components:{
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
            'el-card': Card
        },
        data() {
            return {
                form: {
                    name: '',
                    wechat_id: '',
                    init_wechat_id: '',
                    app_id: '',
                    app_secret: '',
                    api: '',
                    token: '',
                    encoding_aes_key: '',
                }
            }
        },
        methods: {
            set() {
                axios.post('/api/wechat/config/set', this.form).then(response => {
                    this.$message(response.data.msg);
                })
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                axios.post('/api/wechat/config/get').then(response => {
                })
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }

    .el-form-item {
        width:95%
    }
</style>
