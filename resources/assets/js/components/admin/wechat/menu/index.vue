<template>
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="24">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="2">
                    <el-button size="small" plain @click="showAddMenu(true)">添加按钮</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button size="small" plain @click="issueMenus">发布菜单</el-button>
                </el-col>
                <el-col :span="2">
                    <el-button size="small" plain disabled>同步菜单</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-table
                            :data="menus"
                            style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table :data="props.row.children">
                                    <el-table-column
                                            prop="name"
                                            label="名称"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="type"
                                            label="类型"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="url"
                                            label="连接">
                                    </el-table-column>
                                    <el-table-column
                                            prop="key_word"
                                            label="关键字">
                                    </el-table-column>
                                    <el-table-column
                                            label="操作">
                                        <template slot-scope="scope">
                                            <el-button @click="showModifyMenu(scope.row)" type="text" size="small">编辑</el-button>
                                            <el-button type="text" size="small" @click="delMenu(scope.row.id)">删除</el-button>
                                            <el-button type="text" size="small"
                                                       :disabled="scope.row.sort_id == 0"
                                                       @click="modifyIndex(scope.row.parent_id, scope.row.sort_id, 'up')">上移</el-button>
                                            <el-button type="text" size="small"
                                                       :disabled="scope.$index == props.row.children.length - 1"
                                                       @click="modifyIndex(scope.row.parent_id, scope.row.sort_id, 'down')">下移</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="名称"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="type"
                                label="类型"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="url"
                                label="连接">
                        </el-table-column>
                        <el-table-column
                                prop="key_word"
                                label="关键字">
                        </el-table-column>
                        <el-table-column
                                label="操作">
                            <template slot-scope="scope">
                                <el-button @click="showModifyMenu(scope.row)" type="text" size="small">编辑</el-button>
                                <el-button type="text" size="small" @click="delMenu(scope.row.id)">删除</el-button>
                                <el-button type="text" size="small"
                                           :disabled="scope.row.sort_id == 0"
                                           @click="modifyIndex(scope.row.parent_id, scope.row.sort_id, 'up')">上移</el-button>
                                <el-button type="text" size="small"
                                           :disabled="scope.$index == menus.length - 1"
                                           @click="modifyIndex(scope.row.parent_id, scope.row.sort_id, 'down')">下移</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-alert
                        title="注意:"
                        description="1.自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单
                                     2.一级菜单最多4个汉字，二级菜单最多7个汉字，多出来的部分将会以“...”代替。"
                        type="warning"
                        :closable="false"
                        show-icon>
                </el-alert>
            </el-row>

            <!-----------------------添加按钮页面----------------------->
            <el-dialog title="添加按钮" :visible.sync="dialogFormVisible" width="500px" center>
                <el-form :model="add_form">
                    <el-form-item label="上级菜单" :label-width="formLabelWidth">
                        <el-select v-model="add_form.parent_id" placeholder="请选择">
                            <el-option label="一级菜单" :value="0"></el-option>
                            <el-option v-for="level_one in level_one_menus"
                                        :key="level_one.value" :label="level_one.name" :value="level_one.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="显示名称" :label-width="formLabelWidth">
                        <el-input v-model="add_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单类型" :label-width="formLabelWidth">
                        <el-select v-model="add_form.type" placeholder="请选择类型">
                            <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="超链接" v-show="isView" :label-width="formLabelWidth">
                        <el-input v-model="add_form.url" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="关键字回复" v-show="isKeyWord" :label-width="formLabelWidth">
                        <el-input v-model="add_form.key_word" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="showAddMenu(false)">取 消</el-button>
                    <el-button v-if="mode == 'add'" type="primary" @click="addMenu">添 加</el-button>
                    <el-button v-else type="primary" @click="modifyMenu">修改</el-button>
                </div>
            </el-dialog>
            <!------------------------------------------------------->

        </el-main>
    </el-container>
</template>

