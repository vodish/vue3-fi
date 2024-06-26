<?php
# ошибки
#
error_reporting(E_ALL | E_NOTICE);
ini_set('display_errors', 'On');
#
#
# cors
#
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, X-Auth');
if (@$_SERVER['HTTP_X_AUTH'] !== 'superAuth')  die;
#
#
# авто подключение классов
#
spl_autoload_register(function ($name) {
    if (is_file($file = $_SERVER['DOCUMENT_ROOT'] . "/lib/$name.php"))  require_once $file;
});
#
#
# подключение к базе
#
define('DB_TEST',   'mysql:host=localhost;port=3312;dbname=vue3fi;charset=utf8mb4;');
define('DB_PROD',   'mysql:host=localhost;port=3306;dbname=vue3fi;charset=utf8mb4;');
define('DB_USER',   'vue3fi');
define('DB_PASS',   'vue3fi23435535');
db::init();
req::parse();





# ручки материалов
#
item::getAll();
item::insert();
item::update();
item::delete();
#
#
# ручки изделий
#
product::getAll();
product::insert();
product::update();
product::delete();
#
#
# ручка загрузки картинки
#
attach::upload();

