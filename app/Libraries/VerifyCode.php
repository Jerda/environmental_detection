<?php

namespace App\Libraries;

use App\Model\SMSCode;

class VerifyCode
{
    public $code;

    /**
     * VerifyCode constructor.
     */
    public function __construct()
    {
        $this->code = mt_rand(1000, 9999);
    }


    /**
     * 发送验证码
     * @param $mobile
     * @return bool
     */
    public function send($mobile)
    {
        $this->save($mobile);

        return SMS::send($mobile, 'SMS_117525910', ['code' => $this->code]);
    }


    /**
     * 检测验证码是否正确
     * @param $mobile    用户手机号
     * @param $user_code 用户输入的验证码
     * @return bool
     */
    public function check($mobile, $user_code)
    {
        $code = SMSCode::Code($mobile)->latest()->value('code');

        return $code == $user_code ? true : false;
    }


    /**
     * 保存验证信息
     * @param $mobile
     */
    private function save($mobile)
    {
        SMSCode::create([
            'mobile' => $mobile,
            'code' => $this->code
        ]);
    }
}