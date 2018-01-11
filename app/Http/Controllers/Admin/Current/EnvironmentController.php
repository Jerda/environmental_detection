<?php

namespace App\Http\Controllers\Admin\Current;

use App\Model\Current\Environment;
use App\Http\Controllers\Admin\BaseController;

class EnvironmentController extends BaseController
{
    public function getAll()
    {
        $environments = Environment::with(['region' => function ($query) {
            $query->with('factory');
        }])->with(['farmer' => function ($query) {
            $query->with('user');
        }])->paginate(request()->input('limit'));

        return response()->json(['status' => 1, 'data' => $environments]);
    }


    /**
     * 修改环境监控状态
     * @return \Illuminate\Http\JsonResponse
     */
    public function status()
    {
        try {
            $data = request()->all();

            Environment::where('id', $data['environment_id'])->update(['status' => $data['status']]);

            $data['status'] != 3 ?: $this->reject($data);

        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        return response()->json(['status' => 1, 'msg' => trans('system.operate_success')]);
    }
}