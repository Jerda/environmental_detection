<template>
    <el-row class="admin-top">
        <el-col :span="4">
            <span class="admin-title">后台管理系统</span>
        </el-col>
        <el-col :span="7" style="margin-top: -10px">
            <top-menu @selected="topMenuSelected"></top-menu>
        </el-col>
        <el-col :span="2" :offset="11">
            <span style="font-size: 15px">{{ AuthUser.username }}</span>
            <!--<span style="font-size: 15px">dkdlskdjf</span>-->
            <a href="#" @click="logout" style="font-size: 15px; color: white">登出</a>
        </el-col>
    </el-row>
</template>

<script>
    import { Row, Col } from 'element-ui'
    import TopMenu from './top_menu.vue'

    export default {
        components: {
            'el-col': Col,
            'el-row': Row,
            TopMenu
        },
        data () {
            return {
                AuthUser: {
                    username: '__',
                },
            }
        },
        methods: {
            logout: function() {
                this.$store.dispatch('logoutRequest').then(response => {
                    this.$router.push({'name':'login'});
                });
            },
            //顶部按钮选择事件
            topMenuSelected: function(val) {
                this.$emit('topMenuSelected', val);
            },
        },
        mounted: function() {
            this.AuthUser = this.$store.state.AuthUser;
        },
    }
</script>

<style>
    .admin-top {
        /*margin-top: 5px;*/
        color: white;
        font-size: 20px;
    }
</style>