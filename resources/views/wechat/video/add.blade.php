@extends('wechat.layouts.app')
@section('content')
    <div class="content">
        <form method="post" action="" id="addVideo">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">摄像头序列号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.deviceSerial" placeholder="序列号">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">摄像头验证码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.authCode" placeholder="验证码">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="#" @click="submit">申请设备</a>
            </div>
        </form>
    </div>
@endsection

@section('script')
    <script type="text/javascript">
        new Vue({
            el:"#addVideo",
            data:{
                form:{
                    "deviceSerial":'',
                    "authCode":''
                }
            },
            methods: {
                submit: function() {
                    axios.post('/wechat/video/add', this.form).then(response => {

                    });
                }
            },
        })
    </script>
@endsection