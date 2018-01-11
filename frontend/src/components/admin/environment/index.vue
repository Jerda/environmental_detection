<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>监控设备管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input
                            v-model="search_data.user_name"
                            size="small"
                            placeholder="请输入申请人"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.factory_name"
                            size="small"
                            placeholder="请输入圈舍"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.region_name"
                            size="small"
                            placeholder="请输入区域"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getEnvironments">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="environments"
                        style="width: 100%">
                    <el-table-column
                            label="申请人"
                            prop="farmer.user.name"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="region.factory.name"
                            label="所属圈舍">
                    </el-table-column>
                    <el-table-column
                            prop="region.name"
                            label="所属区域">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="湿度监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.illumination !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="温度监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.temperature !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="光照监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.humidity !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="CO2监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.CO2 !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="NH3监控">
                        <template slot-scope="scope">
                            <span v-if="scope.row.NH3 !== null">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            <StatusDropdown
                                    :status="scope.row.status"
                                    :environment_id="scope.row.id"
                                    :user_id="scope.row.farmer.user.id"
                                    :name="scope.row.farmer.user.name"
                                    :type="type='环境监控设备申请'"
                                    @change="status"></StatusDropdown>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <el-button v-if="scope.row.status == 1" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getEnvironments"></paginate>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import paginate from "../modules/paginate.vue"
    import StatusDropdown from "../modules/status_dropsdown.vue"
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';

    export default {
        components: {
            paginate,
            StatusDropdown,
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
            'el-dropdown': Dropdown,
            'el-dropdown-item': DropdownItem,
            'el-dropdown-menu': DropdownMenu
        },
        data() {
            return {
                paginate_total: 0,
                environments: [],
                pass_dialog: {          //审批通过

                },
                nopass_dialog: {        //审批驳回

                },
                search_data: {
                    user_name: '',
                    factory_name: '',
                    region_name: '',
                    environment_name: ''
                }
            }
        },
        methods: {
            getEnvironments: function(page) {
                axios.post('/current/environment/getAll', {page:page,limit:1,search: this.search_data}).then(response => {
                    this.environments = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                });
            },
            status: function(val) {
                axios.post('/current/environment/status', val).then(response => {
                    this.$message.success(response.data.msg);
                    this.getEnvironments();
                });
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getEnvironments();
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>