<?php

namespace App\Http\Controllers\Api\User;

use App\Model\User;
use Illuminate\Http\Request;
use App\Model\Current\Farmer;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\BaseController;

class UserController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 用户控制器
    |--------------------------------------------------------------------------
    */

    /**
     * 获取当前登录用户
     * @return JSON {name: '', sex: ''......}
     */
    public function user()
    {
        return auth()->guard($this->getGuardByClient())->user();
    }


    /**
     * 登出
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function logout()
    {
        try {
            Auth::guard($this->getGuardByClient())->logout();
        } catch (\Exception $e) {
            return redirect('/');
        }
    }


    public function get(Request $request)
    {
        $id = $request->input('user_id');

        $user = User::where('id', $id)->with(['farmer' => function($query) {
            $query->with(['worker' => function($query) {
                $query->with('user');
            }]);
        }])->with('worker')->with('wechat')->first();

        return response()->json(['data' => $user]);
    }


    public function modify(Request $request)
    {
        $data = $request->all();
        $farmer = $data['farmer'];
        unset($data['farmer']);
        unset($data['wechat']);
        unset($data['worker']);
        unset($farmer['worker']);

        try {
            DB::transaction(function () use ($data, $farmer) {
                User::where('id', $data['id'])->update($data);

                Farmer::where('user_id', $data['id'])->update($farmer);
            }, 2);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => trans('system.error')]);
        }


        return response()->json(['msg' => trans('system.modify_success')]);
    }


    /**
     * 修改用户状态
     * @return \Illuminate\Http\JsonResponse
     */
    public function modifyStatus()
    {
        $data = request()->all();

        User::where('id', $data['user_id'])->update(['status' => $data['status']]);

        $data['status'] != 3 ? :$this->reject($data);

        return response()->json(['msg' => trans('system.operate_success')]);
    }


    /**
     * 获取用户open_id
     * @return string
     */
    public function openid()
    {
        return Auth::user()->openid;
    }
}