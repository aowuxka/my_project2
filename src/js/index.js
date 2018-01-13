//首页js文件
//利用AMD规范异步模块载入 写首页的交互js代码
require(["config"],function(){
	//在首页进行头尾代码的复用
	require(["jquery","carousel","load"],function($,carousel){
		$(".slide").eq(0).carousel({
			imgs : [
				{src:"/images/slide.jpg", href:"#"},
				{src:"/images/slide02.jpg", href:"#"},
				{src:"/images/slide04.jpg",href:"#"}
			],
			width:760,
			height: 270,
			type: "fade",
			duration: 2000
		});

	});
});
