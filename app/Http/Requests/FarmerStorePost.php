<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class FarmerStorePost extends FormRequest
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
            'mobile' => 'required',
            'idcard' => 'required',
            'code' => 'required',
            'organization' => 'required',
            'worker_id' => 'required',
        ];
    }


    public function messages()
    {
        return [
            'name.required' => '姓名不能为空',
            'mobile.required' => '手机号不能为空',
            'idcard.required' => '身份证不能为空',
            'code.required' => '养户编号不能为空',
            'organization.required' => '所属机构不能为空',
            'worker_id.required' => '必须选择负责人',
        ];
    }
}
