<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <bottom :user="true"></bottom>
        <tab>
            <tab-item selected @on-item-click="showList">管理者列表</tab-item>
            <tab-item @on-item-click="showApplyList">申请列表</tab-item>
        </tab>
        <user-list :user="users"></user-list>
    </div>
</template>

<script>
    import bottom from '../../layouts/tab.vue'
    import UserList from '../modules/list.vue'
    import { Tab, TabItem } from 'vux'

    export default {
        components: {
            Tab,
            UserList,
            TabItem,
            bottom
        },
        data () {
            return {
                title: '我的管理者',
                users: this.governors,
                governors: [
                    {
                        name: '用户1',
                        status: 1,
                    },
                    {
                        name: '用户2',
                        status: 1,
                    }
                ],
                applyGovernors: [
                    {
                        name: '用户3',
                        status: 2,
                    },
                    {
                        name: '用户4',
                        status: 2,
                    }
                ]
            }
        },
        methods: {
            showList: function() {
                this.users = this.governors;
            },
            showApplyList: function() {
                this.users = this.applyGovernors;
            },
        }
    }
</script>