<?php

namespace App\Http\Controllers\Wechat\Current;

use App\Model\Current\Factory;
use App\Http\Requests\FactoryStorePost;
use App\Http\Controllers\Wechat\BaseController;
use App\Model\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FactoryController extends BaseController
{

    /**
     * 添加圈舍页面
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showAdd()
    {
        return view('wechat.factory.add');
    }


    /**
     * 用户圈舍列表(U-7)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showListByUser()
    {
        $factories = Factory::where('farmer_id', $this->farmer_id)->get();

        return view('wechat.factory.list', compact('factories'));
    }


    /**
     * 圈舍信息(U-8)
     * @param $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showInfo(Request $request)
    {
        $factory_id = $request->input('factory_id');

        $factory = Factory::find($factory_id);

        return view('wechat.factory.info', compact('factory'));
    }


    /**
     * 通过当前用户获取圈舍
     * @return \Illuminate\Http\JsonResponse
     */
    public function getFactoriesByUser()
    {
        if (empty(Auth::user()->farmer()->master)) {
            $farmer_id = Auth::user()->farmer()->id;
        } else {
            $farmer_id = Auth::user()->farmer()->master;
        }

        $factories = Factory::where('farmer_id', $farmer_id)->get();

        return response()->json(['data' => $factories]);
    }


    /**
     * 申请圈舍
     * @param FactoryStorePost $request
     * @param Factory $factory
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request, Factory $factory)
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
     * @param User $user
     * @param Factory $factory
     * @return \Illuminate\Http\JsonResponse
     */
    public function modify(FactoryStorePost $request, User $user, Factory $factory)
    {
        $data = $request->all();

        if ($user->can('update', $factory)) {
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
    public function listByUser(Request $request)
    {
        $field = $request->input('field');

        $field = empty($field) ? ['*'] : $field;

        $factories = Factory::where('farmer_id', $this->farmer_id)->get($field);

        return response()->json(['data' => $factories]);
    }
}