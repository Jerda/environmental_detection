<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Proxy\TokenProxy;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Admin\BaseController;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    private $guard = 'wechat';


    public function showLoginForm()
    {
        return view('wechat.auth.login');
    }


    public function login(Request $request, TokenProxy $tokenProxy)
    {
        try {
            $this->validateLogin($request->all());
        } catch (\Exception $e) {
            return $this->sendFailedLoginResponse($e->getMessage());
        }
        //暂时不使用
        /*if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }*/

        return $tokenProxy->login($request->input('username'), $request->input('password'));
    }


    public function logout(TokenProxy $tokenProxy)
    {
        return $tokenProxy->logout();
    }


    public function refreshToken(TokenProxy $tokenProxy)
    {
        return $tokenProxy->refresh();
    }


    /*protected function guard()
    {
        return Auth::guard($this->guard);
    }*/


    /*public function username()
    {
        return 'username';
    }*/


    protected function validateLogin($data)
    {
        $validator = Validator::make($data, [
            'username' => 'required|string|max:255|min:5',
            'password' => 'required|string|min:6',
//            'captcha'  => 'required|captcha'
        ]);

        if ($validator->fails()) {
            throw new \Exception($validator->errors()->first());
        } else {
            return true;
        }
    }


    protected function sendFailedLoginResponse($message)
    {
        return response()->json(['msg' => $message], 422);
    }


    protected function sendLockoutResponse(Request $request)
    {
        $seconds = $this->limiter()->availableIn(
            $this->throttleKey($request)
        );

        return response()->json(['status' => 0, 'msg' => [$this->username() => [Lang::get('auth.throttle', ['seconds' => $seconds])]]]);
    }


    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        $this->guard()->user();

        return response()->json(['status' => 1, 'msg' => trans('system.login_success')]);
    }
}
