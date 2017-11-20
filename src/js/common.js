//头部加载完成后调用
// 吸顶    
function toTop() {
        var $fixed_top = $('#fixed-top');
        $(window).on('scroll', function() {
            var scrollTop = window.scrollY;
            if (scrollTop >= 300) {
                $fixed_top.css('display', 'block');
            } else {
                $fixed_top.css('display', 'none');
            }
        });
    }
    // 右侧边栏 
function showRight() {
        // 购物车(显示、隐藏)
        var $aside = $('#aside');
        var num = 0;
        var scrollTop = window.scrollY;
        $aside.on('click', '.car', function(e) {
            num++;
            if (num % 2 != 0) {
                $('.shoppingCar').css('display', 'block');
            } else {
                $('.shoppingCar').css('display', 'none');
            }
            // 停止事件传播
            e.stopPropagation();
        }).on('click', '.close', function() {
            $('.shoppingCar').css('display', 'none');
            // 返回顶部 
        }).on('click', '.toTop', function() {
            var timer = setInterval(function() {
                var speed = scrollTop / 10;
                scrollTop -= speed;
                if (scrollTop <= 0 || speed <= 5) {
                    clearInterval(timer);
                    scrollTop = 0;
                }
                scrollTo(0, scrollTop);
            }, 50);
        });
        // 任意点击,隐藏
        $(document).on('click', function() {
            $('.shoppingCar').css('display', 'none');
        });
    }
    // 导航栏图标
function showIconfont() {
        //onmouseenter改变一级导航栏字体图标
        $h4 = $('#nav').find('h4');
        $h4.on('mouseenter', function() {
            $(this).children('i').removeClass('icon-shangxiajiantou').addClass('icon-shangjiantou');
        }).on('mouseleave', function() {
            $(this).children('i').removeClass('icon-shangjiantou').addClass('icon-shangxiajiantou');
        })
    }
    //商品飞入购物车效果、将商品信息添加到cookie
function flyCart() {
        let allTotal = 0;
        var $cart = $('#aside .shoppingCar');
        // 获取cookie
        var goodslist = Cookie.get('goodslist');
        // 判断是否存在cookie
        if (!goodslist) {
            // 创建数组，添加商品参数
            goodslist = [];
        } else {
            goodslist = JSON.parse(goodslist);
        }
        // 计算商品的数量
         var num=0;
        goodslist.map(function(goods) {
            num+=goods.qty;
        });
        //利用事件委托给添加购物车按钮绑定事件
        $('.qty').html(num);    
        $('.goods').on('click', '.add', function() {
            num++;
            $('.shopping').find('.qty').text(num);
            // 当前li
            var $li = $(this).closest('li');
            var $img = $li.children('img');
            var $imgClone = $img.clone(false);
            // 获取商品id
            var gid = $li.attr('data-id');
            // 给复制的图片设置样式
            $imgClone.css({
                position: 'absolute',
                top: $img.offset().top,
                left: $img.offset().left,
                width: $img.width()
            });
            // 把复制的图片写入页面
            $('body').append($imgClone);
            // 动画效果
            $imgClone.animate({
                left: $('.shopping').offset().left,
                top: $('.shopping').offset().top,
                width: 30,
                height: 30
            }, function() {
                //删除复制的图片
                $imgClone.remove();
            });
            //计算价格
            var total = 0; //总价格 
            var $price = $('.shoppingCar').find('.total');
            for (var i = 0; i < num; i++) {
                total += ($('.jiage').eq(i).html()) * 1;
            }
            allTotal = total;
            $price.html(total);
            // 判断当前商品是否已存在
            var currentGid;
            var res = goodslist.some(function(goods, idx) {
                currentGid = idx;
                return goods.gid == gid;
            });
            if (res) {
                //如果商品已存在，数量++
                goodslist[currentGid].qty++;
            }
            //否则，则添加商品
            else {
                var goods = {
                    gid: gid,
                    qty: 1,
                    imgurl: $li.children('img').attr('src'),
                    name: $li.find('.name').html(),
                    price: $li.find('.jiage').html(),

                };
                goodslist.push(goods);
            }
            Cookie.set('goodslist', JSON.stringify(goodslist));
            // 添加数量
        });
        $cart.on('click', '.btn-close', function(e) {
            num--;
            console.log(allTotal)
            $('.shopping').find('.qty').text(num);
            $(this).closest('li').remove();
            e.stopPropagation();
            var $del_price = $(this).closest('li').find('.jiage').html();
            allTotal = allTotal - $del_price * 1;
            var $price = $('.shoppingCar').find('.total');
            $price.html(allTotal);
        });
    }
    // 数量加减
    //数量添加
function showNum(goodlist) {
        $('.goodsLi').on('click', '.addNum', function() {
            var num = $(this).prev('.qtys').val();
            num++;
            $(this).prev('.qtys').val(num);
        }).on('click', '.delNum', function() {
            var num = $(this).next('.qtys').val();
            num--;
            if (num < 1) {
                num = 1;
            }
            $(this).next('.qtys').val(num);
        });
    }
    //cookie操作
    //增，删，查，改
var Cookie = {
    /**
     * [添加/修改cookie]
     * @param {String} name    [cookie名]
     * @param {String} val     [cookie值]
     * @param {[Date]} expires [cookie有效期]
     * @param {[String]} path    [cookie保存路径]
     */
    set: function(name, val, expires, path) {
        var str = name + '=' + val;
        // 有效期
        if (expires) {
            str += ';expires=' + expires.toUTCString();
        }
        // 保存路径
        if (path) {
            str += ';path=' + path;
        }
        // 写入cookie
        document.cookie = str;
    },
    /**
     * [删除cookie]
     * @param  {String} name [要删除的cookie名]
     * @param  {[String]} path [指定路径]
     */
    remove: function(name, path) {
        var now = new Date();
        now.setDate(now.getDate() - 7);
        // document.cookie = name + '=null;expires=' + now.toUTCString();
        // 利用添加方法达到删除效果
        this.set(name, 'null', now, path);
    },
    /**
     * [获取cookie]
     * @param  {String} name [cookie]
     * @return {String}      [description]
     */
    get: function(name) {
        var res = '';
        // 获取能访问的所有cookie
        var cookies = document.cookie;
        // 判断是否存在cookie
        if (!cookies.length) {
            return res;
        }
        // cookie字符串拆成数组
        cookies = cookies.split('; ');
        // 遍历数组，找出name对应cookie值
        for (var i = 0; i < cookies.length; i++) {
            // 拆分cookie名和cookie值
            var arr = cookies[i].split('=');
            if (arr[0] === name) {
                res = arr[1];
                break;
            }
        }
        return res;
    }
}