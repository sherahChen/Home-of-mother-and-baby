<?php
    // 获取前端传到后端的手机号
    $phone = $_GET['phone'];
    $file_url='./data/user.json';
    // 打开文件
    $file=fopen($file_url,'r');
    //读取打开的文件
    $content=fread($file,filesize($file_url));
    //关闭文件
    fclose($file);

    // 把读取的内容转为数组
    $all_phone = json_decode($content);

     //将每个phone，并添加到数组
    $res=array();
    foreach($all_phone as $idx => $value){
      $res[$idx]=$value->phone;

 }
    if(in_array($phone, $res)){
        echo "no";
    }else{
        echo "yes";
    }
?>