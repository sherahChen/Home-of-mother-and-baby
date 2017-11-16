<?php
    $servername='localhost';
    $username='root';
    $password='';
    $database='home';
    // 连接数据库
    $conn=new mysqli($servername,$username,$password,$database);
    // 检测
    if($conn->connect_errno){
        die('连接失败'.$conn->connect_error);
    }
    // 编码
    $conn->set_charset('utf8');
?>