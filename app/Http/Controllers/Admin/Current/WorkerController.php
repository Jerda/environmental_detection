<?php

namespace App\Http\Controllers\Admin\Current;


use App\Model\User;
use App\Http\Controllers\Admin\BaseController;

class WorkerController extends BaseController
{
    public function getWorkers()
    {
        $workers = User::Workers()->where($this->formatWhere())->with(['worker' => function($query) {
            $query->withCount('farmer');
        }])->paginate(request()->input('limit'));

        return response()->json(['data' => $workers]);
    }


    public function get()
    {
        $worker = User::Workers()->where('id', request()->input('user_id'))->first();

        return response()->json(['data' => $worker]);
    }


    public function modify()
    {
        $data = request()->all();

        try {
            User::where('id', $data['id'])->update($data);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => trans('system.error')]);
        }

        return response()->json(['status' => 1, 'msg' => trans('system.modify_success')]);
    }
}