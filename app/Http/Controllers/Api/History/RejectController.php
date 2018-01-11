<?php

namespace App\Http\Controllers\Api\History;

use Illuminate\Http\Request;
use App\Model\Current\Examine;
use App\Http\Controllers\Api\BaseController;

class RejectController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 驳回申请控制器
    |--------------------------------------------------------------------------
    */

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll(Request $request)
    {
        $examines = Examine::where($this->formatWhere(['type']))->with('user')
            ->whereHas('user', function ($query) {
                $query->where($this->formatWhere(['name']));
            })->with('admin')->paginate($request->input('limit'));

        return response()->json(['data' => $examines]);
    }
}