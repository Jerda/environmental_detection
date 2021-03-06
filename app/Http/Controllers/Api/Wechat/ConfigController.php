<?php

namespace App\Http\Controllers\Api\Wechat;

use Illuminate\Http\Request;
use App\Model\Admin\WechatAccount;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Admin\BaseController;

class ConfigController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 微信接口配置控制器
    |--------------------------------------------------------------------------
    */


    /**
     * POST设置微信配置
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function set(Request $request)
    {
        if (!$this->validator($request->all())) {
            return $this->sendFailedSetResponse();
        }

        try {
            $this->addOrUpdate($request->all());
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return $this->sendSuccessSetResponse();
    }


    public function get()
    {
        $wechat_account = WechatAccount::first();

        return $wechat_account ? response()->json(['data' => $wechat_account->toArray()]) : null;
    }


    /**
     * 验证用户提交微信接口配置字段
     *
     * @param array $data
     * @return bool
     */
    private function validator(array $data)
    {
        $validator = Validator::make($data, [
            /*'name' => 'required',
            'wechat_id' => 'required',
            'init_wechat_id' => 'required',*/
            'app_id' => 'required',
            'app_secret' => 'required',
//            'api' => 'required',
            'token' => 'required',
//            'encoding_aes_key' => 'required'
        ]);

        if ($validator->fails()) {  //用户提交字段验证失败
            $this->callback_msg = $validator->errors();
            return false;
        } else {
            return true;
        }
    }


    /**
     * 如果第一次设置，将添加配置数据，否则更新配置数据
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    private function addOrUpdate(array $data)
    {
        DB::transaction(function () use ($data) {
            if (empty($wechat_account = WechatAccount::first())) {
                WechatAccount::create($data);
            } else {
                WechatAccount::where('id', $wechat_account->id)->update($data);
            }
        }, 2);
    }


    /**
     * 发送设置失败响应
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function sendFailedSetResponse()
    {
        return response()->json(['status' => 0, 'msg' => trans('system.must_complete_information')]);
    }


    /**
     * 发送设置成功响应
     *
     * @return \Illuminate\Http\JsonResponse
     */
    private function sendSuccessSetResponse()
    {
        return response()->json(['status' => 1, 'msg' => trans('system.set_success')]);
    }
}
