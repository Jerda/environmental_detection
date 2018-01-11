@include('wechat.layouts.header')
<div class="page">
    <header class="bar bar-nav">
        <h1 class="title">修改密码</h1>
    </header>
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells__title">修改密码</div>
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">新密码</label></div>
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
                <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">确定修改</a>
            </div>
        </form>
    </div>
    <nav class="bar bar-tab">
        <a class="tab-item external" href="{{url('wechat/data/index')}}">
            <span class="icon icon-app"></span>
            <span class="tab-label">数据检测</span>
        </a>
        <a class="tab-item external" href="{{url('wechat/video/index')}}">
            <span class="icon icon-computer"></span>
            <span class="tab-label">视频监控</span>
        </a>
        <a class="tab-item external active" href="javascrip:;">
            <span class="icon icon-me"></span>
            <span class="tab-label">个人中心</span>
        </a>
    </nav>
</div>
@include('wechat.layouts.footer')
<script type="text/javascript">

</script>
</body>
</html>
