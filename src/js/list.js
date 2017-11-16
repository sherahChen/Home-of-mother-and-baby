require(['config'],function(){
    require(['jquery','common'],function(){
         //加载header、footer
        $('#myHeader').load('../html/header.html #headerAll',function(){
             toTop();
             showRight();
             showIconfont();
             show_goods();
             $('.logo').find('.l_center').remove();
             $('#nav').find('.nav-line').remove();
              $('.logo').css({'position':'relative','background-color':'#fff','border-top':'none'}).find('.search').css({'float':'left','margin-left':'98px'});
              var $l_right=$('.l_right');
              $('.logo .container').append($l_right);


              
     //商品飞入购物车效果         
        let allTotal=0;
         var num=0; // 计算商品的数量
         var $cart=$('#aside .shoppingCar');
        $('.goods').on('click','.add',function(){
           num++;
          $('.shopping').find('.qty').text(num);
          var $li = $(this).closest('li');
          var $img = $li.children('img');
          var $imgClone=$img.clone(false);
          // 给复制的图片设置样式
         $imgClone.css({
            position:'absolute',
            top:$img.offset().top,
            left:$img.offset().left,
            width:$img.width()
               });

         // 把复制的图片写入页面
          $('body').append($imgClone);
           // 动画效果
        $imgClone.animate({left:$('.shopping').offset().left,top:$('.shopping').offset().top,width:30,height:30},function(){
          //删除复制的图片
           $imgClone.remove();
            var $liClone=$li.clone();
         // 删除购物车中的“添加到购物车”按钮
           $liClone.children('.btn').first().remove();
           $('<span/>').addClass('btn-close').html('删除').appendTo($liClone);
          $cart.find('.car_goods').append($liClone);
              });

        //计算价格
        var total=0;//总价格 
        var $price=$('.shoppingCar').find('.total');
        for(var i=0;i<num;i++){
            total+=($('.jiage').eq(i).html())*1;
        }
             allTotal=total;
             $price.html(total);
         });
        
        $cart.on('click','.btn-close',function(e){
          num--;console.log( allTotal)
           $('.shopping').find('.qty').text(num);
          $(this).closest('li').remove();
           e.stopPropagation(); 
          var $del_price=$(this).closest('li').find('.jiage').html();   
           allTotal=allTotal-$del_price*1;
           var $price=$('.shoppingCar').find('.total');
            $price.html(allTotal);
         });
   


        });
        $('#myFooter').load('../html/footer.html #footer');


        //1、数据生成（商品类型）
        $.ajax({url:'../api/data/list_type.json',async:false,success:function(res){
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

      //分页
  function show_goods(){
        var qty=20;
       var pageNo=1;
       var content='';
       $.ajax({url:'../api/list_page.php',async:false,data:{qty:qty,pageNo:pageNo},success:showPage});
          
       
          // 页码点击事件
          $('.page').on('click','li',function(){
              pageNo=$(this).html()*1;
              $('.goods').children('li').remove()
               $('.page').html('');
            $.ajax({url:'../api/list_page.php',async:false,data:{qty:qty,pageNo:pageNo},success:showPage
          });  
          });

       function showPage(res){
         $('.goods').children('li').remove();
           // 将字符串转为数组
           res=$.parseJSON(res);       
           res.data.map(function(item){
             content+= `<li data-id="${item.id}">
                        <img src="${item.s_imgurl}" height="160" width="160" alt="" />
                        <p class="name">${item.name}<span>${item.details}</span></p>
                        <p class="price">￥<span class="jiage">${item.price}</span></p>
                        <div class="btn clearfix"><button class="add fl">加入购物车</button><button class="like fl">收藏</button></div>
                    </li>  `;

                return content;
          });
            
          $('.goods').append(content);
          // 获取页码长度
          var page_len=Math.ceil(res.total/qty);
          //添加页码
          $('.now').text(pageNo).css({'color':'#E60000'});
          $('.all').text(page_len);
          for(var i=0;i<page_len;i++){
              var $li=$('<li/>').html(i+1);
              if(i+1*1==pageNo){
                $li.css({'background-color':'#FF5C00','color':'#fff'});
              }
              
              $('.page').append($li);
          }
        }  
      
      }
       


   
    });
});