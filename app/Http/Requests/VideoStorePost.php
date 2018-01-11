<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoStorePost extends FormRequest
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
            'name' => 'required',
            'deviceSerial' => 'required',
            'validateCode' => 'required',
        ];
    }


    public function messages()
    {
        return [
            'name.required' => '视频区名称必须填写',
            'deviceSerial.required' => '设备序列号必须填写',
            'validateCode.required' => '设备验证码必须填写',
        ];
    }
}
