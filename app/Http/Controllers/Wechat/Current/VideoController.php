<?php

namespace App\Http\Controllers\Wechat\Current;

use App\Model\Current\Video;
use Illuminate\Http\Request;
use Facades\App\Libraries\YSYun;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\VideoStorePost;
use App\Http\Controllers\Wechat\BaseController;

class VideoController extends BaseController
{
    /**
     * 视频中心首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        return view('wechat.video.index');
    }


    /**
     * 添加摄像头页面(U-12)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showAdd()
    {
        return view('wechat.video.add');
    }


    /**
     * 获取直播地址
     * @param Request $request
     * @return array hls、hlsHd、rtmp、rtmpHd
     */
    public function liveAddress(Request $request)
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


    /**
     * 获取视频信息，主要用于获取视频区名称
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function videoInfo(Request $request)
    {
        $id = $request->input('id');

        $video = Video::find($id);

        return response()->json(['data', $video]);
    }


    /**
     * 根据区域获取视频，如果只需要某些字段，可以通过传入field来指定
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function listByRegion(Request $request)
    {
        $region_id = $request->input('region_id');

        $field = $request->input('field');

        $field = empty($field) ? ['*'] : $field;

        $videos = Video::where('region_id', $region_id)->get($field);

        return response()->json(['data' => $videos]);
    }


    /**
     * 通过当前用户区域获取
     * @param $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getVideosByFRegionId(Request $request)
    {
        $region_id = $request->input('region_id');

        $videos = Video::where('region_id', $region_id)->get();

        return response()->json(['data' => $videos]);
    }


    /**
     * 添加监控
     * @param VideoStorePost $request
     * @param User $user
     * @param Video $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(VideoStorePost $request, User $user, Video $video)
    {
        $data = $request->only(['name', 'deviceSerial', 'validateCode']);

        if ($user->can('create', $video)) {
            try {
                Video::create([
                    'farmer_id'    => Auth::user()->farmer->id,
                    'name' => $data['name'],
                    'deviceSerial' => $data['deviceSerial'],
                    'validateCode' => $data['validateCode'],
                    'region_id'    => $data['region_id'],
                    'status'       => 2
                ]);
            } catch (\Exception $e) {
                return $this->sendSystemErrorResponse();
            }
        } else {
            return $this->sendSystemNoAuthResponse();
        }

        return response()->json(['msg' => trans('system.add_success')]);
    }


    /**
     * 删除监控
     * @param Request $request
     * @param User $user
     * @param Video $video
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request, User $user, Video $video)
    {
        $id = $request->input('id');

        if ($user->can('delete', $video)) {
            try {
                Video::destroy($id);
            } catch (\Exception $e) {
                return $this->sendSystemErrorResponse();
            }

            return response()->json(['msg' => trans('system.modify_success')]);
        } else {
            return $this->sendSystemNoAuthResponse();
        }
    }
}