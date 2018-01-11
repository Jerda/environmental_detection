<?php

namespace App\Http\Controllers\Api\Yun;

use Illuminate\Http\Request;
use Facades\App\Libraries\YSYun;
use App\Model\Current\YunTerrace;
use App\Http\Controllers\Api\BaseController;

class YunController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 云平台控制器
    |--------------------------------------------------------------------------
    */

    protected $model;

    protected $name; //云平台名称


    /**
     * YunController constructor.
     */
    public function __construct()
    {
        parent::__construct();

        $this->model = YunTerrace::where('name', $this->name)->first();
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
                YunTerrace::create(array_merge($data), ['name' => $this->name]);
            } else {
                $this->model->where('name', $this->name)->update($data);
            }

            YSYun::accessToken();
        } catch (Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['msg' => trans('system.set_success')]);
    }


    /**
     * 获取云平台数据
     * @return \Illuminate\Http\JsonResponse
     */
    public function get()
    {
        return response()->json(['data' => $this->model]);
    }
}