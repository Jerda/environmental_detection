<template>
    <el-container>
        <el-main>
            <div id="particle"></div>
            <top></top>
            <el-row type="flex" justify="center">
                <el-card class="box-card">
                    <div class="title">
                        <span>登  录</span>
                    </div>
                    <el-form :model="form">
                        <el-form-item>
                            <el-input v-model="form.username">
                                <template slot="prepend">
                                    <i class="el-icon-fa-user-o"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="password" v-model="form.password">
                                <template slot="prepend">
                                    <i class="el-icon-fa-lock"></i>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-row>
        </el-main>
        <el-footer style="height: 30px;">
            <bottom></bottom>
        </el-footer>
    </el-container>
</template>

<script>
    import JWTToken from '../helpers/jwt'
    import top from './top.vue'
    import bottom from './bottom.vue'
    import { Container, Main, Row, Col, Button, Input, Form, FormItem, Footer, Header, Card } from 'element-ui';
    import Particleground from 'Particleground.js'

    const Particle = Particleground.particle

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
            'el-card': Card,
            top,
            bottom
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
                    this.$router.push({'name':'index'});
                }).catch(error => {
                    this.$message.error(error.response.data.msg);
                });
            }
        },
        mounted: function() {
            let x = new Particle('#particle', {
                color: ['#3b424a'],
                maxSpeed: 0.5,
                minSpeed: 0.2,
            })
            axios.post('/api/test').then(response => {
                console.log('test11111');
            });
        }
    }
</script>

<style>
    #particle {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }
    .el-aside {
        display: none;
    }
    .el-menu {
        display: none;
    }
    .el-button {
        width: 100%;
    }
    .box-card {
        width: 340px;
        height: 300px;
        margin-top: 20px;
    }
    .el-container {
        background: #d2d6de;
    }
    .title {
        margin-bottom: 20px;
        margin-left: 125px;
        font-size: 20px;
    }
    .el-footer {
        background: #d2d6de;
    }
</style>