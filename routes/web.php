<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('{all}', 'RouterController@index')->where(['all' => '.*']);

/*
|--------------------------------------------------------------------------
| 获取验证码
|--------------------------------------------------------------------------
*/
Route::get('captcha/{config?}', function(\Mews\Captcha\Captcha $captcha, $config = 'default') {
    return $captcha->create($config);
});

/*
|--------------------------------------------------------------------------
| 短信验证
|--------------------------------------------------------------------------
*/
Route::post('/sms/validate', 'Api\SMSController@getValidate');

/*
|--------------------------------------------------------------------------
| 刷新access_token
|--------------------------------------------------------------------------
*/
Route::post('/refreshToken', 'Admin\Auth\LoginController@refreshToken');

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/
Route::post('/admin/login', 'Admin\Auth\LoginController@login');

//Route::group(['middleware' => 'auth:api', 'namespace' => 'Admin'], function() {
//    Route::post('admin/logout', 'Auth\LoginController@logout');
//    Route::post('/user', function(\Illuminate\Http\Request $request) {
//        return $request->user();
//    });
//
//    Route::group(['namespace' => 'Wechat', 'prefix' => 'wechat'], function() {
//        //wechat配置
//        Route::group(['prefix' => 'config'], function() {
//            Route::post('/set', 'ConfigController@set');
//            Route::post('/get', 'ConfigController@get');
//        });
//        //wechat按钮
//        Route::group(['prefix' => 'menu'], function() {
//            Route::post('/add', 'MenuController@actionAdd');
//            Route::post('/del', 'MenuController@actionDel');
//            Route::post('/modify', 'MenuController@actionModify');
//            Route::post('/getLevelOnes', 'MenuController@getLevelOnes');
//            Route::post('/getMenus', 'MenuController@getMenus');
//            Route::post('/modifySortId', 'MenuController@actionModifySortId');
//            Route::post('/issue', 'MenuController@issueMenus');
//        });
//        Route::group(['prefix' => 'user'], function() {
//            Route::post('/synchronize_user', 'WechatUserController@synchronizeUsers');
//            Route::post('/getUsers', 'WechatUserController@getUsers');
//            Route::post('/noPass', 'WechatUserController@noPass');
//        });
//        Route::group(['prefix' => 'material'], function() {
//            Route::post('/news', 'MaterialController@news');
//        });
//    });
//
//    Route::group(['namespace' => 'Current', 'prefix' => 'current'], function() {
//        Route::group(['prefix' => 'factory'], function() {
//            Route::post('/add', 'FactoryController@add');
//            Route::post('/getAll', 'FactoryController@getAll');
//            Route::post('/get', 'FactoryController@get');
//            Route::post('/modify', 'FactoryController@modify');
//            Route::post('/status', 'FactoryController@status');
//        });
//        Route::group(['prefix' => 'region'], function() {
//            Route::post('/add', 'RegionController@add');
//            Route::post('/getAll', 'RegionController@getAll');
//        });
//        Route::group(['prefix' => 'farmer'], function() {
//            Route::post('getAll', 'FarmerController@getFarmers');
//        });
//        Route::group(['prefix' => 'worker'], function() {
//            Route::post('getAll', 'WorkerController@getWorkers');
//            Route::post('get', 'WorkerController@get');
//            Route::post('modify', 'WorkerController@modify');
//        });
//        Route::group(['prefix' => 'user'], function() {
//            Route::post('getExamine', 'UserController@getExamine');
//            Route::post('status', 'UserController@status');
//            Route::post('get', 'UserController@get');
//            Route::post('modify', 'UserController@modify');
//        });
//        Route::group(['prefix' => 'video'], function() {
//            Route::post('getAll', 'VideoController@getAll');
//            Route::post('add', 'VideoController@add');
//            Route::post('del', 'VideoController@del');
//            Route::post('status', 'VideoController@status');
//            Route::post('getInfo', 'VideoController@getInfo');
//            Route::post('getChannel', 'VideoController@getChannel');
//            Route::post('getLiveAddress', 'VideoController@getLiveAddress');
//        });
//        Route::group(['prefix' => 'environment'], function() {
//            Route::post('getAll', 'EnvironmentController@getAll');
//            Route::post('status', 'EnvironmentController@status');
//        });
//        Route::group(['prefix' => 'yun'], function() {
//            Route::post('set', 'YunController@set');
//            Route::post('get', 'YunController@get');
//            Route::post('getAccessToken', 'YunController@getAccessToken');
//        });
//    });
//});

