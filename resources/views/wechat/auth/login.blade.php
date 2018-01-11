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
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="login">登录</a>
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
                    username: 'omjvmw2knwijt_zvup0eg5ltc8w0',
                    password: '',
                }
            },
            methods: {
                login: function() {
                    axios.post('/auth/login', this.form).then(response => {
                        window.localStorage.setItem('jwt_token', response.data.token);
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