<?php
class res
{
    static function json($data)
    {
        header('Content-Type: application/json; charset=utf-8');
        die( json_encode($data, JSON_UNESCAPED_UNICODE) ); //|JSON_UNESCAPED_SLASHES
    }
}