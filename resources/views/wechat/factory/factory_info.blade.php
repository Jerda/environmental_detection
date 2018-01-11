“@extends('wechat.layouts.app')
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
@section('header')
	<header class="bar bar-nav">
        <h1 class="title">圈舍信息</h1>
    </header>
@endsection
@section('content')
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
                    <input class="weui-input" type="text" name="length" value="{{ $res.length }}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">圈舍宽</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="width" value="{{ $res.width }}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">风机数量</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="fan_num" value="{{ $res.fan_num }}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">湿帘数量</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="cooling_pad_num" value="{{ $res.cooling_pad_num }}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">面积</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="area" value="{{ $res.area }}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">畜生数</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="animal_num" value="{{$res.animal_num}}">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">省市区</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" id='city-picker'/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">详情地址</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">备注</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="form.remark">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">确认修改</a>
        </div>
    </form>
@endsection
@section('script')
    <script type="text/javascript" src="//g.alicdn.com/msui/sm/0.6.2/js/sm-city-picker.min.js" charset="utf-8"></script>
	<script type="text/javascript">
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
            axios.post('/wechat/factory/modify', jsonData).then(response => {
                if(response.status==200){
                    Zepto.alert('修改成功！',, function () {
                        location.href = history.go(-1);
                    });
                }else{
                    Zepto.toast('修改失败！');
                }
            });
        }
	</script>
@endsection