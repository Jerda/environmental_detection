<?php

namespace App\Http\Controllers\Api\Yun;

use App\Libraries\SMS;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;

class SMSController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 短信控制器
    |--------------------------------------------------------------------------
    */

    private $sms;

    /**
     * SMSController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->sms = new SMS();
    }


    public function getValidate(Request $request)
    {
        $mobile = $request->input('mobile');

        if (!$mobile) {
            return response()->json(['msg' => '验证码未填写'], 422);
        }

        try {
            $this->checkMobile($mobile);
        } catch (\Exception $e) {
            return response()->json(['msg' => $e->getMessage()], 422);
        }

        if (($res = $this->sms->sendValidate($mobile)) !== true) {
            return response()->json(['msg' => $res], 422);//todo 加入日志
        } else {
            return response()->json(['msg' => '发送成功']);
        }
    }
}