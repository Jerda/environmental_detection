<?php
namespace App\Libraries;

use App\Model\User;
use Facades\App\Libraries\WechatTool;
use Illuminate\Support\Facades\Auth;

class AuthFarmerOrWorker
{
    /*
    |--------------------------------------------------------------------------
    | 验证用户是养户还是员工
    |--------------------------------------------------------------------------
    */


    public function check()
    {
        if (empty(session('user_type'))) {
            $user = Auth::user();

            if ($user->isFarmer == 1) {
                return session('user_type', 'farmer');
            } elseif ($user->isWorker == 1) {
                return session('user_type', 'worker');
            } else {
                return false;
            }
        }
    }


    /**
     * 微信网页授权
     * @return bool
     */
    public function isWechatLogin()
    {
        if (empty(Auth::check())) {
            session(['target_url' => '/wechat/user/index']);

            return WechatTool::oauth();
        }

        return true;
    }


    /*private function isFarmer($user_id)
    {
        $user = User::whereHas('farmer', function($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->first();

        return empty($user) ? false : session(['user_type' => 'farmer']);
    }


    private function isWorker($user_id)
    {
        $user = User::whereHas('worker', function($query) use ($user_id) {
            $query->where('user_id', $user_id);
        })->first();

        return empty($user) ? false : session(['user_type' => 'worker']);
    }*/
}