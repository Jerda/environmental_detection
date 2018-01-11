@extends('wechat.layouts.app')
@section('header')
    <header class="bar bar-nav">
        <h1 class="title">个人信息</h1>
        {{--<a class="icon icon-edit pull-right external" href="{{url('wechat/user/editinfo')}}">修改信息</a>--}}
    </header>
@endsection
@section('content')
    <div class="content">
        <form method="post" action="" id="myform">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="" placeholder="姓名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="" placeholder="邮箱">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" id="mobile" name="mobile" placeholder="手机号">
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" id="code" name="code" maxlength="4" placeholder="4位数字验证码">
                </div>
                <div class="weui-cell__ft">
                    <button type="button" class="weui-vcode-btn" id="get_code">获取验证码</button>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="" placeholder="QQ">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">修改资料</a>
        </div>
    </form>
    </div>
@endsection
@section('tab')
    @include('wechat.layouts.tab')
@endsection