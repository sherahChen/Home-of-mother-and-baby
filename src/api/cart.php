<?php
    include 'connect.php';
    $sql='select * from intro_goods';
     // 执行sql
    $result=$conn->query($sql);
     // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    $res=json_encode($row,JSON_UNESCAPED_UNICODE);
    // 转为JSON 字符串
    echo $res;
?>