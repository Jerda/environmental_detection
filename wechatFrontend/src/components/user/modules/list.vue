<template>
    <div>
        <group>
            <div v-for="item in users">
                <cell-box @click.native="userInfo(item.name)">
                    <!-- anything -->
                    <span>{{ item.name }}</span>
                    <x-button type="warn" mini v-if="item.status == 1">删除</x-button>
                </cell-box>
            </div>
        </group>
    </div>
</template>

<script>
    import { Group, CellBox, XButton } from 'vux'

    export default {
        components: {
            Group,
            CellBox,
            XButton
        },
        props: ['user'],
        data () {
            return {
                users: this.user
            }
        },
        methods: {
            userInfo: function(user_id) {
                this.$router.push({name: 'apply-user-info', params: {user_id:user_id}})
            }
        },
        watch: {
            user () {
                this.users = this.user;
            }
        }
    }
</script>