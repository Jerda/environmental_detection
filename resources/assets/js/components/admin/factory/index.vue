<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>圈舍管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input
                            v-model="search_form.name"
                            size="small"
                            placeholder="请输入圈舍名称"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-select size="small" v-model="search_form.factory_status" clearable placeholder="请选择状态">
                        <el-option label="空置" value="0"></el-option>
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="满载" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-select size="small" v-model="search_form.type" clearable placeholder="请选择类型">
                        <el-option label="无自动" value="0"></el-option>
                        <el-option label="半自动" value="1"></el-option>
                        <el-option label="全自动" value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button type="primary" size="small" @click="showAddFactory">添加圈舍</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="factories"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="名称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="所属养户"
                            width="100">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toFarmer(scope.row.farmer.user.id)">{{ scope.row.farmer.user.name }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="状态"
                            width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.factory_status == 0">空置</span>
                            <span v-else-if="scope.row.factory_status == 1">正常</span>
                            <span v-else-if="scope.row.factory_status == 2">满载</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="类型"
                            width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type == 0">无自动</span>
                            <span v-else-if="scope.row.type == 1">半自动</span>
                            <span v-else-if="scope.row.type == 2">全自动</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
                        <template slot-scope="scope">
                            <span>{{ scope.row.province }} {{ scope.row.city }} {{ scope.row.district
                                }} {{ scope.row.address }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                        <template slot-scope="scope">
                            <StatusDropdown
                                    :status="scope.row.status"
                                    :factory_id="scope.row.id"
                                    :user_id="scope.row.farmer.user.id"
                                    :name="scope.row.farmer.user.name"
                                    :type="type='圈舍申请'"
                                    @change="status"></StatusDropdown>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="180">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="showAddRegion(scope.row.id)">添加区域</el-button>
                            <el-button type="text" size="small" @click="showEditFactory(scope.row.id)">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getAll"></paginate>
            </el-row>

            <!-----------------------添加区域页面----------------------->
            <el-dialog title="添加区域" :visible.sync="AddRegionDialog" width="500px" center>
                <el-form label-width="80px" :model="region_form">
                    <el-form-item label="区域名称">
                        <el-input placeholder="请输入内容" v-model="region_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="region_form.remark"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="AddRegionDialog = false">取 消</el-button>
                    <el-button type="primary" @click="addRegion">添加</el-button>
                </div>
            </el-dialog>
            <!------------------------------------------------------->
        </el-main>
    </el-container>
</template>

<script>
    import Paginate from "../modules/paginate.vue";
    import StatusDropdown from "../modules/status_dropsdown.vue"
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn, Select, Option, Dropdown, DropdownMenu, DropdownItem, Dialog } from 'element-ui';

    export default {
        components: {
            Paginate,
            StatusDropdown,
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-dropdown': Dropdown,
            'el-dropdown-item': DropdownItem,
            'el-dropdown-menu': DropdownMenu,
            'el-select': Select,
            'el-option': Option,
            'el-table': Table,
            'el-table-column': TableColumn,
            'el-dialog': Dialog
        },
        props: ['id', 'farmer_id'],
        data() {
            return {
                factories: [],
                AddRegionDialog: false,
                region_form: {
                    name: '',
                    remark: '',
                    factory_id: '',
                },
                search_form: {
                    id: '',
                    farmer_id: '',
                    name: '',
                    factory_status: '',
                    type: ''
                },
                paginate_total: 0,
                current_page: 1,
            }
        },
        methods: {
            getAll: function (page) {
                if (this.id !== undefined) {
                    this.search_form.id = this.id;
                }
                if (this.farmer_id !== undefined) {
                    this.search_form.farmer_id = this.farmer_id;
                }
                axios.post('/api/factory/getAll', {
                    page: page,
                    limit: 1,
                    search: this.search_form
                }).then(response => {
                    this.factories = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            showAddFactory: function () {
                this.$router.push({name: 'factory-add'});
            },
            showAddRegion: function (factory_id) {
                this.AddRegionDialog = true;
                this.region_form.factory_id = factory_id;
                this.region_form.name = '';
                this.region_form.remark = '';
            },
            showEditFactory: function (id) {
                this.$router.push({name: 'factory-add', params: {id: id}});
            },
            addRegion: function () {
                axios.post('/api/region/add', this.region_form).then(response => {
                    this.AddRegionDialog = false;
                    this.$message.success(response.data.msg);
                });
            },
            search: function () {
                this.getAll(1);
            },
            status: function(val) {
                axios.post('/api/factory/status', val).then(response => {
                    this.$message.success(response.data.msg);
                    this.getAll(this.current_page);
                });
            },
            //点击养户名称跳转
            toFarmer: function(id) {
                this.$router.push({name: 'farmer', params: {id: id}});
            }
        },
        mounted: function () {
            this.$nextTick(function () {
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
