// 加载js
require(['config'],function(){
  require(['jquery','csmCarousel','common'],function(){
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
       $('#myheader').load("../html/header.html #headerAll",function(){
        // 吸顶
         toTop();
         // 右侧边栏
         showRight();
         // 导航栏金字体图标
         showIconfont();
       });
       $('#myfooter').load('../html/footer.html #footer');  
       
  });
});