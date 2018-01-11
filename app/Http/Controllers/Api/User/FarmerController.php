<?php

namespace App\Http\Controllers\Api\User;

use App\Model\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController;

class FarmerController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 养户控制器
    |--------------------------------------------------------------------------
    */

    public function getFarmers(Request $request)
    {
        $farmers = User::Farmers()->where($this->formatWhere(['name', 'mobile', 'status', 'id']))
            ->with(['farmer' => function($query) {
                $query->with(['worker' => function($query) {
                    $query->with('user');
                }]);
                $query->withCount('factory');
            }])->whereHas('farmer', function($query) {
                $query->where($this->formatWhere(['code', 'organization', 'worker_id']));
            })->paginate($request->input('limit'));

        return response()->json(['data' => $farmers]);
    }
}