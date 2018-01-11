<?php

namespace App\Http\Controllers\Admin\Current;

use Illuminate\Http\Request;
use App\Model\Current\Video;
use Facades\App\Libraries\YSYun;

class VideoController extends YunController
{
    /**
     * 修改监控状态
     * @return \Illuminate\Http\JsonResponse
     */
    public function status()
    {
        $data = request()->all();

        Video::where('id', $data['video_id'])->update(['status' => $data['status']]);

        $data['status'] != 3 ? :$this->reject($data);

        return response()->json(['msg' => trans('system.operate_success')]);
    }


    /**
     * 获取所有摄像头信息
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAll()
    {
        $videos = Video::where($this->formatWhere(['video__name']))->with(['region' => function ($query) {
            $query->with('factory');
        }])->with(['farmer' => function ($query) {
            $query->with('user');
        }])->whereHas('region', function ($query) {
            $query->where($this->formatWhere(['region__name']));
        })->whereHas('region.factory', function ($query) {
            $query->where($this->formatWhere(['factory__name']));
        })->whereHas('farmer.user', function ($query) {
            $query->where($this->formatWhere(['user__name']));
        })->paginate(request()->input('limit'));

        return response()->json(['data' => $videos]);
    }


    /**
     * 添加摄像头
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $data = $request->only(['deviceSerial', 'validateCode']);

        try {
            YSYun::addVideo($this->getAccessToken(), $data['deviceSerial'], $data['validateCode']);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        return response()->json(['status' => 1, 'msg' => trans('system.add_success')]);
    }


    /**
     * 删除摄像头
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function del(Request $request)
    {
        $id = $request->input('id');

        $video = Video::find($id);

        try {
            YSYun::delVideo(YSYun::accessToken(), $video->deviceSerial);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        try {
            Video::destroy($id);
        } catch (\Exception $e) {
            return $this->sendSystemErrorResponse();
        }

        return response()->json(['status' => 1, 'msg' => trans('system.del_success')]);
    }


    /**
     * 获取监控设备信息
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getInfo(Request $request)
    {
        $id = $request->input('id');

        $video = Video::find($id);

        try {
            $info = YSYun::info(YSYun::accessToken(), $video->deviceSerial);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        return response()->json(['status' => 1, 'data' => $info]);
    }


    /**
     * 获取监控通道号
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    /*public function getChannel(Request $request)
    {
        $id = $request->input('id');

        $video = Video::find($id);

        try {
            $channel = YSYun::channel($this->getAccessToken(), $video->deviceSerial);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        return response()->json(['status' => 1, 'data' => $channel]);
    }*/


    /**
     * 获取监控直播地址
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLiveAddress(Request $request)
    {
        $id = $request->input('id');

        $video = Video::find($id);

        try {
            $live = YSYun::liveAddress(YSYun::accesstoken(), $video['deviceSerial']);
        } catch (\Exception $e) {
            return response()->json(['status' => 0, 'msg' => $e->getMessage()]);
        }

        return response()->json(['status' => 1, 'data' => $live]);
    }
}