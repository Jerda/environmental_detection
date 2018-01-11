@extends('wechat.layouts.app')
@section('content')
    {{--名称 类型 饲养模式 密封性 排污 通风方式 圈舍长、宽 风机数量、湿帘数量、面积、畜生数、地址、详细地址、备注--}}
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">名称</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.name" placeholder="圈舍名称">
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
                        <input class="weui-input" type="text" v-model="form.length">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">圈舍宽</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.width">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">风机数量</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.fan_num">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">湿帘数量</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.cooling_pad_num">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">面积</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.area">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">畜生数</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" v-model="form.animal_num">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">详情地址</label></div>
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
                <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">提交资料</a>
            </div>
        </form>
    </div>
@endsection
@section('script')
    <script>
        $("#city-picker").cityPicker({
            toolbarTemplate: '<header class="bar bar-nav">\
            <button class="button button-link pull-right close-picker">确定</button>\
            <h1 class="title">选择地址</h1>\
            </header>'
        });
        new Vue({
            data: {
                {{--名称 类型 饲养模式 密封性 排污 通风方式 圈舍长、宽 风机数量、湿帘数量、面积、畜生数、地址、详细地址、备注--}}

                form: {
                    name: '',
                    type: '',
                    farm_mode: '',
                    sealing: '',
                    sewage: '',
                    fan_mode: '',
                    length: 0,
                    width: 0,
                    fan_num: 0,
                    cooling_pad_num: 0,
                    area: 0,
                    animal_num: 0,
                    remark: ''
                }
            },
            methods: {
                submit: function() {
                    axios.post('/wechat/factory/add', this.form).then(response => {

                    });
                }
            },
        });
    </script>
@endsection