Route::post('/test', function() {
    return 'test11';
});



/*
|--------------------------------------------------------------------------
| 微信服务API
|--------------------------------------------------------------------------
*/
Route::any('wechat/serve', 'Admin\Wechat\WechatController@actionServer');

/*Route::any('/wechat/oauth_callback', function() {
    app('WechatTool')->oauthCallback();
//    session(['openid' => $user->getId()]);
//    session(['user_id' => app('WechatTool')->getUserIdByOpenID($user->getId())]);
    return redirect(empty(session('target_url')) ? url('/') : url(session('target_url')));
});*/


/*
|--------------------------------------------------------------------------
| 后台管理系统路由
|--------------------------------------------------------------------------
*/
Route::group(['prefix' => 'admin', 'namespace' => 'Admin'], function () {
//    Route::get('/login', 'Auth\LoginController@showLoginForm');
//    Route::post('/login', 'Auth\LoginController@login');
//    Route::get('/register', 'Auth\RegisterController@showRegistrationForm');
//    Route::post('/register', 'Auth\RegisterController@register');
    /**
     * 登录后，后台管理系统路由
     */
    Route::group(['middleware' => 'admin'], function() {
        Route::get('/logout', 'Auth\LogoutController@logout');
        Route::get('index', 'IndexController@index');
        Route::post('/uploadImage', 'BaseController@uploadImage');
        /**
         * 微信路由
         */
        Route::group(['prefix' => 'wechat'], function() {
            Route::get('/config', 'Wechat\ConfigController@index');
//            Route::post('/config/set', 'Wechat\ConfigController@set');
//            Route::post('/config/get', 'Wechat\ConfigController@get');
//            Route::get('/menu', 'Wechat\MenuController@index');
//            Route::get('/menu/add', 'Wechat\MenuController@showAdd');
//            Route::post('/menu/add', 'Wechat\MenuController@actionAdd');
//            Route::post('/menu/getMenus', 'Wechat\MenuController@getMenus');
//            Route::post('/menu/modifySortId', 'Wechat\MenuController@actionModifySortId');
//            Route::get('/menu/showModify/{id}', 'Wechat\MenuController@showAdd');
//            Route::post('/menu/del', 'Wechat\MenuController@actionDel');
//            Route::post('/menu/issue', 'Wechat\MenuController@issueMenus');
//            Route::post('/menu/getLevelOnes', 'Wechat\MenuController@getLevelOnes');
            Route::post('/qrcode', 'Wechat\WechatController@QRcode');
            Route::get('/callback', 'Wechat\CallbackController@index');
            Route::post('/callback/upload', 'Wechat\CallbackController@uploadImg');
            Route::get('/material', 'Wechat\MaterialController@index');
            Route::get('/material/article', 'Wechat\MaterialController@showAddArticle');
            Route::get('/material/image', 'Wechat\MaterialController@showAddImage');
            Route::post('/material/addImage', 'Wechat\MaterialController@addImage');
            Route::post('/material/getImages', 'Wechat\MaterialController@getImages');
        });
        /**
         * 用户管理
         */
        Route::group(['prefix' => 'user'], function() {
            Route::get('/index', 'User\WechatUserController@index');
            Route::post('/getUsers', 'User\WechatUserController@getUsers');
            /**
             * 微信用户
             */
            Route::group(['prefix' => 'user_wechat'], function() {
//                Route::post('/synchronize_user', 'User\WechatUserController@synchronizeUsers');
                Route::get('/group', 'User\WechatUserController@showGroup');
                Route::post('/synchronize_user_group', 'User\WechatUserController@synchronizeUserGroups');
                Route::post('/add_user_group', 'User\WechatUserController@addUserGroup');
                Route::post('/modify_user_group', 'User\WechatUserController@modifyUserGroup');
                Route::get('/detail', 'User\WechatUserController@showUserDetail');
                Route::post('/getGroups', 'User\WechatUserController@getGroups');
                Route::post('/delGroup', 'User\WechatUserController@delUserGroup');
            });
        });
        /**
         * 系统设置
         */
        Route::group(['prefix' => 'system'], function() {
            /**
             * 权限管理
             */
            Route::group(['prefix' => 'permission'], function() {
                Route::get('/index', 'System\PermissionController@index');
                Route::get('/add', 'System\PermissionController@showAdd');
                Route::post('/add', 'System\PermissionController@actionAdd');
                Route::post('/getAll', 'System\PermissionController@getPermissions');
                Route::post('/getPermissions', 'System\PermissionController@getPermissionByParentId');
                Route::post('/del', 'System\PermissionController@del');
                Route::post('/getPermissionsByTree', 'System\PermissionController@getPermissionsByTree');

            });
            /**
             * 角色管理
             */
            Route::group(['prefix' => 'role'], function() {
                Route::get('/index', 'System\RoleController@index');
                Route::get('/add', 'System\RoleController@showAdd');
                Route::post('/add', 'System\RoleController@actionAdd');
                Route::post('/getAll', 'System\RoleController@getRoles');
            });
            /**
             * 管理员
             */
            Route::group(['prefix' => 'admin'], function() {
                Route::get('/index', 'System\AdminController@index');
                Route::post('/getAll', 'System\AdminController@getAll');
                Route::get('/add', 'System\AdminController@showAdd');
            });
        });
    });
});

