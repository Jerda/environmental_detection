<?php

namespace App\Http\Controllers\Admin\Current;

use Illuminate\Http\Request;
use App\Model\Current\Factory;
use App\Http\Requests\FactoryStorePost;
use App\Http\Controllers\Admin\BaseController;

class FactoryController extends BaseController
{
    /**
     * 获取全部圈舍
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll(Request $request)
    {
        $factories = Factory::where($this->formatWhere(['id', 'farmer_id', 'name', 'factory_status', 'type']))
            ->with(['farmer' => function ($query) {
                $query->with('user');
            }])->paginate($request->input('limit'));

        return response()->json(['data' => $factories]);
    }


    /**
     * 通过ID获取圈舍
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request)
    {
        $id = $request->input('id');

        $factory = Factory::where('id', $id)->with('region')->first();

        return response()->json(['data' => $factory]);
    }


    /**
     * 添加圈舍
     * @param FactoryStorePost $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(FactoryStorePost $request)
    {
        return Factory::store($request->all());
    }


    /**
     * 修改圈舍
     * @param FactoryStorePost $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function modify(FactoryStorePost $request)
    {
        return Factory::modify($request->except('region'));
    }


    public function status()
    {
        $data = request()->all();

        try {
            DB::transaction(function () use ($data) {
                Factory::where('id', $data['user_id'])->update(['status' => $data['status']]);

                $data['status'] != 3 ?: $this->reject($data);
            });
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['msg' => trans('system.operate_success')]);
    }
}