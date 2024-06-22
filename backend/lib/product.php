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
        req::$body['id'] = self::dbInsert(req::$body);

        # обновить зависимости
        self::dbLinksUpdate();

        $list = self::dbGetAll();
        res::json($list);
    }



    static function update()
    {
        if (req::$path != '/product/update')    return;
        if (empty(req::$body))                  return;

        $row    =   self::dbGetById(req::$body['id']);
        if (empty($row))                        return;

        # обновить запись
        # вернуть данные
        self::dbUpdate(req::$body);

        # обновить зависимости
        self::dbLinksUpdate();


        $list = self::dbGetAll();
        res::json($list);
    }



    static function delete()
    {
        if (req::$path != '/product/delete')    return;
        if (empty(req::$body['id']))            return;

        $row    =   self::dbGetById(req::$body['id']);
        if (empty($row))                        return;

        # удалить запись
        self::dbDelete(req::$body['id']);


        $list = self::dbGetAll();
        res::json($list);
    }







    # операции с бд
    #
    private static function dbGetAll()
    {
        db::query("
            SELECT
                `product`.*
                , (SELECT CONCAT('[', GROUP_CONCAT(`item`), ']')  FROM product_top  WHERE `product` = `product`.`id`) AS top
                , (SELECT CONCAT('[', GROUP_CONCAT(`item`), ']')  FROM product_mid  WHERE `product` = `product`.`id`) AS mid
                , (SELECT CONCAT('[', GROUP_CONCAT(`item`), ']')  FROM product_bot  WHERE `product` = `product`.`id`) AS bot
                , (SELECT CONCAT(MIN(`price`), '...', MAX(`price`))  FROM `product_price`  WHERE `product` = `product`.`id` ) AS price_range 
                ,(
                    SELECT
                        CONCAT(
                            '['
                            ,GROUP_CONCAT(JSON_OBJECT(
                                'uid', CONCAT(`top_item`, ',', `mid_item`)
                                ,'top', `top_item`
                                ,'mid', `mid_item`
                                ,'price', `price`
                            ))
                            ,']'
                        ) AS t
                    FROM
                        product_price
                    WHERE
                        `product`= `product`.`id`
                )
                AS prices
                        
            FROM
                `product`
            WHERE
                `deleted_at` IS NULL
            ORDER BY
                `id`
        ");

        for ($list = []; $v = db::fetch(); $list[] = $v) {
            $v['top']       =   $v['top'] ?      json_decode($v['top'], true) :       [];
            $v['mid']       =   $v['mid'] ?      json_decode($v['mid'], true) :       [];
            $v['bot']       =   $v['bot'] ?      json_decode($v['bot'], true) :       [];
            $v['prices']    =   $v['prices'] ?   json_decode($v['prices'], true) :    [];
        }

        res::json($list);
    }

    private static function dbGetById($id)
    {
        return db::one("SELECT `id`  FROM `product`  WHERE `id` = :id",  ['id' => $id]);
    }


    # добавить в бд запись
    #
    private static function dbInsert()
    {
        $lastId = db::query("
            INSERT INTO `product` (
                  `name`
                , `descr`
                , `image`
            )
            VALUES (
                  " . db::v(req::$body['name']) .  "
                , " . db::v(req::$body['descr']) .  "
                , " . db::v(req::$body['image']) .  "
            )
        ");

        return $lastId;
    }


    # обновить в бд запись
    #
    private static function dbUpdate()
    {
        db::query("
            UPDATE
                `product`
            SET
                  `name` = " . db::v(req::$body['name']) .  "
                , `descr` = " . db::v(req::$body['descr']) .  "
                , `image` = " . db::v(req::$body['image']) .  "
            WHERE
                `id` = " . db::v(req::$body['id']) .  "
        ");

        return (int)req::$body['id'];
    }


    # удалить из бд запись
    #
    private static function dbDelete($id)
    {
        db::query("
            UPDATE
                `product`
            SET
                  `deleted_at` = NOW()
            WHERE
                `id` = " . db::v($id) .  "
        ");

        return (int)req::$body['id'];
    }


    # обновить связанные данные
    # 
    # 
    private static function dbLinksUpdate()
    {
        # собрать временную таблицу для материалов
        $tItems = [];
        #
        foreach (['top', 'mid', 'bot'] as $target) {
            foreach (req::$body[$target] as $v) {
                $tItems[] = "SELECT '$target' as `target`, " . (0 + $v) . " as `item`";
            }
        }
        #
        db::query("CREATE TEMPORARY TABLE `tItems` " . implode(' UNION ', $tItems));
        #
        #
        # обновить текущие материалы
        $productId  =   (int)req::$body['id'];
        #
        db::query("DELETE FROM `product_top`  WHERE `product` = $productId");
        db::query("DELETE FROM `product_mid`  WHERE `product` = $productId");
        db::query("DELETE FROM `product_bot`  WHERE `product` = $productId");
        #
        db::query("INSERT INTO `product_top`  SELECT $productId, `item`  FROM `tItems`  WHERE `target` = 'top'");
        db::query("INSERT INTO `product_mid`  SELECT $productId, `item`  FROM `tItems`  WHERE `target` = 'mid'");
        db::query("INSERT INTO `product_bot`  SELECT $productId, `item`  FROM `tItems`  WHERE `target` = 'bot'");



        # собрать временную таблицу для цен
        $tPrices = [];
        #
        foreach (req::$body['prices'] as $v) {
            $tPrices[] = "($productId, " . (0 + $v['top']) . ", " . (0 + $v['mid']) . ", " . (0 + $v['price']) . ")";
        }
        #
        # обновить цены
        #
        db::query("DELETE FROM `product_price`  WHERE `product` = $productId ");
        db::query("INSERT INTO `product_price`  VALUES " . implode(",\n", $tPrices));
    }
}
