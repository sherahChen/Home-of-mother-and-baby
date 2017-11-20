<?php

   include 'connect.php';
    // 接受前端数据
    $user = isset($_GET['phone'])?$_GET['phone']:'';
    $password = isset($_GET['password']) ? $_GET['password'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';


    //查看用户名是否已经存在
    $sql = "select user from user where user='$user'";
    $result = $conn->query($sql);

    if($result->num_rows>0){
        // 释放查询内存(销毁)
        $result->free();

        // 用户名已经被占用
        echo "fail";
    }else{
        // 释放查询内存(销毁)
        $result->free();

        // 密码md5加密
        $password = md5($password);
        echo "$password";

        $sql = "insert into user(user,password,email) values('$user','$password','$email')";
        $result = $conn->query($sql);


        if ($result) {
            // 写入成功
            echo "ok";
        }
         else {
            // 写入失败
            echo "Error: " . $sql . "<br>" . $conn->error;
          
        }
    }
    //关闭连接
    $conn->close();


?>