/*
|--------------------------------------------------------------------------
| 微信公众号路由
|--------------------------------------------------------------------------
*/
Route::get('/wechat/showRegisterForm', 'Api\Auth\RegisterController@showRegisterForm');
Route::post('/auth/register', 'Api\Auth\RegisterController@register');
Route::get('/wechat/showLoginForm', 'Api\Auth\LoginController@showLoginForm');
Route::post('/auth/login', 'Api\Auth\LoginController@login');

Route::group(['prefix' => 'wechat', 'namespace' => 'Wechat'], function() {
//Route::group(['prefix' => 'wechat', 'namespace' => 'Wechat', 'middleware' => 'auth:api'], function() {
    Route::post('/user/workers', 'User\UserController@workers');        //获取员工

    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function() {
        Route::get('/index', 'RegisterController@index');     //选择养户/员工 页面
        Route::get('/worker', 'RegisterController@worker');   //员工申请表单
        Route::get('/farmer', 'RegisterController@farmer');   //养户申请表单
        Route::post('/registerFarmer', 'RegisterController@registerFarmer');
        Route::post('/registerWorker', 'RegisterController@registerWorker');

    });
    Route::group(['middleware' => 'wechat'], function() {
        /**
         * 个人中心
         */
        Route::group(['prefix' => 'user', 'namespace' => 'User'], function() {
            Route::get('/index', 'UserController@index');                       //用户个人中心首页(U-1)
            Route::get('/info', 'UserController@info');                         //用户信息(U-2)
            Route::get('/modify', 'UserController@modify');
            Route::get('/showNoPassCause', 'UserController@showNoPassCause');   //用户信息(U-2)
            Route::get('/governor', 'UserController@governor');                 //管理组页面(U-3)
            Route::get('/applyGovernorList', 'UserController@applyGovernorList');                 //管理组页面(U-3)
            Route::get('/applyList', 'UserController@applyList');               //申请者列表(U-5)
            Route::get('/applyInfo/{user_id}', 'UserController@applyInfo');               //申请者列表(U-4)
            Route::post('/reject', 'UserController@reject');                     //用户请求驳回
            Route::post('/delete', 'UserController@delete');                     //删除附属管理者
            Route::post('/pass', 'UserController@pass');
            Route::post('/noPass', 'UserController@noPass');
        });

        /**
         * 数据监测
         */
        Route::group(['prefix' => 'data', 'namespace' => 'Data'], function() {

        });
        /**
         * 视频监控
         */
        Route::group(['prefix' => 'video', 'namespace' => 'Current'], function() {
            Route::get('/index', 'VideoController@index');          //视频中心首页
            Route::get('/showAdd', 'VideoController@showAdd');      //添加摄像头页面(U-12)
            Route::post('/add', 'VideoController@add');
            Route::post('/liveAddress', 'VideoController@liveAddress');
        });
        /**
         * 环境监控
         */
        Route::group(['prefix' => 'environment', 'namespace' => 'Current'], function() {
            Route::get('index', 'EnvironmentController@index');
        });
        /**
         * 圈舍
         */
        Route::group(['prefix' => 'factory', 'namespace' => 'Current'], function() {
            Route::get('/showAdd', 'FactoryController@showAdd');               //添加圈舍页面
            Route::get('/showListByUser', 'FactoryController@showListByUser'); //用户圈舍列表(U-7)
            Route::get('/showInfo', 'FactoryController@showInfo');             //圈舍信息(U-8)
            Route::post('/add', 'FactoryController@add');             //圈舍信息(U-8)
        });
        /**
         * 区域
         */
        Route::group(['prefix' => 'region', 'namespace' => 'Current'], function() {
            Route::get('/showAdd', 'RegionController@showAdd');                         //添加区域页面
            Route::get('/showListByFactory', 'RegionController@showListByFactory');     //区域列表(U-9)
            Route::post('/add', 'RegionController@add');     //区域列表(U-9)
        });
    });
});



