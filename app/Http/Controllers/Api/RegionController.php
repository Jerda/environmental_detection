<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Model\Current\Region;

class RegionController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 区域控制器
    |--------------------------------------------------------------------------
    */

    public function getAll(Request $request)
    {
        $regions = Region::with('video')->with('factory')->with('environment')
            ->whereHas('factory', function($query) {
                $query->where($this->formatWhere());
            })->paginate($request->input('limit'));

        return response()->json(['data' => $regions]);
    }


    public function get(Request $request)
    {
        $id = $request->input('id');

        $region = Region::find($id);

        return response()->json(['data' => $region]);
    }


    public function add(Request $request)
    {
        $data = $request->all();

        try {
            Region::create($data);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => trans('system.error')]);
        }

        return response()->json(['msg' => trans('system.add_success')]);
    }
}