<template>
    <el-row type="flex" justify="center">
        <b>后台管理系统</b>
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

<style scoped>
    .el-row {
        margin-top: 100px;
        font-size: 25px;
    }
</style>