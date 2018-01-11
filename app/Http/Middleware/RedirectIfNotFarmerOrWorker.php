<?php

namespace App\Http\Middleware;

use Closure;
use Facades\App\Libraries\AuthFarmerOrWorker;
use Illuminate\Support\Facades\Auth;

class RedirectIfNotFarmerOrWorker
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (($response = AuthFarmerOrWorker::isWechatLogin()) !== true) {

            return $response;
        }

        if (!AuthFarmerOrWorker::check()) {
            return redirect('/wechat/auth/index');
        }

        return $next($request);
    }
}
