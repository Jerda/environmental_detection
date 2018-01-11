<?php
namespace App\Http\Controllers\Wechat\Auth;

use App\Libraries\SMS;
use App\Model\Current\Farmer;
use App\Model\User;
use Illuminate\Http\Request;
use App\Model\Current\Worker;
use App\Http\Requests\FarmerStorePost;
use App\Http\Controllers\Wechat\BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RegisterController extends BaseController
{
    /**
     * 养户注册申请
     * @param FarmerStorePost $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerFarmer(FarmerStorePost $request)
    {
        $data = $request->all();

        /*try {
            $this->validateMobileCode($data);
        } catch (\Exception $e) {
            return response()->json(['msg' => $e->getMessage()], 422);
        }*/

        try {
            DB::transaction(function () use ($data) {
                User::where('id', Auth::user()->id)->update([
                    'name' => $data['name'],
                    'mobile' => $data['mobile'],
                    'idcard' => $data['idcard'],
                    'QQ' => $data['QQ'],
                    'is_farmer' => 1,
                ]);

                Farmer::create([
                    'user_id' => Auth::user()->id,
                    'code' => $data['code'],
                    'organization' => $data['organization'],
                    'worker_id' => $data['worker_id'],
                    //todo address
                ]);
            });
        } catch (\Exception $e) {
            return response()->json(['msg' => trans('system.error')], 500);
        }

        return response()->json(['msg' => trans('system.register_and_wait_examine')]);
    }


    /**
     * 员工注册申请
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function registerWorker(Request $request)
    {
        $data = $request->all();

        try {
            $this->validateMobileCode($data);
        } catch (\Exception $e) {
            return response()->json(['msg' => $e->getMessage()], 422);
        }

        try {
            Worker::create($data);
        } catch (\Exception $e) {
            return response()->json(['msg' => trans('system.error')], 500);
        }

        return response()->json(['msg' => trans('system.register_and_wait_examine')]);
    }


    /**
     * 验证短信码
     * @param $data
     * @throws \Exception
     */
    private function validateMobileCode(&$data)
    {
        $sms = new SMS();

        if (empty($data['code'])) {
            throw new \Exception(trans('system.mobile_code_required'));
        }

        if (!$sms->checkValidate($data['mobile'], $data['code'])) {
            throw new \Exception(trans('system.mobile_code_error'));
        }

        unset($data['code']);
    }
}