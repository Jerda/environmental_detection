<?php

namespace App\Libraries;

use Illuminate\Support\Facades\Validator;

class Log
{
    /*
    |--------------------------------------------------------------------------
    | 日志
    |--------------------------------------------------------------------------
    */

    protected $model;

    private $status = 1;

    /**
     * Log constructor.
     * @param $model
     */
    public function __construct($model)
    {
        $this->model = $model;
    }


    public function add($msg, $user_id, $client)
    {
        $this->model->create([
            'msg' => $msg,
            'user_id' => $user_id,
            'client' => $client,
            'status' => $this->status
        ]);
    }


    /**
     * 设置错误日志
     * @return $this
     */
    public function error()
    {
        $this->status = 0;

        return $this;
    }


    /**
     * 设置成功日志
     * @return $this
     */
    public function success()
    {
        $this->status = 1;

        return $this;
    }
}