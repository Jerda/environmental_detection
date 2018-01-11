<template>
    <div>
        <el-button v-if="form.status == 0" size="mini">仅关注</el-button>
        <el-dropdown v-else-if="form.status == 1" trigger="click">
            <el-button size="mini" type="success">正常<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <el-button type="text" @click="checkVideoInfo">查看状态</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                    <el-button type="text" @click="disable">禁用</el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else-if="form.status == 2" trigger="click">
            <el-button size="mini" type="warning">待审批<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <el-button type="text" @click="pass">通过</el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                    <el-button type="text" @click="showReject">驳回</el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else-if="form.status == 3" trigger="click">
            <el-button size="mini" type="danger">驳回<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看申请记录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown v-else-if="form.status == 4" trigger="click">
            <el-button size="mini" type="danger">禁用<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <el-button type="text" @click="pass">通过</el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!--------------------------------------------------------------------------->
        <el-dialog title="驳回申请" :visible.sync="rejectDialog.show" width="500px">
            <el-form :model="rejectDialog.form">
                <el-form-item label="申请人" :label-width="rejectDialog.formLabelWidth">
                    <el-input :disabled="true" v-model="rejectDialog.form.name"></el-input>
                </el-form-item>
                <el-form-item label="原因" :label-width="rejectDialog.formLabelWidth">
                    <el-input type="textarea" v-model="rejectDialog.form.content"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="rejectDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="reject">确 定</el-button>
            </div>
        </el-dialog>
        <!--------------------------------------------------------------------------->

        <!------------------------监控审批通过-------------------------------->
        <el-dialog title="审批通过" :visible.sync="videoPassDialog.show" width="400px"
                   v-loading="loading"
                   element-loading-text="设备添加中"
                   element-loading-spinner="el-icon-loading"
                   element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-form>
                <el-form-item label="设备序列号" :label-width="videoPassDialog.formLabelWidth">
                    <el-input v-model="videoPassDialog.form.deviceSerial" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="设备验证码" :label-width="videoPassDialog.formLabelWidth">
                    <el-input v-model="videoPassDialog.form.validateCode" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="videoPassDialog.show = false">取 消</el-button>
                <el-button type="primary" @click="addVideo">确 定</el-button>
            </div>
        </el-dialog>
        <!------------------------------------------------------------------->


    </div>
</template>

<script>
    import {Button, Input, Dropdown, DropdownMenu, DropdownItem, Dialog, Form, FormItem, MessageBox} from 'element-ui'

    Vue.prototype.$confirm = MessageBox.confirm;

    export default {
        components: {
            'el-input': Input,
            'el-button': Button,
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem,
            'el-dialog': Dialog,
            'el-form': Form,
            'el-form-item': FormItem
        },
        props: ['status', 'name', 'user_id', 'factory_id', 'video_id', 'environment_id', 'type', 'validateCode', 'deviceSerial'],
        data () {
            return {
                loading: false,
                form: {
                    status: this.status,
                },
                rejectDialog: {
                    show: false,
                    formLabelWidth: '80px',
                    form: {
                        status: '',
                        name: this.name,
                        user_id: this.user_id,
                        factory_id: this.factory_id,
                        video_id: this.video_id,
                        environment_id: this.environment_id,
                        type: this.type,
                        content: '',
                    },
                },
                videoPassDialog: {
                    show: false,
                    formLabelWidth: '100px',
                    form: {
                        deviceSerial: this.deviceSerial,
                        validateCode: this.validateCode
                    }
                }
            }
        },
        methods: {
            showReject: function () {
                this.rejectDialog.show = true;
                this.rejectDialog.form.conten = '';
            },
            reject: function() {
                this.rejectDialog.show = false;
                this.rejectDialog.form.status = 3;
                this.$emit('change', this.rejectDialog.form);
            },
            pass: function() {
                if (this.rejectDialog.form.type == '监控申请') {
                    this.videoPassDialog.show = true;
                } else {
                    this.$confirm('确定要改变用户状态？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.rejectDialog.form.status = 1;
                        this.$emit('change', this.rejectDialog.form);
                    });
                }
            },
            disable: function() {
                this.$confirm('确定要改变用户状态?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.rejectDialog.form.status = 4;
                    this.$emit('change', this.rejectDialog.form);
                });
            },
            closeReject: function() {
                this.rejectDialog.show = false;
            },
            addVideo: function() {
                this.loading = true;
                axios.post('/current/video/add', this.videoPassDialog.form).then(response => {
                    this.loading = false;
                    if (response.data.status == 1) {
                        this.videoPassDialog.show = false;
                        this.$message.success(response.data.msg);
                        this.rejectDialog.form.status = 1;
                        this.$emit('change', this.rejectDialog.form);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            checkVideoInfo: function() {
                this.$emit('checkVideoInfo');
            }
        },
        watch: {
            status(val) {
                this.form.status = val;
            }
        }
    }
</script>