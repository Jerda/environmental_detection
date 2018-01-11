<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-card class="box-card">
                    <div>
                        <i class="fa fa-user-o" aria-hidden="true"></i>
                    </div>
                    <span>登  录</span>
                    <el-form :model="form" label-width="80px">
                        <el-form-item label="用户名">
                            <el-input placeholder="请输入内容" v-model="form.username">
                                <!--<template slot="prepend">
                                    <div>
                                        <i class="fa fa-user-o" aria-hidden="true"></i>
                                    </div>
                                </template>-->

                            </el-input>
                            <!--<el-input v-model="form.username"></el-input>-->
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input type="password" placeholder="请输入内容" v-model="form.password">
                                <template slot="prepend">Http://</template>
                            </el-input>
                            <!--<el-input type="password" v-model="form.password"></el-input>-->
                        </el-form-item>
                        <!--<el-form-item label="验证码">
                            <el-col :span="12">
                                <el-input v-model="form.captcha"></el-input>
                            </el-col>
                            <img v-bind:src="captcha_src" ref="captcha" @click="refresh" data-captcha-config="default" style="float: right;">
                        </el-form-item>-->
                        <el-form-item>
                            <el-button type="primary" @click="login">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import JWTToken from '../helpers/jwt'
//    import top from './top.vue'
    import { Container, Main, Row, Col, Button, Input, Form, FormItem, Footer, Header, Card } from 'element-ui';

    export default {
        components: {
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-header': Header,
            'el-footer': Footer,
            'el-card': Card
//            top
        },
        data() {
            return {
                form: {
                    username: '',
                    password: '',
//                    captcha: ''
                },
//                captcha_src: '',
            }
        },
        methods: {
            /*
             验证码点击刷新
             */
            /*refresh: function() {
                this.captcha = '';  //清除验证码内容
                let config = this.$refs.captcha.attributes['data-captcha-config'].value;
                let url_refresh = '/captcha/' + config + '/?' + Math.random();
                this.captcha_src = url_refresh;
            },*/
            /*
             登录
             */
            login: function() {
                this.$store.dispatch('loginRequest', this.form).then(response => {
                    this.$router.push({'name':'admin'});
                });
            }
        },
        mounted: function() {
            this.$nextTick(function () {
//                this.refresh();
            })
        }
    }
</script>

<style>
    .el-aside {
        display: none;
    }
    .el-menu {
        display: none;
    }
</style>