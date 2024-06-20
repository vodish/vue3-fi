<?php
class item
{
    static function getAll()
    {
        if (req::$path != '/item/getAll')    return;

        $list = db::select("SELECT *  FROM `item`  ORDER BY `id`");

        res::json($list);
    }


    static function save()
    {
        if (req::$path != '/item/save')    return;


        ui::vd(req::$path);
    }
}
