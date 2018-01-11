<template>
    <el-pagination
            background
            layout="prev, pager, next"
            :page-size="paginate.page_size"
            :total="paginate.total"
            @current-change="change">
    </el-pagination>
</template>

<script>
    import { Pagination } from 'element-ui'

    export default{
        components:{'el-pagination': Pagination},
//        name: 'paginate',
        props: ['total'],
        data () {
            return {
                paginate: {
                    total: this.total,
                    page_size: 1,
                },
                page: 1,
            }
        },
        methods: {
            change (val) {
                this.page = val;
            }
        },
        watch: {
            page: {
                handler: function (val) {
                    this.$emit('change', val);
                },
                deep: true
            },
            total(val) {
                this.paginate.total = val;
            }
        }
    }
</script>