
//头部加载完成后调用

  // 吸顶    
  function toTop(){
             var $fixed_top=$('#fixed-top');
          $(window).on('scroll',function(){
            var scrollTop=window.scrollY;
            if(scrollTop>=300){
              $fixed_top.css('display','block');

            }else{
             $fixed_top.css('display','none');
            }
          });   
        }  

   // 右侧边栏 
    function showRight(){
        // 购物车(显示、隐藏)
        var $aside=$('#aside');
        var num=0;
        var scrollTop=window.scrollY;
        $aside.on('click','.car',function(e){console.log(666)
          num++;
          if(num%2!=0){
              $('.shoppingCar').css('display','block');     
          }
          else{
             $('.shoppingCar').css('display','none');
          }  
          // 停止事件传播
           e.stopPropagation(); 

            // 返回顶部  
         }).on('click','.toTop',function(){    
             var timer = setInterval(function(){
              var speed = scrollTop/10;
               scrollTop -= speed;
              if(scrollTop <= 0 || speed <=5){
                  clearInterval(timer);
                  scrollTop = 0;
              }
                scrollTo(0,scrollTop);
          },50);
            
      });    
          // 任意点击,隐藏
        $(document).on('click',function(){
          $('.shoppingCar').css('display','none');
         
        });
  }

  // 导航栏图标
  function showIconfont(){   
        //onmouseenter改变一级导航栏字体图标
        $h4=$('#nav').find('h4');
        $h4.on('mouseenter',function(){
          $(this).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shangjiantou');

        }).on('mouseleave',function(){
           $(this).children('i').removeClass('icon-shangjiantou').addClass('icon-shangxiajiantou');
        })   
 }
