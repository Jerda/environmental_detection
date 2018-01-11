@extends('wechat.layouts.app')
@section('style')
    <link rel="stylesheet" href="//g.alicdn.com/de/prismplayer/2.4.0/skins/default/aliplayer-min.css" />
@endsection
@section('header')
    <header class="bar bar-nav">
        <a class="button button-link button-nav pull-left open-panel" data-panel='#panel-left-demo'>
        切换圈舍
        </a>
        <h1 class="title">视频监控</h1>
        <a class="button button-link button-nav pull-right open-panel" data-panel='#panel-right-demo'>
        选择
        </a>
    </header>
@endsection
@section('content')
    <div class="content">
        <video  src="http://hls.open.ys7.com/openlive/e5e050d0ee1a4db0b5aa8a676c611eb4.hd.m3u8"
                width="360px" height="250px" controls="" x5-playsinline="true" playsinline="true"
                webkit-playsinline="" poster="" autoplay="true" preload="auto"></video>
    </div>
@endsection
@section('tab')
     @include('wechat.layouts.tab')
@endsection
@section('panel')
    {{-- 左侧侧边栏 --}}
    <div class="panel-overlay"></div>
    <div class="panel panel-left panel-reveal" id='panel-left-demo' style="background-color:#fff">
        <div class="content-block">
            <p><a href="#" class="button button-dark" onclick="getregion()">一楼位置</a></p>
        </div>
    </div>
    {{-- 右侧侧边栏 --}}
    <div class="panel-overlay"></div>
    <div class="panel panel-right panel-reveal" id='panel-right-demo' style="background-color:#fff">
        <div class="content-block">

        </div>
    </div>
@endsection
@section('script')
    <script type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.4.0/aliplayer-min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script type="text/javascript">
        /*Zepto(() => {
            getLiveAddress();
        })

        function getLiveAddress()
        {
            axios.post('/wechat/video/liveAddress', {id:1}).then(response => {
                console.log(response.data.data);
            });
        }*/
    </script>
@endsection

