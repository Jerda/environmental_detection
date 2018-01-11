<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Farmer extends Model
{
    protected $table = 'farmer';

    protected $fillable = ['user_id', 'code', 'address', 'organization', 'worker_id'];

    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }

    public function worker()
    {
        return $this->belongsTo('App\Model\Current\Worker', 'worker_id', 'id');
    }


    public function factory()
    {
        return $this->hasMany('App\Model\Current\Factory');
    }
}
