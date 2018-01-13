

$(function(){

    // 1.获取相关的元素

        //轮播图div的标签
        var $Slide =$(".slide");

        //图片列表标签
        var $list = $(".slide_list li");

        // 图片上左右按钮
        var $leftBtn = $(".prev");
        var $rightBtn = $(".next");

        //小圆点列表 --- 列表
        var $PointsList = $(".points");

    // 2.根据图片的个数  添加小圆点
        //2.1 获取图片的个数
        var iPicCount = $list.length;

        //2.2创建一个节点(小圆点)
        for(var index = 0; index<iPicCount; index++){

            //  给li标签添加节点
            var $point_li = $("<li>");

            // 默认选中的是第一个
            if(index == 0){
                    // 给角标为0的小圆点背景色变成红色
                $point_li.addClass("active");
            }

            // 把创建出来的小圆点 添加到 PointsLst的列表中
            $PointsList.append($point_li);
        }

    // 3. 监听小圆点的点击
        // 3.1 为切换图片做准备工作
        // 除了第一张图之外,其他的图片都到760的位置
        $list.not(":first").css({"left":760});

        var iNowIndex = 0; //现在按钮点击的角标
        var iPreIndex = 0; //上一个按钮点击的角标

        // 3.2委托函数
        $PointsList.delegate("li", "click", function(){
            // 3.2.1给选中的小圆点添加红色的背景
            $(this).addClass("active");

            // 3.2.2 其他的小圆点去掉红色的背景
            // siblings() 选取所有同辈的元素 除了选中的.其他的删除active这个类
            $(this).siblings().removeClass("active");

            // 3.2.3 图片的准备工作 除了第一张图片之外的其他图片都放在右边的760的位置
            // 当前选中的角标,左右按钮也用,设置为全局变量
            iNowIndex = $(this).index();

            // 调用图片动画功能的函数
            fnAnimation();
    });

        // 4.监听左右两个按钮按钮的点击
        // 记录动画是否结束的表识
        var bIsOver = false;
        $leftBtn.click(function () {// 图片往左滑动
            if(bIsOver){
                return;
            }
            bIsOver = true;
            // 角标累加
            iNowIndex --;
            fnAnimation();

            // 小圆点随着按钮点击切换图片 随着变动
            // pointsList 这个变量是小圆点列表  不是points 列表下的4个li标签
            $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");

        });

        $rightBtn.click(function () {// 图片往右滑动
            if(bIsOver){
                return;
            }
            bIsOver = true
            // 角标减小
            iNowIndex ++;
            fnAnimation();

            // 小圆点随着按钮点击切换图片 随着变动
            // pointsList 这个变量是小圆点列表  不是points 列表下的4个li标签
            $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");

        });


        // 5.自动播放 默认为左滑动
        function fnAutoPlay() {
            // 角标累加
            iNowIndex++;
            // 调用方法,切换图片
            fnAnimation();
            // 切换小圆点
            $(".points li").eq(iNowIndex).addClass("active").siblings().removeClass("active");
        }

        //调用函数 没三秒切换一次图片
        var timer = setInterval(fnAutoPlay,2000);

        // 6.监听鼠标  鼠标放上去的时候,图片不动
        // 鼠标的悬浮和移开
        $Slide.mouseenter(function () {
            clearInterval(timer);
        });
        $Slide.mouseleave(function () {
            timer = setInterval(fnAutoPlay,2000);
        })



        // 切换图片的动画功能  所有的图片切换的功能函数都是在这里实现
        function fnAnimation() {

            // 监听左边按钮的点击 做出判断
            if(iNowIndex > iPicCount-1){// 往左边滑动已经到底了 头尾互换一下
                iNowIndex = 0;
                iPreIndex = iPicCount-1;

                // 当前这张图片先放到 右边760的位置 无动画
                $list.eq(iNowIndex).css({"left":760});
                // 让上一张图片 动画  移动到-760的位置
                $list.eq(iPreIndex).animate({"left":-760});

                // 在把点击的这张图片从760的位置  动画移动到 0
                $list.eq(iNowIndex).animate({"left":0},function () {
                    bIsOver = false; // 标识动画结束了
                });

                // 记录一下角标
                iPreIndex = iNowIndex;
                return; // 完成这些共能就把函数结束
            }

            // 监听右边按钮的点击 做出判断
            if(iNowIndex < 0){//右边滑动  露头了 头尾互换一下
                iNowIndex = iPicCount-1;
                iPreIndex = 0;

                // 先将最后一张图片放到  左边的-760的位置  无动画
                $list.eq(iNowIndex).css({"left":-760});
                // 让上一张图片  动画  移动到760的位置
                $list.eq(iPreIndex).animate({"left":760});

                // 在把点击的这张图片从-760的位置 动画的 移动到0
                $list.eq(iNowIndex).animate({"left":0},function () {
                    bIsOver = false; // 标识动画结束了
                });

                // 记录一下角标
                iPreIndex = iNowIndex;
                return;
            }


            // 有两个条件, 需要判断一下 iNowIndex > iPreIndex

            if(iNowIndex > iPreIndex){

                // 解决bug 不管这张图片在什么位置  先放到 右边760的位置
                $list.eq(iNowIndex).css({"left":760});
                // 让上一张图片  动画  的移除到   -760;
                $list.eq(iPreIndex).animate({"left":-760});

            }

            // 还是  iNowIndex < iPreIndex
            if(iNowIndex < iPreIndex){

                // 解决bug 不管这张图片在什么位置  先放到 右边760的位置
                $list.eq(iNowIndex).css({"left":-760});
                // 让上一张图片  动画  的移除到   760
                $list.eq(iPreIndex).animate({"left":760});

            }

            // 有域代码重复,所有拿到外面
            // 让当前图片    动画  的出现    0
            $list.eq(iNowIndex).animate({"left":0},function () {
                bIsOver = false; //标识动画结束了
            });

            // 记录上一张图片的角标
            iPreIndex = iNowIndex;

        }

});