<template>
    <div id="app">
        <router-view></router-view>

        <!--<el-container direction="vertical">
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
        </el-container>-->
    </div>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style scoped>
    #app {
        height: 100%;
    }

    .el-container {
        height: 100%
    }

</style>

