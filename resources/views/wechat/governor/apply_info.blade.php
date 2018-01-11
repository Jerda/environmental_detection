@extends('wechat.layouts.app')
@section('style')
@endsection
@section('header')
	<header class="bar bar-nav">
        <h1 class="title">申请者信息</h1>
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
                        {{-- 申请者信息 --}}
                        <ul>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">姓名</div>
                                    <div class="item-after">{{ $user->name }}</div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">手机号</div>
                                    <div class="item-after">{{ $user->mobile }}</div>
                                </div>
                            </li>
                            <li class="item-content">
                                <div class="item-media"><i class="icon icon-f7"></i></div>
                                    <div class="item-inner">
                                    <div class="item-title">申请时间</div>
                                    <div class="item-after">{{ $user->updated_at }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="content-block">
            <div class="row">
                <div class="col-50"><a href="javascript:;" class="button button-big button-fill button-success" onClick="agree()">同意</a></div>
                <div class="col-50"><a href="javascript:;" class="button button-big button-fill button-danger prompt-ok">驳回</a></div>
            </div>
        </div>
    </div>
@endsection
@section('tab')
     @include('wechat.layouts.tab')
@endsection
@section('script')
    <script type="text/javascript">
        // 同意请求
        function agree(){
            axios.post('/wechat/user/pass', data).then(response => {
                Zepto.toast(response.data.msg);
                setTimeout(function() {
                    window.location = "{{ url('/wechat/user/governor') }}";
                }, 1500);
            }).catch(error => {
                if (error.response) {
                    if (error.response.status == 422) {
                        Zepto.toast(error.response.data.msg);
                    }
                }
            });
        }
        //驳回请求
        Zepto(document).on('click','.prompt-ok', function () {
            Zepto.prompt('请输入驳回理由', function (value) {
                var data = {
                    'content': value,
                    'user_id': "{{ $user->id }}",
                }
                //数据提交
                axios.post('/wechat/user/noPass', data).then(response => {
                    Zepto.toast(response.data.msg);
                    setTimeout(function() {
                        window.location = "{{ url('/wechat/user/governor') }}";
                    }, 1500);
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status == 422) {
                            Zepto.toast(error.response.data.msg);
                        }
                    }
                });
            });
        });
    </script>
@endsection