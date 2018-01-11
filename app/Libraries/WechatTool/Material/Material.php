<?php

namespace App\Libraries\WechatTool\Material;

trait Material
{
    /**
     * @param int $offset 从全部素材的该偏移位置开始返回，可选，默认 0，0 表示从第一个素材 返回
     * @param int $count 返回素材的数量，可选，默认 20, 取值在 1 到 20 之间
     */
    public function news($offset = 0, $count = 20)
    {
        return $this->app->material->list('news', $offset, $count);
    }
}