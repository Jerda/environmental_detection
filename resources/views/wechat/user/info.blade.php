@include('wechat.layouts.header')
<div class="page">
    <header class="bar bar-nav">
        <h1 class="title">个人信息</h1>
        <a class="icon icon-edit pull-right external" href="{{url('wechat/user/editinfo')}}"">修改信息</a>
    </header>
    <div class="content">
        <form method="post" action="" id="myform">
            <div class="weui-cells weui-cells_form">
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">养户编号</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">所属机构</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">邮箱</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
                <div class="weui-cell">
                    <div class="weui-cell__hd"><label class="weui-label">性别</label></div>
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="" value="" readonly="readonly">
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
@include('wechat.layouts.footer')
<script type="text/javascript">
</script>
</body>
</html>
