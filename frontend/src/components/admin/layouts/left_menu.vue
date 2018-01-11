<template>
    <el-menu
            router
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#383e49"
            text-color="#fff"
            active-text-color="#ffd04b">
        <div v-show="show == 'current'">
            <el-submenu index="1">
                <template slot="title">
                    <!--<i class="el-icon-location"></i>-->
                    <span>会员管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/wechat-user">微信会员</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/factory">
                <span slot="title">圈舍管理</span>
            </el-menu-item>
            <el-menu-item index="/region">
                <span slot="title">区域管理</span>
            </el-menu-item>
            <el-menu-item index="/farmer">
                <span slot="title">养户管理</span>
            </el-menu-item>
            <el-menu-item index="/worker">
                <span slot="title">员工管理</span>
            </el-menu-item>
            <el-menu-item index="/video">
                <span slot="title">视频管理</span>
            </el-menu-item>
            <el-menu-item index="/environment">
                <span slot="title">环境控制器管理</span>
            </el-menu-item>
        </div>
        <div v-show="show == 'wechat'">
            <el-menu-item index="/wechat-config">
                <span slot="title">接口管理</span>
            </el-menu-item>
            <el-menu-item index="/wechat-menu">
                <span slot="title">自定义菜单</span>
            </el-menu-item>
            <el-menu-item index="/test">
                <span slot="title">自定义回复</span>
            </el-menu-item>
            <el-menu-item index="/wechat-material">
                <span slot="title">素材管理</span>
            </el-menu-item>
        </div>
        <div v-show="show == 'system'">
            <el-submenu index="1">
                <template slot="title">
                    <span>历史记录</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/history-reject">驳回记录</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/yun">
                <span slot="title">云管理</span>
            </el-menu-item>
            <el-menu-item index="/test">
                <span slot="title">管理员管理</span>
            </el-menu-item>
            <el-menu-item index="/test">
                <span slot="title">角色管理</span>
            </el-menu-item>
            <el-menu-item index="/test">
                <span slot="title">权限管理</span>
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script>
    import { Menu, MenuItemGroup, MenuItem, Submenu } from 'element-ui'

    export default {
        components: {
            'el-menu': Menu,
            'el-menu-item': MenuItem,
            'el-menu-item-group': MenuItemGroup,
            'el-submenu': Submenu
        },
        props: ['showMenus'],
        data() {
            return {
                show: 'current',
            }
        },
        watch: {
            showMenus() {
                this.show = this.showMenus;
            }
        }
    }
</script>

<style>
    .el-sumenu .el-menu-item{
        min-width:100% !important;
    }
    .el-aside > .el-menu{
        min-height:100% !important;
    }
    .el-submenu .el-menu-item{
        text-align: center;
        min-width:100% !important;
    }
</style>