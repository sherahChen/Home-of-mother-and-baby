<?php
    // 分页
    
    
    include 'connect.php';
    // 获取前端传递的参数
    $pageNo = isset($_GET['pageNo']) ? $_GET['pageNo'] :1;
    $qty = isset($_GET['qty']) ? $_GET['qty'] : 20;
     $sql='select * from goods';

    // 执行sql
    $result=$conn->query($sql);
     // 使用查询结果集
    $row = $result->fetch_all(MYSQLI_ASSOC);
    $result->close();
    $conn->close();
    $res= array(
        'data'=>array_slice($row, ($pageNo-1)*$qty,$qty),
        'total'=>count($row)
    );
    
    $res=json_encode($res,JSON_UNESCAPED_UNICODE);
    // 转为JSON 字符串
    echo $res;
?>