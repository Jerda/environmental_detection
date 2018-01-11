<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    protected $table = 'worker';

    protected $fillable = [];

    public function user()
    {
        return $this->belongsTo('App\Model\User');
    }


    public function farmer()
    {
        return $this->belongsTo('App\Model\Current\Farmer', 'id', 'worker_id');
    }
}
