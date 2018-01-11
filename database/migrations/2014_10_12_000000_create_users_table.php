<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username')->unique()->nullable()->comment('用户名');
            $table->string('email')->unique()->nullable()->comment('邮箱');
            $table->string('mobile')->unique()->nullable()->comment('手机号');
            $table->string('password')->nullable();
            $table->tinyInteger('status')->default(0)->comment('状态');
            $table->string('name')->nullable()->comment('姓名');
            $table->string('sex')->nullable()->comment('性别');

            /*--可选字段--*/
            $table->string('user_num')->nullable()->comment('会员编号');
            $table->tinyInteger('type')->default(0)->comment('用户类型');
            $table->string('idcard')->nullable()->comment('身份证号码');
            $table->text('idcard_img')->nullable()->comment('身份证照片');
            $table->string('QQ')->nullable()->comment('QQ号');
            $table->string('remark')->nullable()->comment('备注');
            /*-----------*/

            /*-- 特殊关联字段 --*/
            $table->tinyInteger('isFarmer')->nullable()->comment('是否是养户');
            $table->tinyInteger('isWorker')->nullable()->comment('是否是员工');
            $table->tinyInteger('is_admin')->nullable()->comment('是否是管理员');
            /*----------------*/
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
