<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="图文" name="first">
                        <el-col v-for="(o, index) in 8" :key="o" style="width:180px;margin-right:20px;margin-bottom:10px">
                            <el-card>
                                <div>
                                    <div class="span-title">title</div>
                                </div>
                                <img src="https://mmbiz.qlogo.cn/mmbiz_jpg/owKIKwSTFFYNsP7TN0YLbnEzBKPVz4Y19y9QcJydESkoDnG9NXXI5tSRslrk98xQToqFyGjwVFLtShf2GO5rcw/0?wx_fmt=jpeg" class="image">
                                <div style="padding: 14px;">
                                    <div class="digest">好吃的汉堡</div>
                                    <div class="bottom clearfix">
                                        <span class="time">123213423423</span>
                                        <el-button type="text" class="button" @click="detail">查看</el-button>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="图片" name="second">图片</el-tab-pane>
                    <el-tab-pane label="语音" name="third">语音</el-tab-pane>
                    <el-tab-pane label="视频" name="fourth">视频</el-tab-pane>
                </el-tabs>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import { Container, Main, Col, Row, Button, Input, Breadcrumb, BreadcrumbItem, Tabs, TabPane, Card } from "element-ui"

    export default {
        components: {
            'el-button': Button,
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-tabs': Tabs,
            'el-tab-pane': TabPane,
            'el-card': Card
        },
        data () {
            return {
                activeName: 'first'
            }
        },
        methods: {
            detail: function() {
                this.$router.push({name: 'wechat-material-add'});
            }
        },
    }
</script>

<style>
    .span-title {
        font-size: 20px;
    }
    .digest {
        font-size: 12px;
        color: #969696;
        margin-left: -25px;
    }
    .time {
        font-size: 13px;
        color: #999;
        margin-left: -25px;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
        margin-right: -20px;
    }
</style>