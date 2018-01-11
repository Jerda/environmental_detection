<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="/css/app.css">
    <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css">
    <title>Laravel</title>
    <style type="text/css">
        html,body{
            height:100%;
        }
        #app{
            height:100%;
        }
    </style>
</head>
<body>
<div id="app">
    <router-view></router-view>
</div>
<script src="/js/app.js"></script>
<script src="https://g.alicdn.com/de/prismplayer/2.4.0/aliplayer-min.js"></script>
</body>
</html>
