require(['config'], function() {
    require(['jquery', 'common'], function() {
        //加载header、footer
        $('#myHeader').load('../html/header.html #headerAll', function() {
            toTop();
            showRight();
            showIconfont();
            show_goods(); //显示所有商品
            flyCart(); //飞入购物车
            $('.logo').find('.l_center').remove();
            $('#nav').find('.nav-line').remove();
            $('.logo').css({
                'position': 'relative',
                'background-color': '#fff',
                'border-top': 'none'
            }).find('.search').css({
                'float': 'left',
                'margin-left': '98px'
            });
            var $l_right = $('.l_right');
            $('.logo .container').append($l_right);

            var goodslist = Cookie.get('goodslist');
             // 判断是否为空
             if (goodslist) {
              goodslist = JSON.parse(goodslist);
            }
            show();
            // 购物车显示
                function show(){
                    var lis = goodslist.map(function(goods) {
                      return `<li data-id="g2" class="car_li">
                                <img src="${goods.imgurl}" height="160" width="160" alt="">  <p class="name">${goods.name}</p>
                           <p class="price">￥<span class="jiage">${goods.price}</span></p>
                        
                    <span class="btn-close">删除</span></li> ` ;
                               
                              

                  }).join('');
                 $('<span/>').addClass('btn-close').html('删除').appendTo(lis);
                 $('.car_goods').append(lis);

                }
            // 显示商品到购物车
             $('.goods').on('click', '.add',show);
               
                 
             });
   
        $('#myFooter').load('../html/footer.html #footer');
        //1、数据生成（商品类型）
        $.ajax({
            url: '../api/data/list_type.json',
            async: false,
            success: function(res) {
                // 根据类型生成    
                var arr = ['brand', 'age', 'area', 'capacity', 'hand', 'texture', 'norm', 'mouth', 'straw'];
                res.map(function(item) {
                    for (var i = 0; i < arr.length; i++) {
                        show(arr[i]);
                    }
                    // 封装(将span放入对应的li)
                    // show('brand');
                    function show(name) {
                        if (item.type == name) {
                            var options = item.content.map(function(opt) {
                                return `<span>${opt}</span>`;
                            });
                            $('.' + name).find('div').append(options);
                        }
                    }
                });
                //点击商品图片，跳转页面并传递该商品id
                $('.goods').on('click', 'img', function() {
                    var id = $(this).parent('li').attr('data-id');
                    location.href = `details.html?id=${id}`;
                });
            }
        });
        //添加《展开》按钮
        var $lis = $('.sr_list').find('li');
        for (var i = 0; i < $lis.length; i++) {
            if ($lis.eq(i).outerHeight() > 35) {
                var $span = $('<span/>').css({
                    'float': 'right',
                    'width': '35px',
                    'height': '24px',
                    'border': '1px solid #FF9A02',
                    'color': '#FF9A02',
                    'background-color': '#FFF8E2',
                    'margin': '0 10px',
                    'border-radius': '3px',
                    'text-align': 'center',
                    'line-height': '24px',
                    'position': 'relative',
                    'padding-left': '15px'
                }).addClass('show').html('展开');
                var $i = $('<i/>').addClass('iconfont').addClass('icon-arrLeft-fill1').css({
                    'position': 'absolute',
                    'top': '0px',
                    'left': '0px'
                });
                $span.append($i);
                $lis.eq(i).append($span);
            }
        }
        //展开》按钮操作
        var num = 0;
        $('.sr_list').on('click', '.show', function(e) {
            // let height=$(this).outerHeight();     
            num++;
            if (num % 2 != 0) {
                $(this).parent('li').animate({
                    height: 35
                });
                $(this).html('收起');
            } else {
                $(this).parent('li').animate({
                    height: 16
                });
                $(this).html('展开');
            }
        });
        //分页
        function show_goods() {
            var qty = 20;
            var pageNo = 1;
            var content = '';
            $.ajax({
                url: '../api/list.php',
                async: false,
                data: {
                    qty: qty,
                    pageNo: pageNo
                },
                success: showPage
            });
            // 页码点击事件
            $('.page').on('click', 'li', function() {
                pageNo = $(this).html() * 1;
                $('.goods').children('li').remove()
                $('.page').html('');
                $.ajax({
                    url: '../api/list.php',
                    async: false,
                    data: {
                        qty: qty,
                        pageNo: pageNo
                    },
                    success: showPage
                });
            });

            function showPage(res) {
                $('.goods').children('li').remove();
                // 将字符串转为数组
                res = $.parseJSON(res);
                res.data.map(function(item) {
                    // 获取图片数组
                    var array = item.n_imgurl.split(",");
                    content += `<li data-id="${item.id}">
                        <img src="${array[0]}" height="160" width="160" alt="" />
                        <p class="name">${item.name}<span>${item.details}</span></p>
                        <p class="price">￥<span class="jiage">${item.price}</span></p>
                        <div class="btn clearfix"><button class="add fl">加入购物车</button><button class="like fl">收藏</button></div>
                    </li>  `;
                    return content;
                });
                $('.goods').append(content);
                // 获取页码长度
                var page_len = Math.ceil(res.total / qty);
                //添加页码
                $('.now').text(pageNo).css({
                    'color': '#E60000'
                });
                $('.all').text(page_len);
                for (var i = 0; i < page_len; i++) {
                    var $li = $('<li/>').html(i + 1);
                    if (i + 1 * 1 == pageNo) {
                        $li.css({
                            'background-color': '#FF5C00',
                            'color': '#fff'
                        });
                    }
                    $('.page').append($li);
                }
            }
        }

    });
});