{{--
姓名 邮箱 手机号 身份证 养户编号  所属机构  负责人--}}
@extends('wechat.layouts.app')
@section('style')

@endsection
@section('content')
    <form method="post" action="" id="myform">
        <div class="weui-cells__title">完善养户资料</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="name" placeholder="姓名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="tel" id="mobile" name="mobile" placeholder="手机号">
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">验证码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" id="code" name="code" maxlength="4" placeholder="4位数字验证码">
                </div>
                <div class="weui-cell__ft">
                    <button type="button" class="weui-vcode-btn" id="get_code">获取验证码</button>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">身份证</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="idcard" placeholder="身份证">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">养户编号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="code" placeholder="养户编号">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">所属机构</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="organization" placeholder="机构名称">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" name="QQ" placeholder="QQ">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">负责人</label></div>
                <div class="weui-cell__bd">
                    <select class="weui-select" id="worker_id" name="worker_id">
                        <option value="0">请选择负责人</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">提交资料</a>
        </div>
    </form>
@endsection

@section('script')
    <script type="text/javascript">
        Zepto(function(){
            getSelect();

            var code_time = 150;
            //获取验证码
            Zepto('#get_code').on('click',function(){
                var mobile = Zepto('#mobile').val();
                axios.post('/sms/validate', {mobile: mobile}).then(response => {
                    if(response.status == 1){
                        Zepto.toast(response.data.msg);
                        Zepto("#get_code").prop("disabled",true).addClass("btn_dis");
                        code_time = 150;
                        chk_code();
                    }
                    else{
                        Zepto.toast(response.data.msg);
                    }
                }).catch(error => {
                    if (error.response.status == 422) {
                        Zepto.toast(error.response.data.msg);
                    }
                });
            })

            //提交post数据
            Zepto('#submit_reg').on('click',function(){
                var data = Zepto('#myform').serialize();

                axios.post('/wechat/auth/registerFarmer', data).then(response => {
                    Zepto.toast(response.data.msg);
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status == 422) {
                            Zepto.toast(error.response.data.msg);
                        }
                    }
                });
            })

            // 改变获取验证码按钮样式
            function chk_code(){
                if(code_time > 0){
                    Zepto("#get_code").html(code_time.toString() + "秒后获取");
                    code_time--;
                    setTimeout(function(){chk_code();},1000);
                }
                else{
                    Zepto("#get_code").prop("disabled",false).html('获取验证码').removeClass("btn_dis");
                }  
            }
            //获取员工列表
            function getSelect(){
                axios.post('/wechat/user/workers').then(response =>{
                    var html='';
                    response.data.data.forEach(function(c){
                        html+='<option value='+ c.id +'>'+ c.name +'</option>'
                    })
                    Zepto("#worker_id").append(html);
                }).catch(error=>{
                    if (error.response.status == 422) {
                        Zepto.toast(error.response.data.msg);
                    }
                })
            }
        })
    </script>
@endsection
