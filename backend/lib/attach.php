<?php
class attach
{
    static function upload()
    {
        if (req::$path != '/attach/upload')     return;
        if (empty($_FILES['file']))           return;



        $dir    =   'upload';
        if (!file_exists($dir))   mkdir($dir, 0777, true);

        $file   =   $dir . '/' . md5($_FILES['file']['tmp_name']) . '.' . preg_replace('#.*\.#', '', $_FILES['file']['name']);
        move_uploaded_file($_FILES['file']['tmp_name'], $file);
        chmod($file, 0777);

        die(json_encode(['url' => req::site() . '/' . $file]));
    }
}
