<?php
class item
{
    # ручки
    #
    static function getAll()
    {
        if (req::$path != '/item/getAll')    return;

        $list = self::dbGetAll();

        res::json($list);
    }


    static function save()
    {
        if (req::$path != '/item/save')    return;


        # добавить запись
        # обновить
        # удалить
        #
        if (req::$body['id'] === 'add') {
            self::dbInsert();
        } elseif (req::$body['id'] > 0) {
            $item = db::one("SELECT `id`  FROM `item`  WHERE `id` = :id",  ['id' => req::$body['id']]);

            if ($item && req::$body['action'] === 'update') {
                self::dbUpdate($item['id']);
            }
            if ($item && req::$body['action'] === 'delete') {
                self::dbDelete($item['id']);
            }
        }


        $list = self::dbGetAll();
        res::json($list);
    }





    # операции с бд
    #
    static function dbGetAll()
    {
        $list = db::select("
            SELECT
                *
            FROM
                `item`
            WHERE
                `deleted_at` IS NULL
            ORDER BY
                `id`
        ");
        return $list;
    }


    # добавить в бд запись
    #
    static function dbInsert()
    {
        $lastId = db::query("
            INSERT INTO `item` (
                  `name`
                , `descr`
                , `unit`
                , `price`
                , `target`
                , `image`
            )
            VALUES (
                  " . db::v(req::$body['name']) .  "
                , " . db::v(req::$body['descr']) .  "
                , " . db::v(req::$body['unit']) .  "
                , " . db::v(req::$body['price']) .  "
                , " . db::v(req::$body['target']) .  "
                , " . db::v(req::$body['image']) .  "
            )
        ");

        return $lastId;
    }


    # обновить в бд запись
    #
    static function dbUpdate($id)
    {
        db::query("
            UPDATE
                `item`
            SET
                  `name` = " . db::v(req::$body['name']) .  "
                , `descr` = " . db::v(req::$body['descr']) .  "
                , `unit` = " . db::v(req::$body['unit']) .  "
                , `price` = " . db::v(req::$body['price']) .  "
                , `target` = " . db::v(req::$body['target']) .  "
                , `image` = " . db::v(req::$body['image']) .  "
            WHERE
                `id` = " . db::v($id) .  "
        ");

        return $id;
    }


    # удалить из бд запись
    #
    static function dbDelete($id)
    {
        db::query("
            UPDATE
                `item`
            SET
                  `deleted_at` = NOW()
            WHERE
                `id` = " . db::v($id) .  "
        ");

        return $id;
    }
}
