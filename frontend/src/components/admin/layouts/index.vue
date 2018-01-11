<template>
    <el-container direction="vertical">
        <el-header height="65px" style="background-color: #24262f">
            <top @topMenuSelected="topMenuSelected"></top>
        </el-header>
        <el-container style="height:100%">
            <el-aside width="200px" style="background-color:#383e49;">
                <left-menu :showMenus="showLeftMenu"></left-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer style="height: 30px">
            <span>2017 © 技术支持 四川联创信通科技有限公司</span>
        </el-footer>
    </el-container>
</template>

<script>
    import {Container, MenuItemGroup, Submenu, Main, Aside, MenuItem, Header, Row, Col, Menu, Footer} from 'element-ui'
    import jwtToken from '@/components/admin/helpers/jwt'
    import leftMenu from '@/components/admin/layouts/left_menu.vue'
    import top from '@/components/admin/layouts/top.vue'


    export default {
        components: {
            leftMenu,
            top,
            'el-container': Container,
            'el-menu-item-group': MenuItemGroup,
            'el-submenu': Submenu,
            'el-main': Main,
            'el-aside': Aside,
            'el-menu-item': MenuItem,
            'el-header': Header,
            'el-col': Col,
            'el-row': Row,
            'el-menu': Menu,
            'el-footer': Footer
        },
        data() {
            return {
                showLeftMenu: '',
            }
        },
        created() {
            //保证刷新认证不丢失
            if (jwtToken.getToken()) {
                this.$store.dispatch('setAuthUser');
            } else {
                this.$router.push({'name': 'login'});
            }
        },
        methods: {
            topMenuSelected: function (val) {
                this.showLeftMenu = val;
            }
        }
    }
</script>

<style>
    .el-main {
        padding: 5px
    }

    .el-container {
        height: 100%;
    }

    .el-row {
        margin-top: 15px
    }

    .el-footer {
        position: relative;
        background: #eee;
        color: #696767;
    }

    .el-footer span {
        width: 22%;
        height: 70%;
        overflow: auto;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }



</style>

