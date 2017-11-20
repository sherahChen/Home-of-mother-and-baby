<?php
    include 'connect.php';
    // 获取前端传到后端的用户名
    $user = isset($_GET['user'])?$_GET['user']:'';
    $psw = isset($_GET['psw'])?$_GET['psw']:'';
    // 密码md5加密
    $psw = md5($psw);
    // var_dump($user,$psw);

    $sql = "select * from user where user='$user' and password='$psw'";
    // 获取查询结果
    $result = $conn->query($sql);

    $row = $result->fetch_row();

    //print_r($row[0]);

    if($row[0]){
        echo 'ok';
    }else{
        echo 'fail';
    }
    

    // 释放查询内存(销毁)
    $result->free();

    //关闭连接
    $conn->close();

 ?>