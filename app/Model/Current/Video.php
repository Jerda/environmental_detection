<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    protected $table = 'video';

    protected $fillable = ['name', 'region_id', 'QRCode', 'authCode', 'status', 'remark',
        'rtmpHd', 'rtmp', 'liveAddress', 'hdAddress', 'deviceSerial', 'channelNo', 'exception'];


    public function region()
    {
        return $this->belongsTo('App\Model\Current\Region');
    }


    public function farmer()
    {
        return $this->belongsTo('App\Model\Current\Farmer');
    }
}
