<?php
namespace App\Http\Controllers\Wechat\Data;

use App\Http\Controllers\Wechat\BaseController;

class DataController extends BaseController
{
    /**
     * 数据中心(U-13)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('wechat.data.index');
    }
}