<?php

namespace App\Model\Admin;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'admins';

    protected $fillable = ['username', 'password'];

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
