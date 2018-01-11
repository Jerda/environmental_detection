<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>云管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10" :offset="1" style="margin-top: 10px">
                    <el-card class="box-card">
                        <el-form ref="form" :model="form" label-width="70px">
                            <el-form-item label="AppKey">
                                <el-input size="small" v-model="form.app_key"></el-input>
                            </el-form-item>
                            <el-form-item label="Secret">
                                <el-input size="small" v-model="form.secret"></el-input>
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
    import { Container, Main, Row, Col, Form, FormItem, Button, Input, Breadcrumb, BreadcrumbItem, Card} from "element-ui"

    export default {
        components: {
            'el-container': Container,
            'el-main': Main,
            'el-row': Row,
            'el-col': Col,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-card': Card
        },
        data() {
            return {
                form: {
                    app_key: '',
                    secret: ''
                }
            }
        },
        methods: {
            get: function() {
                axios.post('/api/yun/ysyun/get').then(response => {
                    this.form.app_key = response.data.data.app_key;
                    this.form.secret = response.data.data.secret;
                });
            },
            set: function() {
                axios.post('/api/yun/ysyun/set', this.form).then(response => {
                    this.$message.success(response.data.msg);
                });
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.get();
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
