<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>审批驳回记录</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input
                            v-model="search_data.name"
                            size="small"
                            placeholder="请输入姓名"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.type"
                            size="small"
                            placeholder="请输入申请类型"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getExamines">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="examines"
                        style="width: 100%">
                    <el-table-column
                            prop="user.name"
                            label="申请人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="申请类型"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="驳回原因">
                    </el-table-column>
                    <el-table-column
                            prop="admin.username"
                            label="操作人"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="created_at"
                            label="操作时间"
                            width="180">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getExamines"></paginate>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
//    import ElRow from "element-ui/packages/row/src/row";
    import paginate from '../modules/paginate.vue';
    import { Container, Main, Row, Col, Table, TableColumn,
    Button, Input, Breadcrumb, BreadcrumbItem } from 'element-ui';

    export default {
        components: {
            paginate,
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-table': Table,
            'el-table-column': TableColumn,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
        },
        data() {
            return {
                paginate_total: 0,
                current_page: 1,
                examines: [],
                search_data: {
                    name: '',
                    type: ''
                },
            }
        },
        methods: {
            getExamines: function(page) {
                axios.post('/api/examine/getAll', {page:page, limit: 1, search:this.search_data}).then(response => {
                    this.examines = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getExamines(this.current_page);
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>