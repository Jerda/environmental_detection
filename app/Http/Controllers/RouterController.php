<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

class RouterController extends Controller
{
    /**
     * --------------------------------------
     * 基础路由控制器
     * 主要用于判断微信或其他访问所提供的页面
     * --------------------------------------
     */

    protected $user_client = '';   //用户客户端


    //配置不同客户端所需的中间件
    protected $rule = [
            'wechat' => [
                'middleware' => 'wechat',
                'guard' => 'api'
            ],
            'pc' => [
                'middleware' => 'api',
                'guard' => 'api'
            ]
    ];

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        $this->userClient();

        //排出微信网页授权回调
        if (strpos(request()->path(), 'oauth_callback') !== false) {
            app('WechatTool')->oauthCallback();

            return redirect(empty(session('target_url')) ? url('/') : url(session('target_url')));
        }

        $this->middleware($this->getMiddlewareByClient());
    }


    public function index()
    {
        return view($this->user_client);
    }


    /**
     * 获取用户客户端类型
     * 主要用于判断是否为微信登录
     */
    protected function userClient()
    {
        strpos($_SERVER['HTTP_USER_AGENT'], 'MicroMessenger') !== false ?
            $this->user_client = 'wechat' : $this->user_client = 'pc';
    }


    /**
     * 根据客户端获取中间件名称
     * @return string
     */
    protected function getMiddlewareByClient()
    {
        return $this->rule[$this->user_client]['middleware'];
    }


    /**
     * 根据客户端获取中间件名称
     * @return string
     */
    protected function getGuardByClient()
    {
        return $this->rule[$this->user_client]['guard'];
    }


    protected function except(array $path)
    {
        return in_array(request()->path(), $path);
    }
}