@extends('wechat.layouts.app')
@section('style')
@endsection
@section('header')
	<header class="bar bar-nav">
        <h1 class="title">我的管理者</h1>
        <a href="{{url('wechat/user/index')}}" class="button button-link button-nav pull-left">
            <span class="icon icon-left"></span>
            返回
        </a>
    </header>
@endsection
@section('content')
	<div class="content">
        <div class="buttons-tab">
            <a href="{{ url('/wechat/user/governor') }}" class="button">管理者列表</a>
            <a href="javascript:;" class="tab-link active button">申请列表</a>
        </div>
        <div class="content-block" style="padding:0;margin:0">
            <div class="tabs">
                <div class="tab active">
                    <div class="list-block" style="margin:0">
                        <ul>
                            @if(count($farmers) !== 0)
                            @foreach($farmers as $farmer)
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                        {{-- a标签跳转到申请者详情页面 --}}
                                    <a href="{{ url('/wechat/user/applyInfo', ['user_id' => $farmer->user->id]) }}"><div class="item-title">{{ $farmer->user->name }}</div></a>
                                </div>
                            </li>
                            @endforeach
                            @endif
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

@endsection