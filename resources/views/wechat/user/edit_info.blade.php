@include('wechat.layouts.header')
<div class="page">
    <header class="bar bar-nav">
        <a class="icon icon-left pull-left external" href="{{url('wechat/user/info')}}"">上一步</a>
        <h1 class="title">修改个人信息</h1>
    </header>
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">所属机构</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">性别</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">身份证号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">QQ号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" placeholder="请输入新密码">
                    </div>
                </div>
            </div>
            <div class="weui-btn-area">
                <a class="weui-btn weui-btn_primary" href="javascript:" id="submit_reg">确定修改</a>
            </div>
        </form>
    </div>
</div>
@include('wechat.layouts.footer')
<script type="text/javascript">

</script>
</body>
</html>
