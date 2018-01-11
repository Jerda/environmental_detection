@extends('wechat.layouts.app')
@section('header')
    <header class="bar bar-nav">
        <h1 class="title">数据检测</h1>
        <a class="button button-link button-nav pull-right open-panel" data-panel='#panel-right-demo'>
        区域选择
        </a>
    </header>
@endsection
@section('content')
    <div class="content">
        <div class="card" v-for="item in items">
            <div class="card-header">@{{item.name}}</div>
            <div class="card-content">
                <div class="card-content-inner">
                    <div class="row">
                        <div class="col-50" v-for="child in item.children">
                            <div style="width:50%;float:left">
                              <img :src=child.img width="50" height="50">
                            </div>
                            <div style="width:50%;float:right;">
                                <div style="font-size: 12px">@{{child.title}}</div>
                                <div style="font-size: 12px">@{{child.data}}@{{child.unit}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('tab')
     @include('wechat.layouts.tab')
@endsection
@section('panel')
    {{-- 右侧侧边栏 --}}
    <div class="panel-overlay"></div>
    <div class="panel panel-right panel-reveal" id='panel-right-demo' style="background-color:#fff">
        <div class="content-block">
            <p><a href="#" class="button button-dark">一楼位置</a></p>
            <p><a href="#" class="button button-dark">二楼位置</a></p>
            <p><a href="#" class="button button-dark">三楼位置</a></p>
            <p><a href="#" class="button button-dark">四楼位置</a></p>
            <p><a href="#" class="button button-dark">五楼位置</a></p>
            <p><a href="#" class="button button-dark">六楼位置</a></p>
            <p><a href="#" class="button button-dark">七楼位置</a></p>
        </div>
    </div>
    {{-- 左侧侧边栏 --}}
    <div class="panel-overlay"></div>
    <div class="panel panel-left panel-reveal" id='panel-left-demo' style="background-color:#fff">
        <div class="content-block">
            <p><a href="#" class="button button-dark">一楼位置</a></p>
            <p><a href="#" class="button button-dark">二楼位置</a></p>
            <p><a href="#" class="button button-dark">三楼位置</a></p>
            <p><a href="#" class="button button-dark">四楼位置</a></p>
            <p><a href="#" class="button button-dark">五楼位置</a></p>
            <p><a href="#" class="button button-dark">六楼位置</a></p>
            <p><a href="#" class="button button-dark">七楼位置</a></p>
        </div>
    </div>
@endsection
@section('script')
    <script src="http://mockjs.com/dist/mock.js"></script>    <!-- 引入Mock.js   可以删除  -->
    <script type="text/javascript">
        /******* 模拟数据  后台返回数据可以删除*********/
        Mock.mock('http://test.com',{
          "data": [
            {
              "name": "一楼位置",
              "children": [
                {
                    "type":1,
                    "data|+1": 88,
                },
                {
                    "type":2,
                    "data|+1": 88,
                },
                {
                    "type":3,
                    "data|+1": 88,
                },
                {
                    "type":4,
                    "data|+1": 88,
                },
              ]
            },




            {
              "name": "二楼位置",
              "children": [
                {
                    "type":1,
                    "data|+1": 88,
                },
                {
                    "type":2,
                    "data|+1": 88,
                    "unit":"℃"
                },
                {
                    "type":3,
                    "data|+1": 88,
                    "unit":"lux"
                },
                {
                    "type":4,
                    "data|+1": 88,
                },
              ]
            },
            {
              "name": "三楼位置",
              "children": [
                {
                    "type":1,
                    "data|+1": 88,
                },
                {
                    "type":2,
                    "data|+1": 88,
                },
                {
                    "type":3,
                    "data|+1": 88,
                },
                {
                    "type":4,
                    "data|+1": 88,
                },
              ]
            },
          ]
        });
         /******* 模拟数据  *********/

        var app = new Vue({
            el: '.content',
            data: {
                items: '',
            },
            created(){
                var that = this;
                /**
                 *  数据判断   追加
                 * @param  {[type]} json [description]
                 * @param  {[type]} type [description]
                 * @return {[type]}      [description]
                 */
                function changeType(json,type){
                    switch(type){
                        case 1:
                            json['img'] = "{{ asset('storage/images/air-temperature.png') }}";     //图片绝对地址
//                            json['img'] = "/public/images/air-temperature.png";     //图片绝对地址
                            json['title'] = "空气温度";
                            json['unit'] = "℃";
                            return json;
                        case 2:
                            json['img'] = "{{ asset('storage/images/air-humidity.png') }}";     //图片绝对地址
                            json['title'] = "空气湿度";
                            json['unit'] = "℃";
                            return json;
                        case 3:
                            json['img'] = "{{ asset('storage/images/illumination.png') }}";     //图片绝对地址
                            json['title'] = "光照度";
                            json['unit'] = "lux";
                            return json;
                        case 4:
                            json['img'] = "{{ asset('storage/images/CO2.png') }}";     //图片绝对地址
                            json['title'] = "二氧化碳";
                            json['unit'] = "ppm";
                            return json;
                        case 5:
                            json['img'] = "{{ asset('storage/images/ph.png') }}";     //图片绝对地址
                            json['title'] = "ph值";
                            json['unit'] = " ";
                            return json;
                        case 6:
                            json['img'] = "{{ asset('storage/images/soil-temperature.png') }}";     //图片绝对地址
                            json['title'] = "土壤温度";
                            json['unit'] = "℃";
                            return json;
                        case 7:
                            json['img'] = "{{ asset('storage/images/soil-moisture-content.png') }}";     //图片绝对地址
                            json['title'] = "土壤水分";
                            json['unit'] = "%";
                            return json;
                        case 8:
                            json['img'] = "{{ asset('storage/images/PM10.png') }}";     //图片绝对地址
                            json['title'] = "PM10值";
                            json['unit'] = "ug/m³";
                            return json;
                        case 9:
                            json['img'] = "{{ asset('storage/images/smog.png') }}";     //图片绝对地址
                            json['title'] = "烟雾浓度";
                            json['unit'] = "ppm";
                            return json;
                        default:
                    }
                }
                //   定时器    定时请求数据
                var sid = setInterval(function(){
                    axios.get('http://test.com')
                      .then(function (response) {
                        response.data.data.forEach(function(c,i){
                            c.children.forEach(function(j,k){
                                changeType(j,j.type);
                            })
                        })
                        that.items = response.data.data;
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                },1000);
            },
        })
    </script>
@endsection

