<?php
    // 获取前端传到后端的用户名
    $user = $_GET['user'];
    $psw = $_GET['psw'];
    $file_url='./data/user.json';
    // 打开文件
    $file=fopen($file_url,'r');
    //读取打开的文件
    $content=fread($file,filesize($file_url));
    //关闭文件
    fclose($file);

    // 把读取的内容转为数组
    $all_user = json_decode($content);   
    //遍历数组
    $res;
    foreach($all_user as $idx => $value){
        if($user===$value->phone){
            $res='true_name';         
        }else if($user===$value->phone&&$psw===$value->password){
                $res='true';
        }else{
             $res='err_name';
            }
        
       
    }
    echo $res;

 ?>