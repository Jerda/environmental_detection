@include('wechat.layouts.header')
<div class="page">
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells__title">用户注册</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="tel" id="mobile" name="mobile" placeholder="请输入手机号">
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
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">注册</a>
            </div>
        </form>
    </div>
</div>
@include('wechat.layouts.footer')
<script type="text/javascript">

</script>
</body>
</html>
