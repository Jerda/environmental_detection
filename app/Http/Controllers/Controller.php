<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;


    /**
     * 发送系统错误response
     * @return \Illuminate\Http\JsonResponse
     */
    protected function sendSystemErrorResponse()
    {
        //todo 加入日志
        return response()->json(['msg' => trans('system.error')], 500);
    }


    /**
     * 发送没有权限response
     */
    protected function sendSystemNoAuthResponse()
    {
        //todo 加入日志
        return response()->json(['msg' => trans('system.no_author')], 422);
    }


    protected function checkMobile($mobile)
    {
        if (!preg_match_all("/^1[34578]\d{9}$/", $mobile)) {
            throw new \Exception(trans('system.mobile_error'));
        }
    }
}
