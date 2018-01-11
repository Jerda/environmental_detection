<template>
    <!----------------------------------------------------------------------
                                监控直播
                                id值待解决
    ------------------------------------------------------------------------>
    <el-dialog title="监控直播" :visible.sync="dialogShow" width="700px">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col>
                <div  class="prism-player" id="videoPlayer" style="position: absolute;"></div>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
        </div>
    </el-dialog>
    <!------------------------------------------------------------------->
    <!--<remote-js src="https://g.alicdn.com/de/prismplayer/2.4.0/aliplayer-min.js"></remote-js>-->
</template>

<script>
    import { Dialog, Col, Row, Button } from "element-ui"
//    import "../helpers/remote"

    export default {
        components: {
            'el-dialog': Dialog,
            'el-col': Col,
            'el-row': Row,
            'el-button': Button,
        },
        props: ['show', 'id'],
        data () {
            return {
                dialogShow: this.show,
                videoId: this.id,
                player: '',
                url: {
                    rtmp: '',
                    rtmpHd: '',
                },
                deviceSerial: '',
                channel: ''
            }
        },
        methods: {
            close: function() {
                this.$emit('close');
                this.url = {
                    hlsHd: '',
                    hls: '',
                    rtmp: '',
                    rtmpHd: ''
                };
            },
            loadPlay: function () {
                this.player = new Aliplayer({
                    id: 'videoPlayer',
                    width: '100%',
                    autoplay: true,
                    //支持播放地址播放,此播放优先级最高
                    source : this.url.rtmpHd,
                },function(player){
                    console.log('播放器创建好了。')
                });
            },
            getLiveAddress: function() {
                axios.post('/api/video/getLiveAddress', {id:this.id}).then(response => {
                    if (response.data.status == 1) {
                        this.url.rtmp = response.data.data.rtmp;
                        this.url.rtmpHd = response.data.data.rtmpHd;
                        this.url.hls = response.data.data.hls;
                        this.url.hlsHd = response.data.data.hlsHd;
                        this.loadPlay();
                    } else {
                        this.message(response);
                    }
                });
            }
        },
        watch: {
            show (val) {
                this.dialogShow = val;
                let that = this;
                if (this.dialogShow === true) {
                    that.getLiveAddress();
                } else {
                    console.log('dispose');
                    that.player.dispose();
                }
            },
            dialogShow (val) {
                if (!val) {
                    this.close();
                }
            },
            id (val) {
                this.videoId = val;
            }
        }
    }
</script>

<style scoped>
    .el-col {
        height: 300px
    }
</style>