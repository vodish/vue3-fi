<?php
class product
{
    # ручки
    #
    static function getAll()
    {
        if (req::$path != '/product/getAll')    return;

        $list = self::dbGetAll();

        res::json($list);
    }



    static function insert()
    {
        if (req::$path != '/product/insert')    return;
        if (empty(req::$body))                  return;

        # добавить запись
        # вернуть данные
        self::dbInsert(req::$body);
        $list = self::dbGetAll();

        res::json($list);
    }

    static function update()
    {
        if (req::$path != '/product/update')    return;
        if (empty(req::$body))                  return;

        $row    =   self::dbGetById(req::$body['id']);
        if (empty($row))                      return;

        # обновить запись
        # вернуть данные
        self::dbUpdate(req::$body);
        $list = self::dbGetAll();

        res::json($list);
    }

    static function delete()
    {
        if (req::$path != '/product/delete')    return;
        if (empty(req::$body['id']))            return;

        $row    =   self::dbGetById(req::$body['id']);
        if (empty($row))                      return;

        # удалить запись
        # вернуть данные
        self::dbDelete(req::$body['id']);
        $list = self::dbGetAll();

        res::json($list);
    }







    # операции с бд
    #
    private static function dbGetAll()
    {
        $list = db::select("
            SELECT
                *
            FROM
                `product`
            WHERE
                `deletedAt` IS NULL
            ORDER BY
                `id`
        ");

        $example = [
            'id'        => 2,
            'name'      => 'Изделие-2',
            'descr'     => 'Изделие-2',
            'image'     => '',
            'trashAt'   => null,
            'top'       => [],
            'mid'       => [],
            'bot'       => [],
            'prices'    => [],
        ];

        return [$example];

        ui::vd($list);

        return $list;
    }

    private static function dbGetById($id)
    {
        return db::one("SELECT `id`  FROM `item`  WHERE `id` = :id",  ['id' => $id]);
    }


    # добавить в бд запись
    #
    private static function dbInsert()
    {
        $lastId = db::query("-
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
    private static function dbUpdate($id)
    {
        db::query("-
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
    private static function dbDelete($id)
    {
        db::query("
            UPDATE
                `item`
            SET
                  `deletedAt` = NOW()
            WHERE
                `id` = " . db::v($id) .  "
        ");

        return $id;
    }
}
