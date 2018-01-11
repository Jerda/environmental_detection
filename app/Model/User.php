<?php

namespace App\Model;

//use Illuminate\Database\Eloquent\Model;
use App\Traits\RegisterWechat;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable;

    use RegisterWechat;

    protected $table = 'users';

    public static $wechat_data = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'username', 'email', 'password', 'mobile', 'name', 'user_num', 'type',
        'idcard_num', 'idcard_img', 'QQ', 'remark',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    /*protected $hidden = [
        'password', 'remember_token',
    ];*/

    public function wechat()
    {
        return $this->hasOne('App\Model\WechatUser');
    }


    public function farmer()
    {
        return $this->hasOne('App\Model\Current\Farmer');
    }


    public function worker()
    {
        return $this->hasOne('App\Model\Current\Worker');
    }


    public static function setWechatData($data)
    {
        static::$wechat_data = $data;
    }


    public static function getWechatData()
    {
        return static::$wechat_data;
    }


    /**
     * 查询养户
     * @param $query
     */

    public function scopeFarmers($query)
    {
        $query->where('isFarmer', 1);
    }


    /**
     * 查询员工
     * @param $query
     */
    public function scopeWorkers($query)
    {
        $query->where('isWorker', 1);
    }


    /**
     * 因为使用的是username而不是email,故用此方法进行判断
     * @param $login
     * @return mixed
     */
    public function findForPassport($login)
    {
        return $this->where('username', $login)->first();
    }
}
