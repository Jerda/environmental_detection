<?php

namespace App\Http\Controllers\Admin\Current;

use App\Model\User;
use Illuminate\Http\Request;
use App\Model\Current\Farmer;
use App\Model\Current\Examine;
use App\Http\Controllers\Admin\BaseController;

class UserController extends BaseController
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExamine(Request $request)
    {
        $examines = Examine::where($this->formatWhere(['type']))->with('user')
            ->whereHas('user', function ($query) {
                $query->where($this->formatWhere(['name']));
            })->with('admin')->paginate($request->input('limit'));

        return response()->json(['data' => $examines]);
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
    public function status()
    {
        $data = request()->all();

        User::where('id', $data['user_id'])->update(['status' => $data['status']]);

        $data['status'] != 3 ? :$this->reject($data);

        return response()->json(['msg' => trans('system.operate_success')]);
    }
}