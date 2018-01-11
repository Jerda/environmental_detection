<template>
    <el-menu
            :default-active="defaultSelected"
            mode="horizontal"
            background-color="#24262f"
            text-color="#fff"
            active-text-color="#ffd04b"
            @select="select">
        <el-menu-item index="current">监控中心</el-menu-item>
        <el-menu-item index="wechat">微信设置</el-menu-item>
        <el-menu-item index="system">系统设置</el-menu-item>
    </el-menu>
</template>

<script>
    import { Menu, MenuItem, Submenu } from 'element-ui'

    export default {
        components: {
            'el-menu': Menu,
            'el-menu-item': MenuItem,
            'el-submenu': Submenu
        },
        data() {
            return {
                defaultSelected: 'current'
            }
        },
        methods: {
            select: function(key) {
                this.$emit('selected', key);
            }
        }
    }
</script>
