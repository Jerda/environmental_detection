@extends('wechat.layouts.app')
@section('style')
@endsection
@section('header')
	<header class="bar bar-nav">
        <h1 class="title">管理者信息</h1>
        <a href="{{url('wechat/user/index')}}" class="button button-link button-nav pull-left">
            <span class="icon icon-left"></span>
            返回
        </a>
    </header>
@endsection
@section('content')
	<div class="content">
        <div class="content-block" style="padding:0;margin:0">
            <div class="tabs">
                <div class="tab active">
                    <div class="list-block" style="margin:0">
                        <ul>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">XXXXX</div>
                                    <div class="item-after">xxxxx</div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">XXXXX</div>
                                    <div class="item-after">xxxxx</div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">XXXXX</div>
                                    <div class="item-after">xxxxx</div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">XXXXX</div>
                                    <div class="item-after">xxxxx</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('tab')
     @include('wechat.layouts.tab')
@endsection
@section('script')
    <script type="text/javascript">

    </script>
@endsection