<?php
namespace App\Http\Controllers\Api\Auth;

use App\Libraries\WechatTool;
use App\Model\User;
use App\Libraries\SMS;
use Illuminate\Http\Request;
use App\Model\Current\Worker;
use App\Model\Current\Farmer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\FarmerStorePost;
use App\Http\Controllers\Wechat\BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegisterController extends BaseController
{
    /*
    |--------------------------------------------------------------------------
    | 用户注册控制器
    |--------------------------------------------------------------------------
    */

    public function showRegisterForm()
    {
        return view('wechat.auth.register');
    }


    /**
     * 注册用户
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function register(Request $request)
    {
        try {
            $this->validator($request->all());
        } catch (\Exception $e) {
            return $this->unregistered($e->getMessage());
        }

        $user = $this->create($request->all());

        return $this->registered();
    }


    /**
     * 注册管理员
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function registerAdmin(Request $request)
    {
        try {
            $this->validator($request->all());
        } catch (\Exception $e) {
            return $this->unregistered($e->getMessage());
        }

        $user = $this->createAdmin($request->all());

        return $this->registered();
    }

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


    private function validator(array $data)
    {
        $validator = Validator::make($data, [
            'username' => 'required|string|max:255',
            'password' => 'required|string|min:6',
//            'captcha'  => 'required|captcha'
        ]);

        if ($validator->fails()) {  //用户提交字段验证失败
            throw new \Exception($validator->errors()->first());
        } else {
            //判断用户名是否已存在
            $this->userIsExists($data['username']);
        }
    }


    /**
     * 判断用户是否已经注册
     * @param $username
     * @throws \Exception
     */
    private function userIsExists($username)
    {
        if (User::where('username', $username)->first()) {
            throw new \Exception(trans('system.username_is_exists'));
        }
    }


    /**
     * 创建用户
     * @param array $data
     * @return App\Model\User
     */
    private function create(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
        ]);
    }


    /**
     * 创建管理员
     * @param array $data
     * @return App\Model\User
     */
    private function createAdmin(array $data)
    {
        return User::create([
            'username' => $data['username'],
            'password' => bcrypt($data['password']),
            'is_admin' => 1,
        ]);
    }


    /**
     * 注册成功,返回信息
     *
     * @return mixed
     */
    protected function registered()
    {
        return response()->json(['msg' => trans('system.register_success')]);
    }


    /**
     * 注册失败，返回信息
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function unregistered($message)
    {
        return response()->json(['msg' => $message], 422);
    }
}