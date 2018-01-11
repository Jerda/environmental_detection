<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>养户管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input
                            v-model="search_data.name"
                            size="small"
                            placeholder="姓名"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.code"
                            size="small"
                            placeholder="养户编号"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.mobile"
                            size="small"
                            placeholder="电话"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.organization"
                            size="small"
                            placeholder="所属机构"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="3">
                    <el-select size="small" clearable placeholder="状态" v-model="search_data.status">
                        <el-option label="仅关注" :value="0"></el-option>
                        <el-option label="正常" :value="1"></el-option>
                        <el-option label="待审批" :value="2"></el-option>
                        <el-option label="驳回" :value="3"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getFarmers">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="farmers"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="farmer.code"
                            label="养户编号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="farmer.organization"
                            label="所属机构"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="电话">
                    </el-table-column>
                    <el-table-column
                            label="圈舍">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toFactory(scope.row.farmer.id)">{{ scope.row.farmer.factory_count }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="管理员">
                        <template slot-scope="scope">
                            <span v-if="scope.row.farmer.is_admin == 1">是</span>
                            <span v-else>否</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="添加权限">
                        <template slot-scope="scope">
                            <span v-if="scope.row.farmer.is_admin == 1|| scope.row.farmer.is_add == 1">有</span>
                            <span v-else>无</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            <StatusDropdown
                                    :status="scope.row.status"
                                    :user_id="scope.row.id"
                                    :name="scope.row.name"
                                    :type="type='养户申请'"
                                    @change="status"></StatusDropdown>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="farmer.worker.user.name"
                            label="负责人">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="showUserDetail(scope.row.id)">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getFarmers"></paginate>
            </el-row>

            <UserDetail :user_data="userDetail.data" :show="userDetail.show"
                        @close="userDetail.show = false;" @modify="modifyUser"></UserDetail>
        </el-main>
    </el-container>
</template>

<script>
    import paginate from "../modules/paginate.vue";
    import StatusDropdown from "../modules/status_dropsdown.vue"
    import UserDetail from "../user/detail.vue"
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn, Select, Option, Dropdown, DropdownMenu, DropdownItem, Dialog, Form, FormItem } from 'element-ui';

    export default {
        components: {
            paginate,
            StatusDropdown,
            UserDetail,
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
            'el-dialog': Dialog,
            'el-form': Form,
            'el-form-item': FormItem
        },
        props: ['id', 'worker_id'],
        data() {
            return {
                paginate_total: 0,
                current_page: 1,
                farmers: [],
                userDetail: {
                    data: '',
                    show: false,
                },
                search_data: {
                    id: '',
                    name: '',
                    code: '',
                    mobile: '',
                    organization: '',
                    status: '',
                    worker_id: ''
                },
                dialog: {
                    noPassDialog: false,
                    form: {
                        user_id: '',
                        content: '',
                    },
                    name: '',
                    formLabelWidth: '80px',
                }
            }
        },
        methods: {
            getFarmers: function(page) {
                //用于传值跳转
                if (this.id !== undefined) {
                    this.search_data.id = this.id;
                }
                if (this.worker_id !== undefined) {
                    this.search_data.worker_id = this.worker_id;
                }
                axios.post('/api/user/farmer/getAll', {page:page, limit: 1, search: this.search_data}).then(response => {
                    this.farmers = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            status: function(val) {
                axios.post('/api/user/status', val).then(response => {
                    this.$message.success(response.data.msg);
                    this.getFarmers(this.current_page);
                });
            },
            showUserDetail: function(user_id) {
                axios.post('/api/user/get', {user_id:user_id}).then(response => {
                    this.userDetail.data = response.data.data;
                    this.userDetail.show = true;
                });
            },
            modifyUser: function() {
                this.getFarmers(this.current_page);
            },
            //根据养户ID跳转圈舍，查询所属圈舍
            toFactory: function(farmer_id) {
                this.$router.push({name: 'factory-by-farmer_id', params: {farmer_id: farmer_id}});
            },
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getFarmers(this.current_page);
            });
        },
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>

