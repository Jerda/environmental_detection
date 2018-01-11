<!DOCTYPE HTML>
<html lang="{{ app()->getLocale() }}">
<head>
    @include('wechat.layouts.meta')
    @yield('meta')
    @yield('style')
</head>
<body>
<div class="page" id="app">
    @yield('header')
    @yield('content')
    @yield('tab')
</div>
@yield('panel')
@include('wechat.layouts.footer')
@yield('script')
</body>
</html>
