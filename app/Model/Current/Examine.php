<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Examine extends Model
{
    protected $table = 'reject';

    protected $fillable = ['content', 'user_id', 'type', 'admin_id'];


    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }


    public function admin()
    {
        return $this->belongsTo('App\Model\Admin\Admin');
    }
}