Route::group(['namespace' => 'Api'], function() {
    /**
     * 用户身份验证
     */
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function() {
        //登录
        Route::post('login', 'LoginController@login');
        //注册管理员

        Route::post('/registerAdmin', 'RegisterController@registerAdmin');

    });
    /**
     * 用户数据路由
     */
    Route::group(['prefix' => 'user', 'namespace' => 'User'], function() {
        //获取用户信息
        Route::post('user', 'UserController@user');
        //退出登录
        Route::post('logout', 'UserController@logout');
        Route::post('get', 'UserController@get');
        Route::post('modifyStatus', 'UserController@modifyStatus');

        /**
         * 养户
         */
        Route::group(['prefix' => 'farmer'], function() {
            Route::post('getAll', 'FarmerController@getFarmers');
        });
        /**
         * 员工
         */
        Route::group(['prefix' => 'worker'], function() {
            Route::post('getAll', 'WorkerController@getWorkers');
        });
    });
    /**
     * 监控数据路由
     */
    Route::group(['prefix' => 'video'], function() {
        Route::post('getAll', 'VideoController@getAll');
        Route::post('getInfo', 'VideoController@getInfo');
        Route::post('getLiveAddress', 'VideoController@liveAddress');
    });
    /**
     * 监测数据路由
     */
    Route::group(['prefix' => 'environmental'], function() {

    });
    /**
     * 圈舍
     */
    Route::group(['prefix' => 'factory'], function() {
        Route::post('getAll', 'FactoryController@getAll');
    });
    /**
     * 区域
     */
    Route::group(['prefix' => 'region'], function() {
        Route::post('getAll', 'RegionController@getAll');
    });
    /**
     * Wechat
     */
    Route::group(['prefix' => 'wechat', 'namespace' => 'Wechat'], function() {
        /**
         * 微信用户
         */
        Route::group(['prefix' => 'user'], function() {
            Route::post('getWechatUsers', 'WechatUserController@getWechatUsers');
            Route::post('synchronizeUsers', 'WechatUserController@synchronizeUsers');
        });
        /**
         * 微信配置
         */
        Route::group(['prefix' => 'config'], function() {
            Route::post('get', 'ConfigController@get');
            Route::post('set', 'ConfigController@set');
        });
        /**
         * 微信按钮
         */
        Route::group(['prefix' => 'menu'], function () {
            Route::post('getMenus', 'MenuController@getMenus');
            Route::post('getLevelOnes', 'MenuController@getLevelOnes');
            Route::post('add', 'MenuController@add');
            Route::post('modify', 'MenuController@modify');
            Route::post('modifySortId', 'MenuController@modifySortId');
            Route::post('del', 'MenuController@del');
            Route::post('issueMenus', 'MenuController@issueMenus');
        });
    });
    /**
     * 系统历史记录
     */
    Route::group(['prefix' => 'history', 'namespace' => 'History'], function() {
        /**
         * 驳回记录
         */
        Route::group(['prefix' => 'reject'], function() {
            Route::post('getAll', 'RejectController@getAll');
        });
    });
    /**
     * 云平台相关设置
     */
    Route::group(['prefix' => 'yun', 'namespace' => 'Yun'], function() {
        /**
         * 萤石云
         */
        Route::group(['prefix' => 'ysyun'], function() {
            Route::post('set', 'YSYunController@set');
            Route::post('get', 'YSYunController@get');
        });
    });
});




