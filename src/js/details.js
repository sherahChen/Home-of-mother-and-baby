require(['config'],function(){
    require(['jquery','common','csmZoom'],function(){
        // 加载头部
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
        // 加载尾部
        $('#myFooter').load('../html/footer.html #footer');  

        // 商品信息（tab标签切换）
        $('.d_right .r_nav').on('click','li',function(){     var $idx=$(this).index();
            $('.cont').eq($idx).css({'display':'block'}).siblings('.cont').css({'display':'none'});
        });
         

        // 根据传过来的参数，获取商品信息
        var $res=location.search;  
        var id=$res.substring(4);
         $.ajax({
            url:'../api/list.php',
            aysnc:false,
            data:{id:id},
            success:function(res){                
                res=$.parseJSON(res);
                // 商品数据
                res.data.map(function(item){ 
                
                $('.name').html(item.name);
                $('.details').html(item.details);
                $('.price').html(item.price);
               
                $('.all_detail').find('img').attr('src',item.d_imgurl);
                // 获取图片数组
                var small_img=item.s_imgurl.split(",");
                var big_img=item.b_imgurl.split(",");
                var normal_img=item.n_imgurl.split(",");
                // 添加详细介绍的小图片
                 var l_pit='';
                 for(var i=0;i<small_img.length;i++){
                    l_pit+=`<li><img src="${small_img[i]}" alt="" /></li>`;

                 } 
                 $('.imgurl').attr('src',normal_img[0]);
               
                 $('.carousel').append(l_pit);

                 // 为小图添加两个属性（存放大图和正常图地址）
                 for(var i=0;i<small_img.length;i++){
                $('.carousel').find('li').children('img').eq(i).attr('data-bigPit',big_img[i]);
                 $('.carousel').find('li').children('img').eq(i).attr('data-norPit',normal_img[i]);
                 }
                var $li='';
                if(item.age){
                    $li+=`<li>适用年龄:<span>${item.age}</span></li>`;
                 }
                 if(item.straw){
                    $li+=`<li>是否带吸管:<span>${item.straw}</span></li>`;
                 }
                  if(item.hand){
                    $li+=`<li>是否带把:<span>${item.hand}</span></li>`;
                 }
                 if(item.texture){
                    $li+=`<li>瓶身材质:<span>${item.texture}</span></li>`;
                 }
                 if(item.capacity){
                    $li+=`<li>奶瓶容量:<span>${item.capacity}</span></li>`;
                 }
                 if(item.norm){
                    $li+=`<li>口径类型:<span>${item.norm}</span></li>`;
                 }
                 if(item.mouth){
                    $li+=`<li>标配奶嘴类型:<span>${item.mouth}</span></li>`;
                 }
                  if(item.area){
                    $li+=`<li>产地:<span>${item.area}</span></li>`;
                 }
                 $('.item').append($li);

                });

                //小图点击事件
                $('.carousel').on('mouseenter','img',function(){
                    var idx=$(this).index();
                    // 正常图片地址
                    var normal=$(this).attr('data-norPit');
                    // 大图地址
                    var big=$(this).attr('data-bigPit');
                    // 显示正常图片
                    $('.imgurl').attr('src',normal);
                    $('.imgurl').attr('data-bigPit',big);
                });
                $('.imgurl').csmZoom();
                        
            }
         });
    });
});