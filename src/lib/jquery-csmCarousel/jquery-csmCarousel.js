;
(function($) {
        $.fn.csmCarousel = function(options) {
            var defaults = {
                width: 1090,
                height: 350,
                imgs: [],
                type: 'horizontal', //vertical,horizontal（li左浮动）,fade（淡入淡出）
                autoPlay: true, //是否自动播放
                duration: 3000, //切图时间
                showBtn: true, //是否显示前后按钮
                showPage: true, //是否显示页码                
                seamless: false, // 是否无缝               
                index: 0 //初始化               
            }
            var opt = jQuery.extend({}, defaults, options);
            var $self = this;
        
        Car = {
            //初始化
            init(opt) {
                    this.index = opt.index;
                    this.opt = opt;
                    $self.addClass('carousel');
                    $self.css('width', opt.width);
                    $self.css('height', opt.height);
                    //将图片添加到页面
                    var ul = document.createElement('ul');
                    ul.innerHTML = opt.imgs.map(function(item) {
                        return `<li><img src="${item}"></li>`;
                    }).join('');
                    $self.append(ul);
                    this.ul = ul;
                    this.len = this.ul.children.length;

                    //水平滚动，所设置ul的宽
                    ul.style.width = this.len * opt.width + 'px';
                    //是否无缝滚动
                    //判断是否自动播放
                    if (opt.autoPlay) {
                        this.start();
                        //鼠标移入移出
                        $self.on('mouseenter', function() {
                            this.stop();
                        }.bind(this));
                        $self.on('mouseleave', function() {
                            this.start();
                        }.bind(this));
                        // 页码
                             this.div=document.createElement('div');
                                this.div.classList.add('page');
                            //是否显示页码  
                            if(opt.showPage){
                                for(var i=0;i<this.len;i++){
                                    var span=document.createElement('span');
                                    span.innerHTML=i+1;
                                    this.div.appendChild(span);
                                    if(this.index===i){
                                        span.classList.add('active');                            
                                    }
                                }
                                $self.append(this.div);              
                            }
                            //类型是否是fade
                            if(opt.type=='fade'){
                                 for(var i=0;i<this.len;i++){
                                    this.ul.children[i].classList.add('fadeStyle');
                                    if(!i==this.index){

                                     $(this.ul.children[i]).animate({opacity:0});
                                    }
                                }
                            }
                    }
                        //判断是否显示前后按钮
                        if(opt.showBtn){
                            var btnNext=document.createElement('span');
                            btnNext.classList.add('next');
                            btnNext.innerHTML='&gt;';
                            var btnPrev=document.createElement('span');
                             btnPrev.classList.add('prev');
                            btnPrev.innerHTML='&lt;';
                            $self.append(btnNext);
                            $self.append(btnPrev);
                        }
                        $self.on('click',function(e){
                            e=e||window.event;
                            var target=e.target||e.srcElement;
                            //前后按钮点击事件
                            if(target.className=='next'){
                                this.next();
                            }
                            else if(target.className=='prev'){
                               this.prev();
                           }
                           // 页码点击事件
                            else if(target.parentNode.className=='page'){
                                this.index=target.innerText-1;
                                this.move();
                           }
                        }.bind(this));
                },
                // //移动
                move() {
                        if(this.index>this.len-1){
                            this.index=0;
                            //无缝滚动
                            // if(this.opt.seamless){
                            //     this.index=1;
                            // }
                        }
                        else if(this.index<0){
                            this.index=this.len-1;              
                        }
                    let target = {};
                    //1、垂直轮播图
                    if (this.opt.type == 'vertical') {
                        target.top = -this.index * this.opt.height;
                    }
                    //2、水平轮播图 
                    else if (this.opt.type == 'horizontal') {
                        // （向左浮动）
                        for (var i = 0; i < this.len; i++) {
                            $self.find('li').css('float', 'left');
                        }
                        target.left = -this.index * this.opt.width;
                    }
                    // 3、淡入淡出轮播图
                     else if(this.opt.type=='fade'){ 
                        //将前面图片所有的opacity设为0（清除）
                     for(var i=0;i<this.len;i++){
                       $(this.ul.children[i]).animate({opacity:0});
                        }                                                                       
                       $(this.ul.children[this.index]).animate({opacity:1});
                    } 
                    $self.find('ul').animate(target);
                    //图片切换时，切换页码
                    if(this.opt.showPage){
                         for(var i=0;i<this.len;i++){        
                                this.div.children[i].classList.remove('active');
                            }
                            this.div.children[this.index].classList.add('active');
                    }
                },
                //停止
                stop() {
                    clearInterval(this.timer);
                },
                //播放
                start() {
                    //用箭头函数（无this，继承外围的this）,改变this指向
                    this.timer = setInterval(() => {
                        this.index++;
                        this.move();
                    }, this.opt.duration);
                },
                //下一张
                next() {
                    this.index++;
                    this.move();
                },
                //上一张
                prev() {
                    this.index--;
                    this.move();
                }
        }
        Car.init(opt);
    }

})(jQuery);