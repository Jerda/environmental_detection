<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    protected $table = 'region';

    protected $fillable = ['name', 'factory_id', 'remark'];


    public function factory()
    {
        return $this->belongsTo('App\Model\Current\Factory');
    }

    public function video()
    {
        return $this->HasMany('App\Model\Current\Video');
    }


    public function environment()
    {
        return $this->HasOne('App\Model\Current\Environment');
    }
}
