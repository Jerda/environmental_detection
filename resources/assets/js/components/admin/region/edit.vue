<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>区域管理</el-breadcrumb-item>
                        <el-breadcrumb-item>编辑区域</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11" :class="custom_col">
                    <el-form ref="form" :model="region_form" label-width="80px">
                        <el-form-item label="区域名称">
                            <el-input size="small" v-model="region_form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input size="small" type="textarea" v-model="region_form.remark"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" type="primary" @click="edit">编辑</el-button>
                            <el-button size="small" @click="back">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="11" :class="custom_col">
                    <el-row type="flex" justify="center">
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem, Form, FormItem } from 'element-ui';

    export default {
        components: {
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-form': Form,
            'el-form-item': FormItem
        },
        data() {
            return {
                region_form: {
                    name: '',
                    remark: ''
                },
                custom_col: 'custom_col',
                custom_row_1: 'custom_row_1',
                custom_row_2: 'custom_row_2'
            }
        },
        props: ['id'],
        methods: {
            edit: function() {

            },
            back: function() {
                this.$router.go(-1);
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                console.log(this.id);
                axios.post('/current/region/get', {id:this.id}).then(response => {
                    console.log(response.data.data);
                    this.region_form = response.data.data;
                });
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
</style>