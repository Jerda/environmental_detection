<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                        <el-breadcrumb-item>新建图文</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="15" :offset="1" style="margin-top: 50px;">
                    <el-form ref="form" :model="form" label-width="150px">
                        <el-form-item label="标题">
                            <el-col :span="15">
                                <el-input size="small" v-model="form.title"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-col :span="15">
                                <el-input size="small" v-model="form.author"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="正文">
                            <quill-editor v-model="form.content"
                                          ref="myQuillEditor">
                            </quill-editor>
                        </el-form-item>
                        <el-form-item label="原文链接">
                            <el-checkbox v-model="form.checked"></el-checkbox>
                            <div v-if="form.checked" style="width: 500px">
                                <el-input size="small" v-model="form.title"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="封面图片">
                            <el-upload
                                    class="avatar-uploader"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :show-file-list="false">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="摘要">
                            <el-col :span="15">
                                <el-input type="textarea" :rows="3"></el-input>
                            </el-col>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary">设置</el-button>
                            <el-button>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem, Form, FormItem, Upload, Checkbox } from 'element-ui';
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        components:{
            quillEditor,
            'el-upload': Upload,
            'el-checkbox': Checkbox,
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
                /*editorOption: {
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline','strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'color': [] }, { 'background': [] }],
                            ['image', 'link','code-block']
                        ]
                    },
                },*/
                form: {
                    title: '',
                    author: '',
                    content: '',
                    checked: '',
                },
                imageUrl: '',

            }
        },
        methods: {

        },
        mounted: function() {

        }
    }
</script>


<style>
    .ql-container{
        height: 200px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 100px;
        width: 100px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 50px;
        /*height: 178px;*/
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 50px;
        height: 50px;
        display: block;
    }
</style>
