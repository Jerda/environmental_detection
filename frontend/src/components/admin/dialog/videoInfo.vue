<template>
    <!----------------------------------------------------------------------
                                监控信息
    ------------------------------------------------------------------------>
    <el-dialog title="监控状态" :visible.sync="dialogShow" width="700px" >
        <el-form v-loading="dialog_loading"
                 element-loading-text="获取数据中"
                 element-loading-spinner="el-icon-loading">
            <el-form-item label="序列号" :label-width="formLabelWidth">
                <el-col :span="8">
                    <el-input size="small" v-model="form.deviceSerial" :disabled="true"></el-input>
                </el-col>
                <el-col class="line" :span="3" :offset="1">设备名称</el-col>
                <el-col :span="8">
                    <el-input size="small" v-model="form.deviceName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="型号" :label-width="formLabelWidth">
                <el-col :span="8">
                    <el-input size="small" v-model="form.model" :disabled="true"></el-input>
                </el-col>
                <el-col class="line" :span="3" :offset="1">设备状态</el-col>
                <el-col :span="8">
                    <el-select size="small" v-model="form.status" placeholder="请选择状态" :disabled="true">
                        <el-option label="不在线" :value="0"></el-option>
                        <el-option label="在线" :value="1"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button v-if="form.status == 1" size="small" @click="videoLive">直播</el-button>
            <el-button size="small" @click="close">取 消</el-button>
        </div>
    </el-dialog>
    <!------------------------------------------------------------------->
</template>

<script>
    import { Dialog, Button, Form, FormItem, Col, Select, Option, Input } from "element-ui"
    export default {
        components: {
            'el-dialog': Dialog,
            'el-button': Button,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-col': Col,
            'el-select': Select,
            'el-option': Option,
            'el-input': Input
        },
        props: ['show', 'id'],
        data () {
            return {
                dialog_loading: true,
                videoId: this.id,
                dialogShow: this.show,
                formLabelWidth: '80px',
                form: {
                    deviceSerial: '',
                    deviceName: '',
                    model: '',
                    status: ''
                }
            }
        },
        methods: {
            info: function() {
                axios.post('/api/video/getInfo', {id:this.videoId}).then(response => {
                    this.dialog_loading = false;
                    if (response.data.status == 1) {
                        this.form = response.data.data;
                    } else {
                        this.message(response);
                    }
                });
            },
            close: function() {
                this.$emit('close');
                this.form = {};
                this.dialog_loading = true;
            },
            videoLive: function() {
                this.$emit('videoLive', this.videoId);
                this.close();
            }
        },
        watch: {
            show (val) {
                this.dialogShow = val;
            },
            dialogShow (val) {
                if (!val) {
                    this.close();
                } else {
                    this.info();
                }
            }
        }
    }
</script>