require(['config'], function() {
    require(['jquery'], function() {
        //加载header、footer
        $('#myHeader').load('../html/header.html #header', function() {
            $('.logo').css({
                'background-color': '#fff',
                'border-top': 'none'
            }).find('.logo_pit').siblings('div').remove();
        });
        $('#myFooter').load('../html/footer.html .f_bottom');
        //登录、注册切换
        $ul = $('#main').find('.items');
        $ul.on('click', 'li', function() {
            var idx = $(this).index();
            $('.tabs').eq(idx).css({
                'display': 'block'
            }).siblings('.tabs').css({
                'display': 'none'
            });
            if (idx == 1) {
                $(this).siblings('li').find('i').css({
                    'background': "url('../img/register.png') -295px -8px no-repeat"
                });
                $(this).find('i').css({
                    'background': "url('../img/register.png') -264px -8px no-repeat"
                });
            } else if (idx == 0) {
                $(this).siblings('li').find('i').css({
                    'background': "url('../img/register.png') -227px -8px no-repeat"
                });
                $(this).find('i').css({
                    'background': "url('../img/register.png') -190px -8px no-repeat"
                });
            }
            $(this).addClass('active').siblings('li').removeClass('active');
        });
        //输入框获取高亮
        $('#main').on('focus', 'input', function() {
            $(this).css({
                'border-color': '#FF5A00'
            });
        }).on('blur', 'input', function() {
            $(this).css({
                'border-color': '#C1C1C1'
            });
        });
        // 判断手机格式
        var reg = /\b1[34578]\d{9}\b/g;
        $('#phone').on('blur', function() {
            var phone = $(this).val();
            if(!reg.test(phone)){
                $('.notice').css({
                    'display': 'block'
                }); 
                $(this).focus();
            }
            else{
                $('.notice').css({
                    'display': 'none'
                }); 
            }
        });

        $('.reg_btn').on('click',function(e){ 
            var phone=$('#phone').val();
            var password=$('#reg_password').val();
            var bd_password=$('#bd_password').val();
             // 判断两次密码输入是否一致
            if(password!=bd_password){
                 $('.notice_psw').css({
                    'display': 'block'
                }); 
            }
                $('.notice_psw').css({
                    'display': 'none'
                }); 
            e.preventDefault();
             //判断手机用户是否被占用    
           $.ajax({
                type: "GET",
                url: "../api/register.php",
                data: {phone:phone,password:password},
                async: false,
                success:function(res){
                 if (res === 'fail') {
                    $('.notice').find('span').html('该手机号已存在，请重新输入！');
                    $('.notice').css({
                    'display': 'block'
                    });
                } else {
                    $('.reg_info').css({'display':'none'});
                   $('.log_info').css({'display':'block'});
                   $('.item li').eq(1).addClass('active');
                 } 
                }
            });
            
           e.preventDefault();
        })
    // });    
        //验证用户名和密码是否正确
        $('.login_btn').on('click', function(e) {
            console.log(666)
            var user = $('#username').val();
            var psw = $('#psw').val();
            $.ajax({
                type: "GET",
                url: "../api/login.php",
                data: {
                    user: user,
                    psw: psw
                },
                async: false,
                success: function(res) {
                    console.log(res)
                    if (res === 'fail') {
                        $('.notice_user').css({
                            'display': 'block'
                        });
                    } else if (res === 'ok') {
                        $('.notice_user').css({
                            'display': 'none'
                        });
                        location.href='../index.html';
                    }
                }
            });
            e.preventDefault();
        });
    });
});