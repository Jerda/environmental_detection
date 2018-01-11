<template>
    <div>
        <environment-top :title="title" :isBack="false" @right="show_region = true"></environment-top>
        <tab :environment="true"></tab>
        <change-region :isShow="show_region" @close="show_region = false"></change-region>
        <environment-card></environment-card>
    </div>
</template>

<script>
    import tab from '../layouts/tab.vue'
    import EnvironmentTop from '../layouts/environment_top.vue'
    import ChangeRegion from '../region/change_region.vue'
    import EnvironmentCard from '../environment/modules/card.vue'

    export default {
        components: {
            tab,
            EnvironmentTop,
            ChangeRegion,
            EnvironmentCard
        },
        data () {
            return {
                title: '监测中心',
                show_region: false,
            }
        }
    }
</script>