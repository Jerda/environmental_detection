@extends('wechat.layouts.app')
@section('style')
    <style type="text/css">
        .popup-overlay{
            z-index:999;
        }
        .link-a{
            color:#333;
        }
        .link-a:active{
            color:#333;
        }
    </style>
@endsection
@section('content')
    <div class="content">
        <div class="card">
            <div class="card-header">XXX圈舍</div>
            <div class="card-content">
                <div class="list-block media-list">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">状态：</div>
                                </div>
                                <div class="item-title">地址：</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-footer no-border">
                <a href="/wechat/region/showListByFactory" class="link">查看区域</a>
                <a href="/wechat/region/showAdd" class="link">添加区域</a>
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="#" class="weui-btn weui-btn_primary open-about open-popup">添加圈舍</a>
        </div>
    </div>
    <div class="popup popup-about">
        <div class="content-block">
            <header class="bar bar-nav">
                <h1 class="title">添加圈舍</h1>
                <a class="button button-link button-nav pull-left close-popup"><span class="icon icon-left"></span>返回</a>
            </header>
            <div class="content">
            <form method="post" action="" id="myform">
                <div class="weui-cells weui-cells_form">
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="name" placeholder="圈舍名称">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">类型</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="type">
                                <option value="0">无自动</option>
                                <option value="1">半自动</option>
                                <option value="2">全自动</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">饲养模式</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="farm_mode">
                                <option value="0">请选择</option>
                                <option value="1">散养</option>
                                <option value="2">限位栏</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">密封性</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="sealing">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">排污</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="sewage">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">通风方式</label></div>
                        <div class="weui-cell__bd">
                            <select class="weui-select" name="fan_mode">
                                <option value="0">无</option>
                                <option value="1">有</option>
                            </select>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">圈舍长</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="length">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">圈舍宽</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="width">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">风机数量</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="fan_num">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">湿帘数量</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="cooling_pad_num">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">面积</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="area">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">畜生数</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="animal_num">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">省市区</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" id='city-picker' value="北京 东城区 "/>
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">详情地址</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="address">
                        </div>
                    </div>
                    <div class="weui-cell">
                        <div class="weui-cell__hd"><label class="weui-label">备注</label></div>
                        <div class="weui-cell__bd">
                            <input class="weui-input" type="text" name="remark">
                        </div>
                    </div>
                </div>
                <div class="weui-btn-area">
                    <a class="weui-btn weui-btn_primary" href="javascript:" onClick="submit()">提交资料</a>
                </div>
            </form>
        </div>
    </div>
@endsection
@section('script')
    <script type="text/javascript" src="//g.alicdn.com/msui/sm/0.6.2/js/sm-city-picker.min.js" charset="utf-8"></script>
    <script>
        Zepto("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">选择地址</h1>\
            </header>'
        });
        function submit(){
            var jsonData = Zepto('#myform').serializeArray();
            var addr = Zepto('#city-picker').val();
            var addr1 = addr.split(' ');
            jsonData.push({"name":"province","value":addr1[0]},{"name":"city","value":addr1[1]},{"name":"district","value":addr1[2]});
            /**
             * 提交数据   执行回调
             * @param  {[type]} response [description]
             * @return {[type]}          [description]
             */
            axios.post('/wechat/factory/add', jsonData).then(response => {

            });
        }
    </script>
@endsection