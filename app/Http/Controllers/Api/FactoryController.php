<?php

namespace App\Http\Controllers\Api;

use App\Model\Current\Factory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FactoryStorePost;

class FactoryController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 圈舍控制器
    |--------------------------------------------------------------------------
    */

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
     * 添加圈舍
     * @param FactoryStorePost $request
     * @param Factory $factory
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(FactoryStorePost $request, Factory $factory)
    {
        if (Auth::user()->can('create', $factory)) {
            try {
                Factory::create($request->all());
            } catch (\Exception $e) {
                return $this->sendSystemErrorResponse();
            }

            return response()->json(['msg' => trans('system.add_success')]);

        } else {
            return $this->sendSystemNoAuthResponse();
        }
    }


    /**
     * 修改圈舍
     * @param FactoryStorePost $request
     * @param Factory $factory
     * @return \Illuminate\Http\JsonResponse
     */
    public function modify(FactoryStorePost $request, Factory $factory)
    {
        $data = $request->all();

        if (Auth::user()->can('update', $factory)) {
            try {
                Factory::where('id', $data['id'])->update($data);
            } catch (\Exception $e) {
                return $this->sendSystemErrorResponse();
            }

            return response()->json(['msg' => trans('system.modify_success')]);

        } else {
            return $this->sendSystemNoAuthResponse();
        }
    }


    /**
     * 获取用户下的所有圈舍，如果只需要某些字段，可以通过传入field来指定
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFactoriesByUser(Request $request)
    {
        $field = $request->input('field');

        $field = empty($field) ? ['*'] : $field;

        $factories = Factory::where('farmer_id', $this->farmer_id)->get($field);

        return response()->json(['data' => $factories]);
    }
}
