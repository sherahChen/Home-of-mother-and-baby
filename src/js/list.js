require(['config'],function(){
    require(['jquery','common'],function(){
         //加载header、footer
        $('#myHeader').load('../html/header.html #headerAll',function(){
             toTop();
             showRight();
             showIconfont();
        });
        $('#myFooter').load('../html/footer.html #footer');  
    });
});