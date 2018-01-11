<?php

namespace App\Http\Controllers\Admin\Wechat;

use App\Model\User;
use EasyWeChat\Kernel\Exceptions\Exception;
use Illuminate\Http\Request;
use App\Model\Current\Examine;
use Facades\App\Libraries\WechatTool;
use App\Http\Controllers\Admin\BaseController;

class WechatUserController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 微信会员控制器
    |--------------------------------------------------------------------------
    */

    /**
     * 获取微信用户数据
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsers(Request $request)
    {
        $users = User::where($this->searchDateWhere)->with(['wechat' => function ($query) {
            $query->with('group');
        }])->whereHas('wechat', function ($query) {
            $query->where($this->searchWhere);
        })->paginate($request->input('limit'));;

        return response()->json(['data' => $users]);
    }


    /**
     * 同步微信端用户到本地
     * @return \Illuminate\Http\JsonResponse
     */
    public function synchronizeUsers()
    {
        try {
            $open_ids = WechatTool::getUserList();

            foreach ($open_ids['data']['openid'] as $open_id) {
                if (empty(WechatTool::getUserIdByOpenID($open_id))) {
                    WechatTool::addUser($open_id);
                }
            }
        } catch (Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['status' => 0, 'msg' => trans('system.synchronize_success')]);
    }


    /**
     * 驳回申请
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function noPass(Request $request)
    {
        $data = $request->all();

        $data = array_merge($data, ['admin_id' => auth()->guard('api')->user()->id]);

        try {
            DB::transaction(function() use ($data) {
                User::where('id', $data['user_id'])->update(['status' => 3]);

                Examine::create($data);
            }, 2);
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['msg' => trans('system.operate_success')]);
    }
}
