<?php
namespace App\Http\Proxy;

use GuzzleHttp\Client;
use Illuminate\Http\Response;

class TokenProxy
{
    private $http;

    /**
     * TokenProxy constructor.
     * @param $http
     */
    public function __construct(Client $http)
    {
        $this->http = $http;
    }


    public function login($username, $password)
    {
        return $this->proxy('password', [
            'username' => $username,
            'password' => $password,
            'scope' => ''
        ]);
    }


    public function logout()
    {
        $user = auth()->guard('api')->user();

        $accessToken = $user->token();

        app('db')->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)->update(['revoked' => true]);

        app('cookie')->forget('refreshToken');

        $accessToken->revoke();

        return response()->json(['status' => 1, 'msg' => trans('system.logout')]);
    }


    public function refresh()
    {
        $refreshToken = request()->cookie('refreshToken');

        return $this->proxy('refresh_token', [
            'refresh_token' => $refreshToken
        ]);
    }


    /**
     * @param $grantType
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    private function proxy($grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => '2',
            'client_secret' => 'uVRP3h6qMH544O5eYhIbBMsksE8xUp68beO6rZgq',
            'grant_type' => $grantType,
        ]);

        $response = $this->http->post('http://120.78.56.75/oauth/token', ['form_params' => $data]);

        $token = json_decode((string) $response->getBody(), true);
        dd($token);
        return response()->json([
            'token' => $token['access_token'],
            'expires_in' => $token['expires_in'],
        ])->cookie('refreshToken', $token['refresh_token'], 14400, null, null, false, true);
    }
}