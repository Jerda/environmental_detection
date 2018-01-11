@extends('wechat.layouts.app')
@section('content')
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.name" placeholder="区域名称">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">备注</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.remark" placeholder="备注">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">提交资料</a>
            </div>
        </form>
    </div>
@endsection

@section('script')
    <script>
        new Vue({
            data: {
                form: {
                    "name":'',
                    "remark":'',
                }
            },
            methods: {
                submit: function() {
                    axios.post('/wechat/region/add', this.form).then(response => {

                    });
                },
            }
        })
    </script>
@endsection