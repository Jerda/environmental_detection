<div class="layui-side layui-bg-black kit-side">
    <div class="layui-side-scroll">
        <div class="kit-side-fold"><i class="fa fa-navicon" aria-hidden="true"></i></div>
        <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
        <ul class="layui-nav layui-nav-tree" lay-filter="kitNavbar" kit-navbar>
            <li class="layui-nav-item">
                <a class="" href="javascript:;"><span>会员管理</span></a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/user/index') }}" data-icon="fa-user"
                           data-title="微信会员" kit-target data-id='11'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>微信会员</span>
                        </a>
                    </dd>
                </dl>
            </li>
            <li class="layui-nav-item">
                <a class="" href="javascript:;"><span>微信设置</span></a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/wechat/config') }}" data-icon="fa-user"
                           data-title="接口管理" kit-target data-id='11'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>接口管理</span>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/wechat/menu') }}" data-icon="fa-user"
                           data-title="自定义菜单" kit-target data-id='12'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>自定义菜单</span>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/wechat/callback') }}" data-icon="fa-user"
                           data-title="自定义回复" kit-target data-id='13'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>自定义回复</span>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/wechat/material') }}" data-icon="fa-user"
                           data-title="素材管理" kit-target data-id='14'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>素材管理</span>
                        </a>
                    </dd>
                </dl>
            </li><li class="layui-nav-item">
                <a class="" href="javascript:;"><span>系统设置</span></a>
                <dl class="layui-nav-child">
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/system/admin/index') }}" data-icon="fa-user"
                           data-title="管理员管理" kit-target data-id='31'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>管理员管理</span>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/system/role/index') }}" data-icon="fa-user"
                           data-title="角色管理" kit-target data-id='32'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>角色管理</span>
                        </a>
                    </dd>
                    <dd>
                        <a href="javascript:;" data-url="{{ url('admin/system/permission/index') }}" data-icon="fa-user"
                           data-title="权限管理" kit-target data-id='33'>
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <span>权限管理</span>
                        </a>
                    </dd>
                </dl>
            </li>
        </ul>
    </div>
</div>


