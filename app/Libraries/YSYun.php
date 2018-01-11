<?php
namespace App\Libraries;

use App\Model\Current\YunTerrace;
use GuzzleHttp\Client;
use Mockery\Exception;

class YSYun
{
    /*
    |--------------------------------------------------------------------------
    | 接入萤石云平台
    |--------------------------------------------------------------------------
    */
    private $http;

    private $app_key = '3d06a9ee649c4919938b5c36653a6bd7';
    
    private $secret = '2f1a045d8bd982f907a050c8283f8546';

    private $accessToken;

    private $api_address = [
        'getAccessToken' => 'https://open.ys7.com/api/lapp/token/get',
        'getUserList' => 'https://open.ys7.com/api/lapp/live/video/list',
        'addVideo' => 'https://open.ys7.com/api/lapp/device/add',
        'delVideo' => 'https://open.ys7.com/api/lapp/device/delete',
        'info' => 'https://open.ys7.com/api/lapp/device/info',
        'channel' => 'https://open.ys7.com/api/lapp/device/camera/list',
        'liveAddress' => 'https://open.ys7.com/api/lapp/live/address/get'
    ];


    private $error_code = [
        '10001' => '参数错误	参数为空或格式不正确',
        '10002' => 'accessToken异常或过期	重新获取accessToken',
        '10004' =>	'用户不存在',
        '10005' => 'appKey异常	appKey被冻结',
        '10017' => 'appKey不存在',
        '10030' => 'appKey和appSecret不匹配',
        '20002' => '设备不存在',
        '20007' => '设备不在线	检查设备是否在线',
        '20010' => '设备验证码错误	检查设备验证码是否错误',
        '20011' => '设备添加失败	检查设备网络等是否正常',
        '20013' => '设备已被别人添加	该设备已被别的账号添加',
        '20014' => 'deviceSerial不合法',
        '20017' => '设备已被自己添加	设备已经添加到该账号下',
        '20018' => '该用户不拥有该设备	检查设备是否属于当前账户',
        '20032' => '该用户下通道不存在	',
        '60020' => '不支持该命令',
        '60060' => '地址未绑定',
        '49999' => '数据异常	接口调用异常',
    ];

    /**
     * YSYun constructor.
     */
    public function __construct()
    {
        $this->http = new Client();
    }


    /**
     * 获取access_Token
     * @return bool|mixed
     * @throws \Exception
     */
    public function accessToken()
    {
        if (($res = $this->checkAccessTokenExpireTime()) !== true) {
            return $res;
        }

        $response = $this->http->post($this->api_address['getAccessToken'], [
            'form_params' => [
                'appKey' => $this->app_key, 'appSecret' => $this->secret
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] == 200) {
            $this->storeAccessToken($res['data']['accessToken'], $res['data']['expireTime']);
            return $res['data']['accessToken'];

        } else {
            throw new \Exception($this->errorMsg($res['code']));
        }
    }


    public function getUserList()
    {
        $response = $this->http->post($this->api_address['getUserList'], [
            'form_params' => ['accessToken' => $this->accessToken]]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] == 200) {

        } else {
            throw new \Exception($this->errorMsg($res['code']));
        }
    }


    public function addVideo($accessToken, $deviceSerial, $validateCode)
    {
        $response = $this->http->post($this->api_address['addVideo'], [
            'form_params' => [
                'deviceSerial' => $deviceSerial,
                'validateCode' => $validateCode,
                'accessToken' => $accessToken
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] != 200) {
            throw new \Exception($this->errorMsg($res['code']));
        }
    }


    public function delVideo($accessToken, $deviceSerial)
    {
        $response = $this->http->post($this->api_address['delVideo'], [
            'form_params' => [
                'accessToken' => $accessToken,
                'deviceSerial' => $deviceSerial
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] != 200) {
            throw new \Exception($this->errorMsg($res['code']));
        }
    }


    public function info($accessToken, $deviceSerial)
    {
        $response = $this->http->post($this->api_address['info'], [
            'form_params' => [
                'accessToken' => $accessToken,
                'deviceSerial' => $deviceSerial
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] != 200) {
            throw new \Exception($this->errorMsg($res['code']));
        }

        return $res['data'];
    }


    public function liveAddress($accessToken, $deviceSerial)
    {
        $channel = $this->channel($accessToken, $deviceSerial);
        $source = $deviceSerial . ':'.$channel;

        $response = $this->http->post($this->api_address['liveAddress'], [
            'form_params' => [
                'accessToken' => $accessToken,
                'source' => $source
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] != 200) {
            throw new \Exception($this->errorMsg($res['code']));
        }

        return count($res['data']) == 1 ? $res['data'][0] : $res['data'];
    }


    private function channel($accessToken, $deviceSerial)
    {
        $response = $this->http->post($this->api_address['channel'], [
            'form_params' => [
                'accessToken' => $accessToken,
                'deviceSerial' => $deviceSerial
            ]
        ]);

        $res = json_decode((string) $response->getBody(), true);

        if ($res['code'] != 200) {
            throw new \Exception($this->errorMsg($res['code']));
        }

        return count($res['data']) == 1 ? $res['data'][0]['channelNo'] : $res['data'];
    }


    /**
     * 检测access_token是否过期
     * @return bool 过期 == false | string access_token
     */
    public function checkAccessTokenExpireTime()
    {
        $yun_terrace = YunTerrace::find(1);

        return $yun_terrace->expire_time > time() ? true : $yun_terrace->access_token;
    }


    /**
     * 存储access_token
     * @param $access_token
     * @param $expire_time
     */
    private function storeAccessToken($access_token, $expire_time)
    {
        $yun_terrace = YunTerrace::first();

        if (empty($yun_terrace)) {
            try {
                YunTerrace::create([
                    'access_token' => $access_token,
                    'expire_time'  => $expire_time
                ]);
            } catch (\Exception $e) {
                throw new Exception(trans('system.error'));
            }
        } else {
            $yun_terrace->access_token = $access_token;
            $yun_terrace->expire_time = $expire_time;
            $yun_terrace->save();
        }
    }


    /**
     * 通过错误码获取错误信息
     * @param $code
     * @return string
     */
    private function errorMsg($code)
    {
        $msg = $this->error_code[$code];
        return empty($msg) ? trans('system.system_error') : $msg;
    }


}