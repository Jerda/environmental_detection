<?php
namespace App\Http\Controllers\Wechat\User;

use App\Model\User;
use Illuminate\Http\Request;
use App\Model\Current\Farmer;
use App\Model\Current\Examine;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Wechat\BaseController;

class UserController extends BaseController
{
    /**
     * 用户个人中心首页(U-1)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $user = User::where('id', Auth::user()->id)->with('wechat')->first();

        return view('wechat.user.index', compact('user'));
    }


    /**
     * 查看为通过原因
     */
    public function showNoPassCause()
    {
        $examine = Examine::where('user_id', $this->user_id)->orderBy('created_at', 'desc')->first();

        return view();
    }


    /**
     * 等待审批页面
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showWaitExamine()
    {
        return view();
    }
    
    
    /**
     * 用户信息(U-2)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function info()
    {
        $user = User::where('id', 4)->with(['farmer' => function($query) {
            $query->with(['worker' => function($query) {
                $query->with('user');
            }]);
        }])->first();

        return $user->isFarmer == 1 ? view('wechat.user.farmer_info', compact('user'))
            : view('wechat.user.worker_info', compact('user'));
    }



    public function modify(Request $request)
    {
        $data = $request->all();

        dd($data);
        User::where('id', $data['user_id'])->update($data);

        return response()->json(['msg' => trans('system.modify_success')]);
    }


    /**
     * 管理组页面(U-3)
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function governor()
    {
        $farmers = Farmer::where('master', Auth::user()->id)->with('user')->get();

        return view('wechat.governor.index', compact('farmers'));
    }


    /**
     * 附属管理员申请列表
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function applyGovernorList()
    {
        $farmers = Farmer::where('master', Auth::user()->id)
            ->with('user')->whereHas('user', function($query) {
                $query->where('status', 2);
            })->get();

        return view('wechat.governor.apply_list', compact('farmers'));
    }


    /**
     * 申请者列表(U-5)
     * @param $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function applyList(Request $request)
    {
        $user_id = $request->input('user_id');

        $user = User::where('id', $user_id)->first();
        //TODO 新申请
        return view('wechat.governor.apply_info', compact('user'));
    }


    /**
     * 申请者列表(U-4)
     * @param $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function applyInfo(Request $request)
    {
        $user = User::find($request->user_id);

        return view('wechat.governor.apply_info', compact('user'));
    }


    /**
     * 获取员工
     * @return \Illuminate\Http\JsonResponse
     */
    public function workers()
    {
        $workers = User::workers()->get();

        return response()->json(['data' => $workers]);
    }


    /**
     * 驳回附属管理者请求
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function reject(Request $request)
    {
        $data = $request->all();

        Examine::create([
            'user_id' => $data['user_id'],
            'type' => $data['type'],
            'content' => $data['content'],
            'admin_id' => Auth::user()->id,
        ]);

        return response()->json(['msg' => trans('system.operate_success')]);
    }


    /**
     * 员工删除
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $user_id = $request->input('user_id');
        //todo
        User::destroy($user_id);

        return response()->json(['msg' => trans('system.operate_success')]);
    }


    /**
     * 附属管理者通过
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function pass(Request $request)
    {
        $user_id = $request->input('user_id');

        User::where('id', $user_id)->update(['status' => 1, 'isFarmer' => 1]);

        return response()->json(['msg' => trans('system.operate_success')]);
    }


    /**
     * 附属管理者申请驳回
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function noPass(Request $request)
    {
        $data = $request->only('content', 'user_id');

        DB::transaction(function() use ($data) {
            Examine::create([
                'user_id' => $data['user_id'],
                'type' => '附属管理者申请',
                'content' => $data['content'],
                'admin_id' => Auth::user()->id
            ]);

            User::where('id', $data['user_id'])->update(['status' => 3]);
        });

        return response()->json(['msg' => trans('system.operate_success')]);
    }

}