<template>
    <div>
        <top :title="title"></top>
        <x-button>我是员工</x-button>
        <x-button>我是养户</x-button>
    </div>
</template>

<script>
    import { XButton } from 'vux'
    import top from '../layouts/top'

    export default {
        components: {
            XButton,
            top
        },
        data () {
            return {
                title: '选择你的类型'
            }
        }
    }
</script>