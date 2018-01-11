<?php

namespace App\Http\Controllers\Wechat\Current;

use App\Model\Current\Environment;
use App\Http\Controllers\Wechat\BaseController;

class EnvironmentController extends BaseController
{
    public function index()
    {
        return view('wechat.environment.index');
    }

    public function showAdd()
    {
        return view('wechat.environment.add');
    }


    public function add()
    {
        $data = request()->only('region_id');

        try {
            Environment::create([
                'farmer_id' => $this->currentFarmerId(),
                'equipment_id' => $data['equipment_id'],
                'region_id' => $data['region_id'],
                'status' => 2
            ]);
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['msg' => trans('system.add_success')]);
    }
}