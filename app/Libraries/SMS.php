<?php

namespace App\Libraries;

use App\Model\SMSCode;
use Overtrue\EasySms\EasySms;
use Overtrue\EasySms\Strategies\OrderStrategy;
use Overtrue\EasySms\Exceptions\NoGatewayAvailableException;

class SMS
{
    public static $config = [
        // HTTP 请求的超时时间（秒）
        'timeout'  => 5.0,

        // 默认发送配置
        'default'  => [
            // 网关调用策略，默认：顺序调用
            'strategy' => OrderStrategy::class,

            // 默认可用的发送网关
            'gateways' => [
                'aliyun'
            ],
        ],
        // 可用的网关配置
        'gateways' => [
            'errorlog' => [
                'file' => '/tmp/easy-sms.log',
            ],
            'aliyun' => [
                'access_key_id' => 'LTAI9370lqWI7tpK',
                'access_key_secret' => 'VyICRHnxATcnSkI7sRuDRsqIzVgTEi',
                'sign_name' => '唐三荃',
            ],
        ],
    ];


    /**
     * 短信发送
     * @param $mobile
     * @param $template
     * @param $data
     * @return bool
     */
    public function send($mobile, $template, $data)
    {
        $easySms = new EasySms(static::$config);

        try {
            $easySms->send($mobile, [
                'template' => $template,
                'data' => $data
                /*'template' => 'SMS_117525910',
                'data'     => [
                    'code' => 6379
                ],*/
            ]);
        } catch (NoGatewayAvailableException $e) {
            return $e->results['aliyun']['exception']->getMessage();
        }

        return true;
    }


    /**
     * 发送验证码
     * @param $mobile
     * @return bool
     */
    public function sendValidate($mobile)
    {
        $code = rand(1000, 9999);

        $this->store($mobile, $code);

        return $this->send($mobile, 'SMS_117525910', ['code' => $code]);
    }


    /**
     * 检测验证码是否正确
     * @param $mobile    用户手机号
     * @param $user_code 用户输入的验证码
     * @return bool
     */
    public function checkValidate($mobile, $user_code)
    {
        $code = SMSCode::Code($mobile)->latest()->value('code');

        return $code == $user_code ? true : false;
    }


    /**
     * 保存验证信息
     * @param $mobile
     * @param $code //
     */
    private function store($mobile, $code)
    {
        SMSCode::create([
            'mobile' => $mobile,
            'code' => $code
        ]);
    }
}