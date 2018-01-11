<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-form :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" v-model="form.password_confirmation"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码">
                        <el-col :span="12">
                            <el-input v-model="form.captcha"></el-input>
                        </el-col>
                        <img v-bind:src="captcha_src" ref="captcha" @click="refresh" data-captcha-config="default" style="float: right;">
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="register">注 册</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { Container, Main, Row, Col, Button, Input, Form, FormItem } from 'element-ui';

    export default {
        components: {
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-form': Form,
            'el-form-item': FormItem
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
                    password_confirmation: '',
                    captcha: ''
                },
                captcha_src: '',
            }
        },
        methods: {
            /*
             验证码点击刷新
             */
            refresh: function() {
                this.captcha = '';  //清除验证码内容
                let config = this.$refs.captcha.attributes['data-captcha-config'].value;
                let url_refresh = '/captcha/' + config + '/?' + Math.random();
                this.captcha_src = url_refresh;
            },
            /*
             注册
             */
            register: function() {
                axios.post('/api/auth/registerAdmin', this.form).then(response => {
                    let that = this;
                    let message = '';

                    if (response.data.status == 1) {
                        that.$message(response.data.message);
                    } else {
                        this.refresh();
                        $.each(response.data.msg, function() {
                            message += this[0] + '  ';
                        });
                        that.$message.error(message);
                    }
                })
            }
        },
        mounted: function() {
            this.$nextTick(function () {
                this.refresh();
            })
        }
    }
</script>