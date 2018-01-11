<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Environment extends Model
{
    protected $table = 'environment';

    protected $fillable = ['name', 'region_id'];


    public function region()
    {
        return $this->belongsTo('App\Model\Current\Region');
    }

    public function farmer()
    {
        return $this->belongsTo('App\Model\Current\Farmer');
    }
}
