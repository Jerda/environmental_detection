@extends('wechat.layouts.app')
@section('header')
    <header class="bar bar-nav">
        <h1 class="title">个人中心</h1>
    </header>
@endsection
@section('content')
    <div class="content">
        <div style="width: 100%;background-image: -webkit-gradient(linear, 0% 0%, 8% 60%, from(#1d4fde), to(#73a4e0), color-stop(1.0, #5f80de))">
            <div style="padding:15px 10px 10px 10px; overflow:hidden">
                <div style="float:left; width:80px; height:80px;border-radius: 50%;border: 1px solid #fff; overflow:hidden">
                    <img src="{{ $user->wechat->avatar }}" style="width:100%;height:100%;">
                </div>
                <div style="float:left; padding-left:10px; color:#fff;padding-top: 15px;">
                    <p style="margin: 0px;">会员账号：{{ $user->name }}</p>
                    <p style="margin: 0px;">所在城市：{{ $user->wechat->city }}</p>
                </div>
                <div class="clear" style="clear:both"></div>
            </div>
        </div>
        <div class="list-block" style="margin:0.5rem 0">
            <ul>
                <li>
                    <a href="{{ url('wechat/user/editpas') }}" class="item-link item-content">
                        <div class="item-media"><i class="fa fa-share-alt"></i></div>
                        <div class="item-inner">
                            <div class="item-title">账户密码修改1</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="{{url('wechat/user/info')}}" class="item-link item-content">
                        <div class="item-media"><i class="fa fa-share-alt"></i></div>
                        <div class="item-inner">
                            <div class="item-title">个人信息</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="{{url('wechat/factory/showListByUser')}}" class="item-link item-content">
                        <div class="item-media"><i class="fa fa-share-alt"></i></div>
                        <div class="item-inner">
                            <div class="item-title">我的圈舍</div>
                        </div>
                    </a>
                </li>
                <li>
                    <a href="{{url('wechat/user/governor')}}" class="item-link item-content">
                        <div class="item-media"><i class="fa fa-share-alt"></i></div>
                        <div class="item-inner">
                            <div class="item-title">我的管理者</div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
@endsection
@section('tab')
    @include('wechat.layouts.tab')
@endsection
