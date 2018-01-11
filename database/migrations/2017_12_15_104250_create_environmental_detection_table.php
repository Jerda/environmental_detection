<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEnvironmentalDetectionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * 养户表
         */
        Schema::create('farmer', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
            $table->string('code')->nullable()->commnet('养户编号');
            $table->string('organization')->nullable()->commnet('所属机构');
            $table->string('address')->nullable()->commnet('详情地址');
            $table->string('worker_id')->nullable()->commnet('负责人');
            $table->tinyInteger('is_admin')->default(0)->commnet('是否为管理员');
            $table->tinyInteger('is_add')->default(0)->commnet('是否有添加权限');
            $table->tinyInteger('master')->default(0)->commnet('主养户ID');
            $table->timestamps();
        });

        /**
         * 圈舍表
         */
        Schema::create('factory', function (Blueprint $table) {
            $table->increments('id');
            $table->string('farmer_id')->nullable();
            $table->string('name')->nullable()->commnet('圈舍名称');
            $table->string('address')->nullable()->comment('地址');
            $table->string('province')->nullable()->comment('省份');
            $table->string('city')->nullable()->comment('城市');
            $table->string('district')->nullable()->comment('县');
            $table->string('longitude')->nullable()->comment('经度');
            $table->string('latitude')->nullable()->comment('纬度');
            $table->text('remark')->nullable()->commnet('备注');
            $table->tinyInteger('status')->nullable()->commnet('状态');
            $table->tinyInteger('factory_status')->nullable()->commnet('圈舍状态');
            $table->tinyInteger('type')->nullable()->commnet('类型');
            $table->tinyInteger('farm_mode')->nullable()->comment('模式（限位栏、散养）');
            $table->tinyInteger('sealing')->nullable()->comment('密封性');
            $table->float('area')->nullable()->comment('面积');
            $table->integer('animal_num')->nullable()->comment('畜生数');
            $table->float('length')->nullable()->comment('圈舍长');
            $table->float('width')->nullable()->comment('圈舍宽');
            $table->tinyInteger('fan_num')->nullable()->comment('风机数量');
            $table->tinyInteger('cooling_pad_num')->nullable()->comment('湿帘数量');
            $table->tinyInteger('sewage')->nullable()->comment('排污');
            $table->tinyInteger('fan_mode')->nullable()->comment('通风方式');
            $table->timestamps();
        });


        /**
         * 区域表
         */
        Schema::create('region', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->comment('名称');
            $table->integer('factory_id')->nullable();
            $table->text('remark')->nullable()->comment('备注');
            $table->timestamps();
        });

        /**
         * 摄像头表
         */
        Schema::create('video', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->comment('设备名称');
            $table->string('brand_id')->nullable()->comment('设备品牌ID');
            $table->integer('region_id')->nullable();
            $table->string('QRCode')->nullable()->comment('摄像头二维码');
            $table->string('validateCode')->nullable()->comment('摄像头验证码');
            $table->tinyInteger('status')->nullable()->comment('使用状态');
            $table->text('remark')->nullable()->comment('备注');
            $table->string('rtmpHd')->nullable()->comment('RTMP高清');
            $table->string('rtmp')->nullable()->comment('RTMP标清');
            $table->string('liveAddress')->nullable()->comment('HLS高清');
            $table->string('hdAddress')->nullable()->comment('HLS标清');
            $table->string('deviceSerial')->nullable()->comment('设备序列号');
            $table->string('channelNo')->nullable()->comment('通道号');
            $table->string('exception')->nullable()->comment('异常状态');
            $table->timestamps();
        });


        /**
         * 监控品牌表
         */
        Schema::create('brand', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('品牌名称');
            $table->string('type')->comment('设备类型');
        });

        /**
         * 环境监控设备表
         */
        Schema::create('environment', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('region_id')->comment('区域ID');
            $table->tinyInteger('farmer_id')->comment('申请人');
            $table->string('illumination_id')->commont('湿度设备id');
            $table->string('temperature_id')->commont('温度设备id');
            $table->string('humidity_id')->commont('光照度设备id');
            $table->string('CO2_id')->commont('二氧化碳设备id');
            $table->string('NH3_id')->commont('氨气设备id');
            $table->tinyInteger('status')->comment('状态');
            $table->timestamps();
        });

        /**
         * 环境数据表
         */
        /*Schema::create('environment_data', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('equipment_id')->nullable();
            $table->string('temperature')->nullable()->comment('温度');
            $table->string('humidity')->nullable()->comment('湿度');
            $table->string('illumination')->nullable()->comment('光照度');
            $table->string('NH3')->nullable()->comment('氨气');
            $table->string('CO2')->nullable()->comment('二氧化碳');
            $table->timestamps();
        });*/

        /**
         * 设备工作历史记录表
         */
        /*Schema::create('equipment_history', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('equipment_id')->nullable();
            $table->text('remark')->nullable()->comment('备注');
            $table->tinyInteger('code')->nullable()->comment('错误码');
            $table->timestamps();
        });*/

        /**
         * 员工表
         */
        Schema::create('worker', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable();
//            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('level')->nullable()->comment('级别');
            $table->timestamps();
        });

        /**
         * 员工_养户中间表
         */
        Schema::create('worker_farmer', function(Blueprint $table) {
            $table->integer('worker_id')->nullable();
            $table->integer('farmer_id')->nullable();
        });

        /**
         * 云平台表
         */
        Schema::create('yun_terrace', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->comment('平台名称');
            $table->string('app_key')->nullable();
            $table->string('secret')->nullable();
            $table->string('access_token')->nullable();
            $table->string('expire_Time')->nullable();
            $table->timestamps();
        });

        /**
         * 驳回表
         */
        Schema::create('reject', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('user_id');
            $table->string('type')->comment('申请类型');
            $table->string('title')->nullable()->comment('标题');
            $table->text('content')->comment('内容');
            $table->text('admin_id')->comment('操作人ID');
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
        Schema::dropIfExists('farmer');
        Schema::dropIfExists('factory');
        Schema::dropIfExists('region');
        Schema::dropIfExists('video');
        Schema::dropIfExists('environment');
        Schema::dropIfExists('environment_data');
//        Schema::dropIfExists('equipment_history');
        Schema::dropIfExists('worker');
        Schema::dropIfExists('worker_farmer');
        Schema::dropIfExists('yun_terrace');
        Schema::dropIfExists('examine');
    }
}
