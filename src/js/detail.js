//detail(详情页)js文件
//利用AMD规范异步模块载入 写首页的交互js代码
require(["config"],function(){
	//在首页进行头尾代码的复用
	require(["jquery","template","cookie","zoom","fly","load"],function($,template,cookie,elevateZoom){
		$.cookie.json = true;
		var fuck = $.cookie("id");
		$.getJSON("/mock/list.json",function(data){
			let contrData = data.res_body.fdj;
			let arr = [],i = 0;
			$.each(contrData,function(index,elements){
				arr.push(`${elements.id}`);
			});
			i = $.inArray(fuck,arr);
			let prodDate = {products : data.res_body.fdj};
			var array = [];
			array.push(prodDate.products[i]);
			var html = "";
			$.each(array,function(index,element){
				html = `<div class = "box">
					<div class="id" style ="display:none">${element.id}</div>
					<div class="poi">
						<img src = "${element.img2}" class="img2" data-zoom-image="${element.img2}">
					</div>
					<div class = "hui">
						<div class = "title>"${element.title}</div>
						<div class="price">￥${element.price}</div>
						<div class="sl"><div class="kuy">数量：</div><div class="reduce">-</div><div class="pu">1</div><div class="add">+</div></div>
						<div class="add">加入购物车</div>
					</div>
				</div>`
				$(".main").html(html);
				$(".img2").elevateZoom({});
			});
			
		});
	});
});
