@extends('wechat.layouts.app')
@section('header')
    <header class="bar bar-nav">
        <h1 class="title">注册用户</h1>
    </header>
@endsection
@section('content')
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="password" v-model="form.password" placeholder="密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="password" v-model="form.password_confirmation" placeholder="确认密码">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="register">注册</a>
            </div>
        </form>
    </div>
@endsection
@section('tab')
    @include('wechat.layouts.tab')
@endsection
@section('script')
    <script>
        new Vue({
            el: '#app',
            data: {
                form: {
                    username: 'omJVMw2kNWIJt_zVUp0eG5lTC8w0',
                    password: '',
                    password_confirmation: '',
                }
            },
            methods: {
                register: function() {
                    axios.post('/auth/register', this.form).then(response => {
                        console.log(response.data);
                    }).catch(error => {
                        if (error.response) {
                            Zepto.toast(error.response.data.msg);
                        }
                    });
                }
            }
        });
    </script>
@endsection