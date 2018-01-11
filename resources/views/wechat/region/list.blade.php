{{-- 区域列表 --}}
@extends('wechat.layouts.app')
@section('content')
    <div content="content">
        <div class="card">
            <div class="card-header">
                <div class="row">xxx区域</div>
            </div>
            <div class="card-content">
                <div class="list-block media-list">
                    <ul>
                        <li class="item-content">
                            <div class="item-inner">
                                <div class="item-title-row">
                                    <div class="item-title">监控设备：</div>
                                </div>
                                <div class="item-sbtitle">温度：</div>
                                <div class="item-sbtitle">湿度：</div>
                                <div class="item-sbtitle">CO2：</div>
                                <div class="item-sbtitle">NH3：</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
           <div class="card-footer no-border"">
                <p><a href="#" class="create-actions" onClick="add()">添加设备</a></p>
                {{-- <a href="/wechat/environment/showAdd">添加环境监控</a>跳转到environment下add.blade.php --}}
                {{-- <a href="/wechat/video/showAdd">添加摄像头</a> 跳转到video下add.blade.php --}}
            </div>
        </div>
        <div class="weui-btn-area">
            <a href="/wechat/factory/showAdd" class="weui-btn weui-btn_primary">添加区域</a> {{-- 跳转到当前目录下add.blade.php --}}
            </div>
        </div>
    </div>
@endsection

@section('script')
    <script type="text/javascript">
         function add(id){
            var id = id;    //当前圈舍ID
            var buttons1 = [{
                text: '请选择',
                label: true
            }, {
                text: '添加环境监控器',
                bold: true,
                bg: 'success',
                onClick: function() {
                    location.href = 
                }
            }, {
                text: '添加摄像头设备',
                onClick: function() {
                    location.href = 
                }
            }];
            var buttons2 = [
                {
                  text: '取消',
                  bg: 'danger'
                }
              ];
            var groups = [buttons1,buttons2];
            $.actions(groups);
        }
    </script>
@endsection