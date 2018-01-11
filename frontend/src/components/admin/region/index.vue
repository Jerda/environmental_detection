<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>区域管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input
                            v-model="search_data.name"
                            size="small"
                            placeholder="请输入圈舍名称"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getAll">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="regions"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="区域名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="factory.name"
                            label="所属圈舍"
                            width="180">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toFactory(scope.row.factory.id)">{{ scope.row.factory.name }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="湿度监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.environment.illumination !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="温度监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.environment.temperature !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="光照监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.environment.humidity !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="CO2监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.environment.CO2 !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="NH3监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.environment.NH3 !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="视频监控设备">
                        <template slot-scope="scope">
                            <span v-if="scope.row.video.length == 0" style="color: red;">无</span>
                            <span v-else style="color: green;">有</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="remark"
                            label="备注">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="showEdit(scope.row.id)">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getAll"></paginate>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import paginate from "../modules/paginate.vue";
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn } from 'element-ui';

    export default {
        components: {
            paginate,
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-table': Table,
            'el-table-column': TableColumn,
        },
        data() {
            return {
                paginate_total: 0,
                current_page: 1,
                regions: [],
                search_data: {
                    name: ''
                },
            }
        },
        methods: {
            getAll: function(page) {
                axios.post('/api/region/getAll', {page:page, limit: 1, search: this.search_data}).then(response => {
                    this.regions = response.data.data.data;
                    console.log(this.regions);
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            showEdit: function(id) {
                this.$router.push({name:'region-edit', params: {id:id}});
            },
            //跳转到圈舍页面，显示该ID圈舍
            toFactory: function(id) {
                this.$router.push({name:'factory', params: {id:id}});
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getAll(this.current_page);
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>