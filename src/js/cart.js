require(['config'], function() {
    require(['jquery', 'common'], function() {
        // 加载头部
        $('#myHeader').load('../html/header.html .h_top', function() {
            showNum();
            $('.h_top').find('li').removeClass('active');
            $('.h_top').animate({
                backgroundColor: '#ECECEC'
            });
        });
        // 加载尾部
        $('#myFooter').load('../html/footer.html .f_bottom', function() {
            $('.f_bottom').css({
                'background-color': '#fff'
            });
        });
        // 商品推荐，标签切换
        $('.tuij_t').on('click', 'li', function() {
            var idx = $(this).index();
            $(this).css({
                'background-color': '#fff',
                'border-bottom-color': '#fff'
            }).siblings('li').css({
                'background-color': '#E5E5E5'
            });
            $('.tuij_b').find('ul').eq(idx).css({
                'display': 'block'
            }).siblings('ul').css({
                'display': 'none'
            });
        });
        // 将数据添加到页面
        $.ajax({
            url: '../api/cart.php',
            async: false,
            success: function(res) {
                // 转为数组
                res = $.parseJSON(res);
                var xin = '';
                var hot = '';
                res.map(function(item) {
                    if (item.type == "new") {
                        xin += `<li>
                            <img src="${item.imgurl}" alt="" />
                            <p class="g_name">${item.name}</p>
                            <p class="g_price">${item.now_price}<span>${item.had_price}</span></p>
                            <button class="btn">加入购物车</button>
                        </li>`;
                    } else if (item.type == "hot") {
                        hot += `<li>
                            <img src="${item.imgurl}" alt="" />
                            <p class="g_name">${item.name}</p>
                            <p class="g_price">${item.now_price}<span>${item.had_price}</span></p>
                            <button class="btn">加入购物车</button>
                        </li>`;
                    }
                    return [xin, hot];
                });
                $('.new').append(xin);
                $('.hot').append(hot);
                //onmouseenter事件
                $('.tuij_b').on('mouseenter', 'li', function() {
                    $(this).css({
                        'border-color': '#FF5C00'
                    }).siblings('li').css({
                        'border-color': '#fff'
                    });
                    $(this).find('.btn').css({
                        'display': 'block'
                    });
                }).on('mouseleave', 'li', function() {
                    $(this).find('.btn').css({
                        'display': 'none'
                    });
                    $(this).css({
                        'border-color': '#fff'
                    });
                });
            }
        });
        //将cookie中的数据显示在页面
        var $ul = $('.cart_goods');
        // 获取价格
        var subPrice = $('.total');
        var btnClear = $('.remove');
        var goodslist = Cookie.get('goodslist');
        // 判断是否为空
        if (goodslist) {
            goodslist = JSON.parse(goodslist);
        }
        // console.log(goodslist)
        // 把商品信息写入页面
        var total = 0;
        var lis = goodslist.map(function(goods) {
            total += goods.price * goods.qty;
            return `<li class="goodsLi" data-gid="${goods.gid}">
                    <ul>
                          <li class="name">
                          <img src="${goods.imgurl}" alt="" />
                        <span>${goods.name}</span></li>
                        <li class="price"><div><p>${goods.price}</p><span>0.00</span></div></li>
                        <li class="num"><p><span class="delNum">-</span><input type="text" value="${goods.qty}" class="qtys"/><span class="addNum">+</span></p></li>
                        <li class="l_price">${goods.price}</li>
                        <li class="delect"><span class="remove">删除</span></li>  
                        </ul>
                    </li>`;
        }).join('');
        $ul.append(lis);
        subPrice.html(total);
        $('.p1 span').html(total);
        // 删除商品
        var newTotal = 1 * 0;
        $ul.on('click', '.remove', function() {console.log(goodslist)
            $(this).closest('.goodsLi').remove();
            for (var i = 0; i < goodslist.length; i++) {
                if (goodslist[i].gid === $(this).parents('.goodsLi').attr('data-gid')) {
                    console.log(666)
                    newTotal = goodslist[i].price * goodslist[i].qty;
                    goodslist.splice(i, 1);
                }
            }
            total -= newTotal;
            subPrice.html(total.toFixed(2));
            if (goodslist) {
                Cookie.set('goodslist', JSON.stringify(goodslist));
            }
            //清除所有商品
            $('.clear').on('click', function() {
                Cookie.remove('goodslist');
                window.location.reload();
            });
        });
    });
})