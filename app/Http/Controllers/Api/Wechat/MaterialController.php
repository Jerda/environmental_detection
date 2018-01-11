<?php
namespace App\Http\Controllers\Api\Wechat;

use Illuminate\Http\Request;
use App\Model\Admin\Wechat\Material;
use Facades\App\Libraries\WechatTool;
use EasyWeChat\Kernel\Exceptions\Exception;

class MaterialController extends WeChatController
{
    public function index()
    {
        return view('admin.wechat.material.index');
    }


    public function news()
    {
        return WechatTool::news();
    }


    /**
     * 添加图片
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function AddImage(Request $request)
    {
        $data = $request->only('desc', 'path');

        $res = explode('/', $data['path']);

        $image_name = array_pop($res);

        try {
            $res = WechatTool::uploadImage(storage_path() . '/app/public/' . $image_name);
        } catch (Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->errorMessage()]);
        }

        try {
            Material::create([
                'desc'     => $data['desc'],
                'path'     => $data['path'],
                'media_id' => $res['media_id'],
                'type'     => 'image'
//            'url' => $res['url']
            ]);
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['msg' => trans('system.add_success')]);
    }
}