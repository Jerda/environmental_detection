<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class SMSCode extends Model
{
    protected $table = 'sms_code';

    protected $fillable = ['code', 'mobile'];


    public function scopeCode($query, $mobile)
    {
        $date = date('Y-m-d H:i:s', time() - 60);

        $query->where('mobile', $mobile)->where('created_at', '>=' , $date)->orderBy('created_at', 'desc');
    }
}
