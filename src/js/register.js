(function($){
    //加载header、footer
    $('#myHeader').load('../html/header.html .h_top');
    $('#myFooter').load('../html/footer.html .f_bottom');

    //登录、注册切换
    $ul=$('#main').find('.items');
    $ul.on('click','li',function(){
        var idx=$(this).index();
        $('.tabs').eq(idx).css({'display':'block'}).siblings('.tabs').css({'display':'none'});
        if(idx==1){
            $(this).siblings('li').find('i').css({'background':"url('../img/register.png') -295px -8px no-repeat"});
            $(this).find('i').css({'background':"url('../img/register.png') -264px -8px no-repeat"});
        }else if(idx==0){
            $(this).siblings('li').find('i').css({'background':"url('../img/register.png') -227px -8px no-repeat"});
            $(this).find('i').css({'background':"url('../img/register.png') -190px -8px no-repeat"});
        }
        $(this).addClass('active').siblings('li').removeClass('active');
    });

     //输入框获取高亮
     $('#main').on('focus','input',function(){
        $(this).css({'border-color':'#FF5A00'});
     }).on('blur','input',function(){
        $(this).css({'border-color':'#C1C1C1'});
     });
  
     // 判断手机格式
     var reg=/\b1[34578]\d{9}\b/g;
     $('#phone').on('blur',function(){
        var phone=$(this).val();
        //判断手机用户是否被占用
        var res=$.ajax({
            type:"GET",
            url:"../api/register.php",
            data:"phone=${phone}",
            async:false
        }).responseText;
        if(res==='yes'&& reg.test(phone)){
            $('.notice').find('span').html('该手机号已存在，请重新输入！');
            $('.notice').css({'display':'block'});
            $(this)[0].focus();
        }
        else if(res==='no'){
            $('.notice').css({'display':'none'})
            $(this)[0].blur();
            
        }else if(!reg.test(phone)){
            $('.notice').css({'display':'block'});
            $(this)[0].focus();
        }else{
            $('.notice').css({'display':'none'});
        }
               
     }); 

     //验证用户名和密码是否正确
        $('.log_info').on('blur','input',function(){
            var user=$('#username').val();
            console.log(user)
            var psw=$('#psw').val();
            var res=$.ajax({
            type:"GET",
            url:"../api/login.php",
            data:"user=${user}&psw=${psw}",
            async:false
          }).responseText;
           console.log(res)
           var idx=$(this).index();
               if(res==='err_name'){
                $('.notice_user').css({'display':'block'});
                $(this).eq(0)[0].focus();
               } 
               else if(res==='true_name'){
                $('.notice_psw').css({'display':'block'});
                $(this).eq(1)[0].focus();
                 }
           else if(res==='true'){
                $('.notice_user').css({'display':'none'});
                $('.notice_psw').css({'display':'none'});
           }
        });
        
})(jQuery);