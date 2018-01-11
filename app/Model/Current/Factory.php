<?php

namespace App\Model\Current;

use Illuminate\Database\Eloquent\Model;

class Factory extends Model
{
    protected $table = 'factory';

    protected $fillable = ['name', 'factory_status', 'type', 'farm_mode', 'sealing', 'sewage', 'fan_mode',
        'length', 'width', 'fan_num', 'cooling_pad_num', 'area', 'animal_num', 'province', 'city',
        'district', 'address', 'remark'];


    /**
     * 添加
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function store($data)
    {
        Factory::create($data);


        /*try {
            DB::transaction(function () use ($data) {
                Factory::create($data);
            }, 2);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => trans('system.error')]);
        }

        return response()->json(['status' => 1, 'msg' => trans('system.add_success')]);*/
    }


    /**
     * 修改
     * @param $data
     * @return \Illuminate\Http\JsonResponse
     */
    public static function modify($data)
    {
        try {
            Factory::where('id', $data['id'])->update($data);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => trans('system.error')]);
        }

        return response()->json(['status' => 1, 'msg' => trans('system.modify_success')]);
    }


    public function farmer()
    {
        return $this->belongsTo('App\Model\Current\Farmer');
    }


    public function region()
    {
        return $this->HasMany('App\Model\Current\Region');
    }
}
