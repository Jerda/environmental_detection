<template>
    <div>
        <top :title="title" :isBack="true"></top>
        <tab :user="true"></tab>
        <factory-card></factory-card>
        <x-button type="primary" @click.native="show">申请圈舍</x-button>

        <factory-add :isShow="addShow" @close="addShow = false"></factory-add>
    </div>
</template>

<script>
    import FactoryCard from '../factory/modules/card'
    import FactoryAdd from '../factory/modules/add'
    import tab from '../layouts/tab.vue'
    import { XButton, Popup } from 'vux'

    export default {
        components: {
            FactoryCard,
            FactoryAdd,
            XButton,
            Popup,
            tab
        },
        data () {
            return {
                title: '我的圈舍',
                addShow: false
            }
        },
        methods: {
            show: function() {
                this.addShow = true;
            }
        }
    }
</script>