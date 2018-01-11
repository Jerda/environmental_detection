<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                        <el-breadcrumb-item>编辑员工</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <!--<div style="width:80%;border: 1px solid red">-->
                <el-row type="flex" justify="center" style="width:80%;border:1px solid #cccccc;background-color: white">
                    <el-col :span="14" style="margin-top: 40px">
                        <el-form label-width="80px">
                            <el-form-item label="姓名">
                                <el-input size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="状态">
                                <el-select size="small" value="">
                                    <el-option value=""></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select size="small" value="">
                                    <el-option label="女" value="0"></el-option>
                                    <el-option label="男" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ号">
                                <el-input size="small"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input size="small" type="textarea" :rows="2"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small">修改</el-button>
                                <el-button size="small">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
            </el-row>
        </el-main>
    </el-container>
</template>