{{--
姓名 手机号 邮箱 QQ--}}
@extends('wechat.layouts.app')
@section('content')
    <form method="post" action="" id="myform">
        <div class="weui-cells__title">员工资料</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="form.name" placeholder="姓名">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="form.email" placeholder="邮箱">
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">QQ</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" v-model="form.QQ" placeholder="QQ">
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:" @click="submit">提交资料</a>
        </div>
    </form>
@endsection

@section('script')
    <script type="text/javascript">
        new Vue({
            el:"#myform",
            data:{
                form:{
                    "name":'',
                    "email":'',
                    "QQ":''
                }
            }
            methods:{
                submit:function(){
                    axios.post('/wechat/auth/registerWorker', this.form).then(response => {
                        if(response.status==1){
                            location.href = 
                        }
                    }).catch(error=>{
                        if(error.response.status==422){
                            Zepto.toast(error.response.data.msg);
                        }
                    });
                }
            }
        })
    </script>
@endsection

