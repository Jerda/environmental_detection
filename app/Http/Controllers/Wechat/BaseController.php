<?php
namespace App\Http\Controllers\Wechat;

use App\Model\User;
use App\Model\Current\Farmer;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BaseController extends Controller
{
    public $user_id;

    public $farmer_id;

    public $user_type = '';

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        /*$this->user_id = Auth::user()->id;

        if (empty(Auth::user()->farmer->master)) {
            $this->farmer_id = Auth::user()->farmer->id;
        } else {
            $farmer = Farmer::where('id', Auth::user()->farmer->master)->first();

            $this->farmer_id = $farmer->id;
        }*/
    }



    public function farmerId()
    {
        if (empty(Auth::user()->farmer->master)) {
            return Auth::user()->farmer->id;
        } else {
            $farmer = Farmer::where('id', Auth::user()->farmer->master)->first();

            return $farmer->id;
        }
    }


    /**
     * 是否是养户
     * @param $user_id
     */
    public function isFarmer($user_id)
    {
        $user = User::find('id', $user_id);

        $user->isFarmer ? true: false;
    }


    /**
     * 是否是员工
     * @param $user_id
     */
    public function isWorker($user_id)
    {
        $user = User::find('id', $user_id);

        $user->isWorker ? true: false;
    }
}