<script>
    import { Container, Main, Row, Col, Button, Input, Breadcrumb, BreadcrumbItem,
        Table, TableColumn, Select, Option, Dialog, Form, FormItem, Alert } from 'element-ui';

    export default {
        components: {
            'el-container': Container,
            'el-main': Main,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
            'el-input': Input,
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem,
            'el-select': Select,
            'el-option': Option,
            'el-table': Table,
            'el-table-column': TableColumn,
            'el-dialog': Dialog,
            'el-form': Form,
            'el-form-item': FormItem,
            'el-alert': Alert
        },
        data() {
            return {
                mode: 'add',
                menus: [],
                level_one_menus: [],
                dialogFormVisible: false,
                add_form: {
                    parent_id: '',
                    name: '',
                    type: '',
                    url: '',
                    key_word: ''
                },
                types: [],
                isView: false,
                isKeyWord: false,
                formLabelWidth: '120px',
            }
        },
        methods: {
            //发布按钮
            issueMenus: function() {
                axios.post('/api/wechat/menu/issue').then(response => {
                    if (response.data.status === 1) {
                        this.$message.success(response.data.msg);
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            //获取所有按钮
            getMenus: function() {
                axios.post('/api/wechat/menu/getMenus').then(response => {
                    this.menus = response.data.data;
                });
            },
            //获取一级按钮
            getLevelOneMenus: function() {
                axios.post('/api/wechat/menu/getLevelOnes').then(response => {
                    this.level_one_menus = response.data.data;
                });
            },
            showModifyMenu: function(menu) {
                this.add_form = {
                        id: menu.id,
                        parent_id: menu.parent_id,
                        name: menu.name,
                        type: menu.type,
                        url: menu.url,
                        key_word: menu.key_word
                };
                this.mode = 'modify';
                this.dialogFormVisible = true;
            },
            modifyMenu: function() {
                axios.post('/api/wechat/menu/modify', this.add_form).then(response => {
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                        this.getMenus();
                        this.dialogFormVisible = false;
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            showAddMenu: function(show) {
                this.formatAddForm();
                this.dialogFormVisible = show;
            },
            addMenu: function() {
                this.dialogFormVisible = false;
                axios.post('/api/wechat/menu/add', this.add_form).then(response => {
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                        this.getMenus();
                    } else {
                        this.$message.error(response.data.msg);
                    }
                }).catch(error => {});
            },
            delMenu: function(id) {
                axios.post('/api/wechat/menu/del', {id:id}).then(response => {
                    if (response.data.status == 1) {
                        this.$message.success(response.data.msg);
                        this.getMenus();
                    } else {
                        this.$message.error(response.data.msg);
                    }
                });
            },
            //改变按钮排序
            modifyIndex: function(parent_id, sort_id, direction) {
                let data = {parent_id: parent_id, sort_id: sort_id, direction: direction};
                axios.post('/api/wechat/menu/modifySortId', data).then(response => {
                    this.getMenus();
                });
            },
            formatAddForm() {
                this.add_form = {
                    parent_id: null,
                    name: null,
                    type: null,
                    url: null,
                    key_word: null
                };
            }
            //添加按钮页面中的类型判断
            /*initType: function(event) {
                if (event == 0) {
                    this.types = [
                        {value:'button', label:'无事件的一级菜单'},
                        {value:'view', label:'超链接'},
                        {value:'click', label:'关键字回复'},
                    ];
                } else {
                    this.types = [
                        {value:'view', label:'超链接'},
                        {value:'click', label:'关键字回复'},
                    ];
                }
            },*/
            /*changeType: function(event) {
                if (event == 'view') {
                    this.isView = true;
                    this.isKeyWord = false;
                } else if (event == 'click') {
                    this.isView = false;
                    this.isKeyWord = true;
                }
            }*/
        },
        watch: {
            'add_form.parent_id': function(val) {
                if (val == 0) {
                    this.types = [
                        {value:'button', label:'无事件的一级菜单'},
                        {value:'view', label:'超链接'},
                        {value:'click', label:'关键字回复'},
                    ];
                } else if(val ==  null) {
                    this.types = [];
                } else {
                    this.types = [
                        {value:'view', label:'超链接'},
                        {value:'click', label:'关键字回复'},
                    ];
                }
            },
            'add_form.type': function (val) {
                if (val == 'view') {
                    this.isView = true;
                    this.isKeyWord = false;
                } else if (val == 'click') {
                    this.isView = false;
                    this.isKeyWord = true;
                } else {
                    this.isView = false;
                    this.isKeyWord = false;
                }
            }
        },
        mounted: function() {
            this.$nextTick(function() {
                this.getMenus();
                this.getLevelOneMenus();
            });
        }
    }
</script>

<style>
    .el-table__expanded-cell {
        background-color: #f5f7fa
    }
</style>