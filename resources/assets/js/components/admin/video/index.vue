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
                        <el-breadcrumb-item>监控设备管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-input
                            v-model="search_data.user__name"
                            size="small"
                            placeholder="请输入申请人"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.factory__name"
                            size="small"
                            placeholder="请输入圈舍"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.region__name"
                            size="small"
                            placeholder="请输入区域"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-input
                            v-model="search_data.video__name"
                            size="small"
                            placeholder="请输入设备名称"
                            clearable>
                    </el-input>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" icon="el-icon-search" @click="getVideos">搜索</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="videos"
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
                            label="设备名称">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="设备品牌">
                    </el-table-column>
                    <el-table-column
                            prop="deviceSerial"
                            label="设备序列号">
                    </el-table-column>
                    <el-table-column
                            prop="validateCode"
                            label="设备验证码">
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            <StatusDropdown
                                    :status="scope.row.status"
                                    :video_id="scope.row.id"
                                    :user_id="scope.row.farmer.user.id"
                                    :name="scope.row.farmer.user.name"
                                    :deviceSerial="scope.row.deviceSerial"
                                    :validateCode="scope.row.validateCode"
                                    :type="type='监控申请'"
                                    @change="status" @checkVideoInfo="videoInfo(scope.row.id)"></StatusDropdown>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small">编辑</el-button>
                            <!--<el-button v-if="scope.row.status == 1" type="text" size="small" @click="videoLive(scope.row.id)">直播</el-button>-->
                            <!--<a href="/live">live</a>-->
                            <el-button v-if="scope.row.status == 1" type="text" size="small" @click="delVideo(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <paginate :total="paginate_total" @change="getVideos"></paginate>
            </el-row>

            <video-live :id="videoLive_dialog.id" :show="videoLive_dialog.show" @close="videoLive_dialog.show = false"></video-live>
            <video-info :id="1" :show="videoInfo_dialog.show" @close="videoInfo_dialog.show = false" @videoLive="videoLive"></video-info>
        </el-main>
    </el-container>
</template>

<script>
    import paginate from "../modules/paginate.vue"
    import StatusDropdown from "../modules/status_dropsdown.vue"
    import videoInfo from "../dialog/videoInfo.vue"
    import videoLive from "../dialog/videoLive.vue"
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn, Select, Option, Dropdown, DropdownMenu, DropdownItem, Dialog, Form, FormItem } from 'element-ui';

    export default {
        components: {
            paginate,
            StatusDropdown,
            videoInfo,
            videoLive,
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
        data() {
            return {
                loading: false,
                paginate_total: 0,
                current_page: 1,
                videos: [],
                pass_dialog: {          //审批通过
                    addVideoDialog: false,
                    formLabelWidth: '100px',
                    form_data: {
                        deviceSerial: '', //设备序列号
                        validateCode: ''  //设备验证码
                    },
                    true_button: true,
                    false_button:false,
                },
                nopass_dialog: {        //审批驳回
                    dialog: false,
                    formLabelWidth: '100px',
                    form_data: {
                        content: '', //驳回原因
                        user_id: '', //申请人ID
                        id: ''       //当前摄像头申请记录ID
                    }
                },
                videoInfo_dialog: {
                    show: false,
                },
                videoLive_dialog: {
                    show: false,
                    id: '',
                },
                search_data: {
                    user__name: '',
                    factory__name: '',
                    region__name: '',
                    video__name: ''
                },
            }
        },
        methods: {
            getVideos: function(page) {
                axios.post('/api/video/getAll', {page:page,limit:1,search: this.search_data}).then(response => {
                    this.videos = response.data.data.data;
                    this.paginate_total = response.data.data.total;
                    this.current_page = response.data.data.current_page;
                });
            },
            delVideo: function(id) {
                this.loading = true;
                axios.post('/api/video/del', {id:id}).then(response => {
                    this.loading = false;
                    if (response.data.status == 1) {
                        this.getVideos(this.current_page);
                        this.$message.success(response.data.msg);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            status: function(val) {
                axios.post('/api/video/status', val).then(response => {
                    this.$message.success(response.data.msg);
                    this.getVideos(this.current_page);
                });
            },
            videoInfo: function(id) {
                this.videoInfo_dialog.show = true;
            },
            /*getInfo: function(id) {
                axios.post('/api/video/getInfo', {id:id}).then(response => {
                    this.$message.success(response.data.msg);
                    this.getVideos(this.current_page);
                });
            },*/
            videoLive: function(id) {
                this.videoLive_dialog.show = true;
                this.videoLive_dialog.id = id;
            },
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getVideos(this.current_page);
            });
        }
    }
</script>

<style scoped>
    .el-row {
        margin-top: 15px
    }
</style>