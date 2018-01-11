<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FactoryStorePost extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'            => 'required|string|max:24|min:5',
            'type'            => 'required',
            'farm_mode'       => 'required',
            'sealing'         => 'required',
            'sewage'          => 'required',
            'fan_mode'        => 'required',
            'length'          => 'required|digits',
            'width'           => 'required|digits',
            'fan_num'         => 'required|digits',
            'cooling_pad_num' => 'required|digits',
            'area'            => 'required|digits',
            'animal_num'      => 'required|digits',
            'province'        => 'required',
            'city'            => 'required',
            'district'        => 'required',
            'address'         => 'required',
        ];
    }

    public function messages()
    {
        return [
            'name.required'            => '圈舍名称不能为空',
            'name.string'              => '圈舍名称不正确',
            'farm_mode.required'       => '请选择圈舍模式',
            'sealing.required'         => '请选择密封性',
            'sewage.required'          => '请选择排污方式',
            'fan_mode.required'        => '请选择通风方式',
            'length.required'          => '请填写圈舍总长',
            'width.required'           => '请填写圈舍总宽',
            'fan_num.required'         => '请填写风机数量',
            'cooling_pad_num.required' => '请填写湿帘数量',
            'area.required'            => '请填写圈舍面积',
            'animal_num.required'      => '请填写畜生数量',
            'province.required'        => '请填写地址',
            'city.required'            => '请填写地址',
            'district.required'        => '请填写地址',
            'address.required'         => '请填写地址',
            'length.digits'            => '圈舍长度必须是数字',
            'width.digits'             => '圈舍长度必须是数字',
            'fan_num.digits'           => '圈舍长度必须是数字',
            'cooling_pad_num.digits'   => '圈舍长度必须是数字',
            'area.digits'              => '圈舍长度必须是数字',
            'animal_num.digits'        => '圈舍长度必须是数字',
        ];
    }
}
