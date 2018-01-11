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
                        <input class="weui-input" type="text" name="name" placeholder="姓名" value="{{ $user->name }}">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="idcard" placeholder="身份证" value="{{ $user->idcard }}">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">养户编号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="code" placeholder="养户编号" value="{{ $user->farmer->code }}">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">所属机构</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="organization" placeholder="机构名称" value="{{ $user->farmer->organization }}">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="QQ" placeholder="QQ" value="{{ $user->QQ }}">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">负责人</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="QQ" value="{{ $user->farmer->worker->user->name }}">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" id="submit">修改资料</a>
            </div>
        </form>
    </div>
@endsection
@section('tab')
    @include('wechat.layouts.tab')
@endsection
@section('script')
    <script>
        Zepto('#submit').click(function() {

        })
    </script>
@endsection