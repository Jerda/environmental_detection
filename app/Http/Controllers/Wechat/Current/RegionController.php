<?php

namespace App\Http\Controllers\Wechat\Current;

use App\Model\User;
use Illuminate\Http\Request;
use App\Model\Current\Region;
use App\Model\Current\Factory;
use App\Http\Requests\RegionStorePost;
use App\Http\Controllers\Wechat\BaseController;

class RegionController extends BaseController
{
    /**
     * 添加区域
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showAdd()
    {
        return view('wechat.region.add');
    }


    /**
     * 区域列表(U-9)
     * @param $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showListByFactory(Request $request)
    {
        $factory_id = $request->input('factory_id');

        $regions = Region::where('factory_id', $factory_id)->get();

        return view('wechat.region.list', compact('regions'));
    }


    /**
     * 通过当前用户获取区域
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRegionsByFactoryId(Request $request)
    {
        $factory_id = $request->input('factory_id');

        $regions = Region::where('factory_id', $factory_id)->get();

        return response()->json(['data' => $regions]);
    }


    public function add(RegionStorePost $request, Region $region)
    {
        if (Auth::user()->can('create', $region)) {
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


    public function modify(User $user, Region $region, RegionStorePost $request)
    {
        $data = $request->all();

        if ($user->can('update', $region)) {
            try {
                Factory::where('id', $data['id'])->update($data);
            } catch (\Exception $e) {
                return $this->sendSystemErrorResponse();
            }

            return response()->json(['msg' => trans('system.add_success')]);

        } else {
            return $this->sendSystemNoAuthResponse();
        }
    }


    /**
     * 根据圈舍ID获取区域，如果只需要某些字段，可以通过传入field来指定
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listByFactory(Request $request)
    {
        $factory_id = $request->input('factory_id');

        $field = $request->input('field');

        $field = empty($field) ? ['*'] : $field;

        $regions = Region::where('factory_id', $factory_id)->get($field);

        return response()->json(['data' => $regions]);
    }
}