<template>
    <el-row class="admin-top">
        <el-col :span="4">
            <span class="admin-title">后台管理系统</span>
        </el-col>
        <el-col :span="2" :offset="11">
            <a href="#" @click="logout" style="font-size: 15px">登录</a>
        </el-col>
    </el-row>
</template>

<script>
    import { Row, Col } from 'element-ui'

    export default {
        components: {
            'el-col': Col,
            'el-row': Row,
        }
    }
</script>

<style>
    .admin-top {
        /*margin-top: 5px;*/
        color: white;
        font-size: 20px;
    }
</style>