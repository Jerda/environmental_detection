<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\RouterController;

class BaseController extends RouterController
{

    /**
     * BaseController constructor.
     */
    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 获取farmerId，如果是附属管理员，返回他的主账号farmerId
     * @return mixed
     */
    public function farmerId()
    {
        return empty(Auth::user()->farmer()->master) ?
            Auth::user()->farmer()->id: Auth::user()->farmer()->master;
    }


    /**
     * 获取级别
     * @param $model
     * @param $parent_id
     * @return int
     */
    protected function getLevel(Model $model, $parent_id)
    {
        $level = 0;

        if ($parent_id != 0) {
            $parent = $model::find($parent_id);

            $level = $parent->level + 1;
        }

        return $level;
    }


    /**
     * 权限无限级排序
     * 将子权限分装在对应的父权限数组中
     *
     * @param $data array     权限数据
     * @param $pid  integer   父权限ID，该参数一般不填，主要在递归时用。
     * @return array
     */
    protected function treeSort($data, $pid = 0)
    {
        static $arr = [];

        foreach ($data as $value) {

            if ($pid != 0) {

                $value['name'] = $this->treeSign($value['level']) . $value['name'];
            }

            if ($value['parent_id'] == $pid) {
                $arr[] = $value;

                $this->treeSort($data, $value['id']);
            }
        }

        return $arr;
    }


    /**
     * 添加权限等级展示前的标识符
     * 通过$level*$num值来确定前面添加多少‘空格’
     * 演示: |-----xxxxx (level == 0  不添加)
     *              |------yyyyyy （level == 1 添加1*6个空格）
     *
     * @param $level integer 等级
     * @param $num   integer 标识符前面空格倍数，默认为6可以获得较好的效果
     * @return string
     */
    protected function treeSign($level, $num = 6)
    {
        $str = '';

        if ($level != 0) {
            $str = str_repeat('&nbsp;', $level * $num);
        } else {
            return '';
        }

        if ($level > 1) {
            $str .= str_repeat('&nbsp;', $num);
        }

        return $str.'|----';
    }


    /**
     * 上传图片
     * @param Request $request
     * @return false|string
     */
    public function uploadImage(Request $request)
    {
        $path = $request->file('file')->store('public');

        $res = explode('/', $path);

        $image_name = array_pop($res);

        $path = [
            'url' => $request->root().'/storage/'.$image_name,
            'local' => '/storage/'.$image_name
        ];

        return response()->json(['data' => $path]);
    }


    /**
     * 格式化查询条件
     * @param array $field 指定要查询的字段key
     * $field 中需要查询的不同表中的相同名字段，用'__'组合字段
     * 例如查询A表中的'name'，和B表中的'name'，写成A__name、B__name
     * @return array
     */
    public function formatWhere(array $field = [])
    {
        $where = [];

        $search_data = request()->input('search');

        if (empty($search_data)) {
            return $where;
        }

        foreach ($search_data as $key => $value) {

            if ($value == null || (!empty($field) && !in_array($key, $field))) {
                continue;
            }

            if (preg_match('/.*__.*/', $key)) {
                $res = explode('__', $key);

                if (count($res) == 1) {
                    $where[] = [$res[0], 'like', '%' . $value . '%'];
                } else {
                    $where[] = [$res[1], 'like', '%' . $value . '%'];
                }
            } else {
                $where[] = [$key, 'like', '%' . $value . '%'];
            }

        }

        return $where;
    }


    /**
     * 驳回申请
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function reject(array $data)
    {
        Examine::create([
            'type' => $data['type'],
            'content' => $data['content'],
            'user_id' => $data['user_id'],
            'admin_id' => $this->currentUserId()
        ]);
    }
}