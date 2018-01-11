<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('log', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('status')->default(0)->comment('日志类型 错误|正常');
            $table->string('msg')->default('')->comment('日志描述');
            $table->tinyInteger('user_id')->default(0)->comment('操作人ID');
            $table->string('client')->default('')->comment('操作端（后台/微信..）');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('log');
    }
}
