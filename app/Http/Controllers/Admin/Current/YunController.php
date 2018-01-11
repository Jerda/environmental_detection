<?php

namespace App\Http\Controllers\Admin\Current;

use Illuminate\Http\Request;
use Facades\App\Libraries\YSYun;
use App\Model\Current\YunTerrace;
use App\Http\Controllers\Admin\BaseController;

class YunController extends BaseController
{
    private $model;

    /**
     * YunController constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->model = YunTerrace::first();
    }


    public function get()
    {
        return response()->json(['data' => $this->model]);
    }


    /**
     * 设置云平台信息
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function set(Request $request)
    {
        $data = $request->all();

        try {
            if (empty($this->model)) {
                YunTerrace::create($data);
            } else {
                $this->model->app_key = $data['app_key'];
                $this->model->secret = $data['secret'];
                $this->model->save();
            }

            YSYun::accessToken();
        } catch (Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['status' => 1, 'msg' => trans('system.set_success')]);
    }
}