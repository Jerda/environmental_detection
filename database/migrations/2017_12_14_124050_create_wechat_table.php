<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWechatTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        /**
         * wechat账号
         */
        Schema::create('wechat_account', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable()->comment('公众号名称');
            $table->string('wechat_id')->nullable()->comment('微信号');
            $table->string('init_wechat_id')->nullable()->comment('微信号原始ID');
            $table->string('app_id')->default()->comment('AppID');
            $table->string('app_secret')->default('')->comment('应用密匙');
            $table->string('api')->nullable()->comment('API地址');
            $table->string('token')->default('')->comment('TOKEN');
            $table->string('encoding_aes_key')->nullable()->comment('消息加解密密钥');
            $table->string('auth_file')->nullable()->comment('授权文件');
            $table->string('qr_code')->nullable()->comment('二维码');
            $table->string('attention')->nullable()->comment('关注连接');
            $table->timestamps();
        });

        /**
         * wechat按钮
         */
        Schema::create('wechat_menu', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('菜单名');
            $table->tinyInteger('parent_id')->comment('父菜单ID');
            $table->string('key')->nullable()->comment('微信KEY');
            $table->string('url')->nullable()->comment('URL');
            $table->string('key_word')->nullable()->comment('关键字');
            $table->string('type')->comment('类型');
            $table->string('sort_id')->comment('排序号');
            $table->timestamps();
        });

        /**
         * wechat用户
         */
        Schema::create('wechat_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();

            /*----微信----*/
            $table->string('openid')->nullable()->comment('微信OPENID');
            $table->string('nickname')->nullable()->commnet('昵称');
//            $table->json('wechat_info')->nullable()->comment('微信详情');
            $table->text('avatar')->nullable()->comment('头像');
            $table->string('qrcode')->nullable()->commment('个人二维码');
//            $table->string('wechat_username')->nullable()->comment('微信名');
            $table->tinyInteger('sex')->nullable()->comment('姓名');
            $table->string('country')->nullable()->comment('国家');
            $table->string('province')->nullable()->comment('省份');
            $table->string('city')->nullable()->comment('城市');
            $table->timestamp('subscribe_time')->nullable()->comment('用户关注公众号时间');
            $table->text('wechat_remark')->nullable()->comment('用户备注');
            $table->tinyInteger('groupid')->nullable()->comment('用户所在的分组ID');
            $table->string('tagid_list')->nullable()->comment('用户被打上的标签ID列表');
            /*-----------*/

            /*--项目特殊需求字段--*/
            /*------------------*/
            $table->foreign('user_id')->references('id')->on('users');
        });

        /**
         * wechat用户组
         */
        Schema::create('wechat_user_group', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('group_id')->comment('分组ID');
            $table->string('name')->comment('分组名称');
            $table->tinyInteger('count')->default(0)->comment('用户总数');
        });

        /**
         * wechat回复
         */
        Schema::create('wechat_callback', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->comment('消息类型');
            $table->string('key_word')->comment('关键字');
            $table->string('title')->comment('标题');
            $table->string('content')->comment('内容');
            $table->string('no_normal_content')->nullable()->comment('受限回复');
            $table->string('img')->nullable()->comment('图片');
            $table->string('link')->nullable()->comment('链接');
            $table->timestamps();
        });

        /**
         * wechat素材
         */
        Schema::create('wechat_material', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->comment('类型');
            $table->string('desc')->nullable()->comment('描述');
            $table->string('path')->nullable()->comment('路径');
            $table->string('media_id');
            $table->string('url')->nullable();
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
        Schema::dropIfExists('wechat_account');

        Schema::dropIfExists('wechat_menu');

        Schema::dropIfExists('user_wechat');

        Schema::dropIfExists('wechat_user_group');

        Schema::dropIfExists('wechat_callback');

        Schema::dropIfExists('wechat_material');
    }
}
