require(['config'],function(){
    require(['jquery','common'],function(){
         //加载header、footer
        $('#myHeader').load('../html/header.html #headerAll',function(){
             toTop();
             showRight();
             showIconfont();
             $('.logo').find('.l_center').remove();
             $('#nav').find('.nav-line').remove();
              $('.logo').css({'position':'relative','background-color':'#fff','border-top':'none'}).find('.search').css({'float':'left','margin-left':'98px'});
              var $l_right=$('.l_right');
              $('.logo .container').append($l_right);

        });
        $('#myFooter').load('../html/footer.html #footer');


        //1、数据生成（商品类型）
        var res=$.ajax({url:'../api/data/list_type.json',async:false});
        res=$.parseJSON(res.responseText);
            // 根据类型生成    
        var arr=['brand','age','area','capacity','hand','texture','norm','mouth','straw'];
        res.map(function(item){
            for(var i=0;i<arr.length;i++){
             show(arr[i]);
            }
            // 封装(将span放入对应的li)
            // show('brand');
           function show(name){
            if(item.type==name){
               var options=item.content.map(function(opt){
                    return `<span>${opt}</span>`;
                });
                $('.'+name).find('div').append(options);
            }
       } 
        });

        //添加《展开》按钮
        var $lis=$('.sr_list').find('li');
        for(var i=0;i<$lis.length;i++){
            if($lis.eq(i).outerHeight()>35){
                var $span=$('<span/>').css({'float':'right','width':'35px','height':'24px','border':'1px solid #FF9A02','color':'#FF9A02','background-color':'#FFF8E2','margin':'0 10px','border-radius':'3px','text-align':'center','line-height':'24px','position':'relative','padding-left':'15px'}).addClass('show').html('展开');
                var $i=$('<i/>').addClass('iconfont').addClass('icon-arrLeft-fill1').css({'position':'absolute','top':'0px','left':'0px'});
                $span.append($i);
                $lis.eq(i).append($span);
            }
        }

        //展开》按钮操作
        var num=0;         
        $('.sr_list').on('click','.show',function(e){
           // let height=$(this).outerHeight();     
            num++;
            if(num%2!=0){
                $(this).parent('li').animate({height:35});
                $(this).html('收起');
            }
            else{
                $(this).parent('li').animate({height:16});
                $(this).html('展开');
            }
        });

        
          
    });
});