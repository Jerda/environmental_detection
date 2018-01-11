<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
                        <el-breadcrumb-item>添加菜单</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row>
                <el-form ref="form" :model="form" width="100px">
                <el-form-item label="显示名称">
                    <el-select size="small" v-model="form.region" placeholder="上级菜单">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="显示名称">
                    <el-input size="small" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="form.region" placeholder="菜单类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">添加按钮</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped>
    .el-form-item {
        width: 40%
    }
</style>