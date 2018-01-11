<?php

/*
 * This file is part of the overtrue/wechat.
 *
 * (c) overtrue <i@overtrue.me>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace EasyWeChat\Kernel\Exceptions;

use Exception as BaseException;

/**
 * Class Exception.
 *
 * @author overtrue <i@overtrue.me>
 */
class Exception extends BaseException
{
    public function errorMessage()
    {
        $code = '';

        $res = self::getMessage();

        if (gettype($res) == 'string') {

            preg_match("/\"errcode\":([0-9]+),/", $res, $arr);

            $code =  $arr[1];
        } else {
            $code =  self::getCode();
        }

        try {
            return trans('wechat.'.$code);
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }


}
