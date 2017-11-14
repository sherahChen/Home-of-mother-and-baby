;(function($){

  // 数据生成列表
    $specialUl=$('.special').children('ul');
    $selectUl=$('.select').children('ul');
    var res=$.ajax({url:'../api/data/index.json',async:false});
    res=$.parseJSON(res.responseText);
    var special='';
        var select=''; 
    res.map(function(item){ 
       if(item.type=="special"){
           special+=`<li>
                        <div class="left">
                         <a href=""><img src="${item.imgurl}" alt="" /></a>
                        </div>
                        <div class="right">
                            <p class="name">${item.name}</p>                                                
                       <div class="details">
                            <span>${item.details}</span>
                        </div>                              
                               
                        <div class="last">
                       <p class="price"><span>￥</span>${item.price}<span>起</span></p>
                      <a href="#" class="enter">点击进入</a>
                        </div>
                    </div>
                            
                    </li>`;  
       } 
       if(item.type=="select"){
           select+=`<li>
                        <div class="left">
                         <a href=""><img src="${item.imgurl}" alt="" /></a>
                        </div>
                        <div class="right">
                            <p class="name">${item.name}</p>                                                
                       <div class="details">
                            <span>${item.details}</span>
                        </div>                               
                             <p class="site"><i class="iconfont icon-yousanjiao"></i>${item.site}</p>
                               
                        <div class="last">
                       <p class="price"><span>￥</span>${item.price}</p>
                      <a href="#" class="enter">点击进入</a>
                        </div>
                    </div>
                          
                    </li>`;  
       }
       return [special,select]; 
       // return select;      
    }); 
       $specialUl.append(special);
       $selectUl.append(select);

       
      
       //加载header、footer
       $('#myheader').load("../html/header.html #header",function(){
          // 吸顶          
          var $fixed_top=$('#fixed-top');
          $(window).on('scroll',function(){
            var scrollTop=window.scrollY;
            if(scrollTop>=300){
              $fixed_top.css('display','block');

            }else{
             $fixed_top.css('display','none');
            }
          });
   
       });
       $('#myfooter').load('../html/footer.html #footer');
    
    // 购物车(显示、隐藏)
    var $aside=$('#aside');
    var num=0;
    var scrollTop=window.scrollY;
    $aside.on('click','.car',function(e){
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

    //onmouseenter改变一级导航栏字体图标
    $h4=$('#nav').find('h4');
    $h4.on('mouseenter',function(){
      $(this).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shangjiantou');

    }).on('mouseleave',function(){
       $(this).children('i').removeClass('icon-shangjiantou').addClass('icon-shangxiajiantou');
    })
})(jQuery);