@extends('wechat.layouts.app')
@section('content')
<div class="content">
    <form method="post" action="" id="myform">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">设备ID</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="region_id" placeholder="设备ID">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">提交资料</a>
        </div>
    </form>
</div>
@endsection