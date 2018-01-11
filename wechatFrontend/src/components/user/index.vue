<template>
    <div>
        <top :title="title" :isBack="false"></top>
        <tab :user="true"></tab>
        <group>
            <div style="width: 100%;background-image: -webkit-gradient(linear, 0% 0%, 8% 60%, from(#1d4fde), to(#73a4e0), color-stop(1.0, #5f80de))">
                <div style="padding:15px 10px 10px 10px; overflow:hidden">
                    <div style="float:left; width:80px; height:80px;border-radius: 50%;border: 1px solid #fff; overflow:hidden">
                        <img src="" style="width:100%;height:100%;">
                    </div>
                    <div style="float:left; padding-left:10px; color:#fff;padding-top: 15px;">
                        <p style="margin: 0px;"></p>
                        <p style="margin: 0px;"></p>
                    </div>
                    <div class="clear" style="clear:both"></div>
                </div>
            </div>
        </group>
        <group>
            <cell title="修改密码" is-link link="/userResetPassword"></cell>
            <cell title="个人信息" is-link link="/userInfo"></cell>
            <cell title="我的圈舍" is-link link="/factoryList"></cell>
            <cell title="我的管理者" is-link link="/governor"></cell>
        </group>
    </div>
</template>

<script>
    import tab from '../layouts/tab.vue'
    import { Cell, Group } from 'vux'

    export default {
        components: {
            tab,
            Cell,
            Group,
        },
        data () {
            return {
                title: '个人中心',
            }
        }
    }
</script>