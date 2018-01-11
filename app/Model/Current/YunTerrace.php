<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class YunTerrace extends Model
{
    protected $table = 'yun_terrace';

    protected $fillable = ['app_key', 'secret', 'access_token', 'expire_time'];
}
