<template>
    <!--邮箱 手机号 状态 姓名 性别  身份证号 QQ 备注 员工OR养户
        养户：（养户编号、所属机构、详情地址、负责人）-->
    <el-dialog title="用户详情" :visible.sync="dialogShow" width="680px">
        <el-form :model="user">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-input size="small" v-model="user.name"></el-input>
                </el-col>
                <el-col class="line" :span="2" :offset="2">微信名</el-col>
                <el-col :span="9">
                    <el-input size="small" v-model="wechat.nickname" disabled></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-input size="small" v-model="user.email"></el-input>
                </el-col>
                <el-col class="line" :span="2"  :offset="2">手机号</el-col>
                <el-col :span="9">
                    <el-input size="small" v-model="user.mobile"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="类型" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-select size="small" v-model="user_type" disabled>
                        <el-option label="微信会员" :value="0"></el-option>
                        <el-option label="员工" :value="1"></el-option>
                        <el-option label="养户" :value="2"></el-option>
                    </el-select>
                </el-col>
                <el-col class="line" :span="2" :offset="2">状态</el-col>
                <el-col :span="9">
                    <el-select size="small" v-model="user.status" disabled>
                        <el-option label="仅关注" :value="0"></el-option>
                        <el-option label="正常" :value="1"></el-option>
                        <el-option label="待审批" :value="2"></el-option>
                        <el-option label="驳回" :value="3"></el-option>
                        <el-option label="禁用" :value="4"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="身份证" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-input size="small" v-model="user.idcard"></el-input>
                </el-col>
                <el-col class="line" :span="2" :offset="2">性别</el-col>
                <el-col :span="9">
                    <el-select size="small" v-model="user.type" placeholder="请选择类型">
                        <el-option label="女" :value="0"></el-option>
                        <el-option label="男" :value="1"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>

            <el-form-item label="养户编号" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-input size="small" v-model="user.code"></el-input>
                </el-col>
                <el-col class="line" :span="2" :offset="2">机构</el-col>
                <el-col :span="9">
                    <el-input size="small" v-model="farmer.organization"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item label="QQ" :label-width="formLabelWidth">
                <el-col :span="9">
                    <el-input size="small" v-model="user.QQ"></el-input>
                </el-col>

                <el-col class="line" :span="2" :offset="2">负责人</el-col>
                <el-col :span="9">
                    <el-input size="small" v-model="farmer.worker.user.name" disabled></el-input>
                </el-col>

            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth">
                <el-col :span="17">
                    <el-input type="textarea" :rows="2" v-model="user.remark"></el-input>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="modify">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import { Col, Row,Input, Select, Option, Button, Dialog, Form, FormItem } from 'element-ui'

    export default {
        components: {
            'el-col': Col,
            'el-row': Row,
            'el-input': Input,
            'el-select': Select,
            'el-option': Option,
            'el-button': Button,
            'el-dialog': Dialog,
            'el-form': Form,
            'el-form-item': FormItem
        },
        props:['user_data', 'show'],
        data () {
            return {
                load: false,
                dialogShow: this.show,
                formLabelWidth: '80px',
                user: {
                    name: this.user_data.name,
                    email: this.user_data.email,
                    mobile: this.user_data.mobile,
                    status: this.user_data.status,
                    idcard: this.user_data.idcard,
                    sex: this.user_data.sex,
                    code: this.user_data.code,
                    QQ: this.user_data.QQ,
                    remark: this.user_data.remark,
                    isWorker: this.user_data.isWorker,
                    isFarmer: this.user_data.isFarmer,
                },
                farmer: {
                    organization: '',
                    address: '',
                    worker: {
                        user: {
                            name: '',
                        },
                    },
                },
                wechat: {
                    nickname: ''
                },
                user_type: 0,
            }
        },
        methods: {
            modify: function() {
                let data = this.user;
                data.farmer = this.farmer;
                axios.post('/current/user/modify', data).then(response => {
                    this.$message.success(response.data.msg);
                    this.dialogShow = false;
                    this.$emit('modify', data);
                });
            }
        },
        watch: {
            show () {
                this.dialogShow = this.show;
                this.user = this.user_data;
                if (this.user.isWorker == 1) {
                    this.user_type = 1;
                } else if (this.user.isFarmer == 1) {
                    this.user_type = 2;
                }
                if (this.user.farmer !== null) {
                    this.farmer = this.user.farmer;
                }
                if (this.user.wechat !== null) {
                    this.wechat = this.user.wechat;
                }
            },
            dialogShow () {
                if (!this.dialogShow) {
                    this.$emit('close');
                }
            }
        }
    }
</script>

