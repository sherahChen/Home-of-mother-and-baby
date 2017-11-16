require(['config'],function(){
    require(['jquery','common'],function(){
        // 加载头部
        $('#myHeader').load('../html/header.html #headerAll',function(){
             toTop();
             showRight();
             showIconfont();
         });
        // 加载尾部
        $('#myFooter').load('../html/footer.html #footer');    
    });
});