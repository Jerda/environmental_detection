<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input
                            v-model="search_data.name"
                            size="small"
                            placeholder="请输入员工名称"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getWorkers">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="workers"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="电话"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            label="部门">
                    </el-table-column>
                    <el-table-column
                            label="养户">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toFarmer(scope.row.worker.id)">{{ scope.row.worker.farmer_count }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态">
                        <template slot-scope="scope">
                            <StatusDropdown
                                    :status="scope.row.status"
                                    :user_id="scope.row.id"
                                    :name="scope.row.name"
                                    :type="type='员工申请'"
                                    @change="status"></StatusDropdown>
                        </template>
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
                <paginate :total="paginate_total" @change="getWorkers"></paginate>
            </el-row>

            <UserDetail :user_data="userDetail.data" :show="userDetail.show"
                        @close="userDetail.show = false;" @modify="modifyUser"></UserDetail>
        </el-main>
    </el-container>
</template>

<script>
    import paginate from "../modules/paginate.vue"
    import StatusDropdown from "../modules/status_dropsdown.vue"
    import UserDetail from "../user/detail.vue"
    import { Container, Main, Row, Col, Table, TableColumn, Dropdown, DropdownMenu, DropdownItem,
        Button, Input, Breadcrumb, BreadcrumbItem, Form, FormItem, Select, Option, Dialog} from 'element-ui'

    export default {
        components: {
            paginate,
            StatusDropdown,
            UserDetail,
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
            'el-form': Form,
            'el-form-item': FormItem,
            'el-dropdown': Dropdown,
            'el-dropdown-item': DropdownItem,
            'el-dropdown-menu': DropdownMenu,
            'el-select': Select,
            'el-option': Option,
            'el-dialog': Dialog
        },
        data() {
            return {
                paginate_total: 0,
                current_page: 1,
                workerDetailDialog: false,
                workers: [],
                search_data: {
                    name: ''
                },
                workerDetail_form: {
                    name: '',
                    status: '',
                    sex: '',
                    mobile: '',
                    QQ: '',
                    remark: ''
                },
                userDetail: {
                    data: '',
                    show: false,
                },
            }
        },
        methods: {
            getWorkers: function(page) {
                axios.post('/api/user/worker/getAll', {page:page, limit: 1, search: this.search_data}).then(response => {
                    this.workers = response.data.data.data;
                    console.log(this.workers);
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            showModifyWorker: function(user_id) {
                this.workerDetailDialog = true;
                axios.post('/api/user/worker/get', {user_id:user_id}).then(response => {
                    this.workerDetail_form = response.data.data;
                });
            },
            actionModifyWorker: function() {
                this.workerDetailDialog = false;
                axios.post('/api/user/worker/modify', this.workerDetail_form).then(response => {
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            showUserDetail: function(user_id) {
                axios.post('/api/user/get', {user_id:user_id}).then(response => {
                    this.userDetail.data = response.data.data;
                    this.userDetail.show = true;
                });
            },
            modifyUser: function() {
                this.getWorkers(this.current_page);
            },
            status: function(val) {
                axios.post('/api/user/status', val).then(response => {
                    this.$message.success(response.data.msg);
                    this.getWorkers(this.current_page);
                });
            },
            toFarmer: function(worker_id) {
                this.$router.push({name: 'farmer-by-worker', params: {worker_id: worker_id}});
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getWorkers(this.current_page);
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>