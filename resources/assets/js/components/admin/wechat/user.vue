<template>
    <el-container v-loading="loading"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>微信用户</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-input
                            size="small"
                            placeholder="请输入内容"
                            v-model="nickname"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="8">
                    <el-date-picker
                            size="small"
                            v-model="date"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" size="small" @click="synchronizeUsers">同步微信用户</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="users"
                        style="width: 100%">
                    <el-table-column
                            label="头像"
                            width="180">
                        <template slot-scope="scope">
                            <img :src="scope.row.wechat.avatar" alt=""  width="40" height="40">
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="wechat.nickname"
                            label="昵称"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机号">
                    </el-table-column>
                    <el-table-column
                            prop="wechat.sex"
                            label="性别">
                    </el-table-column>
                    <el-table-column
                            prop="wechat.city"
                            label="城市">
                    </el-table-column>
                    <el-table-column
                            prop="wechat.subscribe_time"
                            label="关注时间">
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
                <paginate :total="paginate_total" @change="getUsers"></paginate>
            </el-row>

            <UserDetail :user_data="userDetail.data" :show="userDetail.show"
                        @close="userDetail.show = false;" @modify="modifyUser"></UserDetail>
        </el-main>
    </el-container>
</template>

<script>
    import UserDetail from "../user/detail.vue"
    import paginate from "../modules/paginate.vue"
    import { Container, Main, Row, Col, Table, TableColumn,
        Button, Input, Breadcrumb, BreadcrumbItem, DatePicker } from 'element-ui'

    export default {
        components: {
            UserDetail,
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
            'el-date-picker': DatePicker
        },
        data() {
            return {
                loading: false,
                paginate_total: 0,
                current_page: 1,
                nickname: '',
                date: '',
                users: [],
                search_data: [],
                userDetail: {
                    data: '',
                    show: false,
                },
            }
        },
        methods: {
            synchronizeUsers: function() {
                this.loading = true;
                axios.post('/api/wechat/user/synchronize_user').then(response => {
                    this.loading = false;
                    this.message(response);
                });
            },
            getUsers: function(page) {
                axios.post('/api/wechat/user/getWechatUsers', {page:page, limit: 1, search: this.search_data}).then(response => {
                    this.users = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            showUserDetail: function(user_id) {
                axios.post('/api/user/get', {user_id:user_id}).then(response => {
                    this.userDetail.data = response.data.data;
                    this.userDetail.show = true;
                });
            },
            modifyUser: function() {
                this.getUsers(this.current_page);
            },
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getUsers(this.current_page);
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>