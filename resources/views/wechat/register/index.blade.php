@extends('wechat.layouts.app')
@section('content')
    <div class="content">
        <div class="content-block">
            <div class="row">
                <div class="col-50"><a href="/wechat/auth/farmer" class="button button-big button-fill button-danger">我是养户</a></div>
                <div class="col-50"><a href="/wechat/auth/worker" class="button button-big button-fill button-success">我是员工</a></div>
            </div>
        </div>
    </div>
@endsection
