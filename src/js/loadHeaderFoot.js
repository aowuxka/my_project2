//定义模块加载头部，尾部资源(实现头部尾部资源复用)
//用到ajax,依赖于jquery实现
define(["jquery","cookie"],function($){
	 //将header.html文件 加载显示到index页面中 div.header盒子中
	 //ajax() 方法通过 HTTP 请求加载远程数据。
	 /*deferred.done( doneCallbacks [, doneCallbacks ] )
	  	当Deferred（延迟）对象解决时，调用添加处理程序。*/
	 $.ajax("/html/include/header.html").done(function(data){
	 	//html() 方法返回或设置被选元素的内容 (inner HTML)。
	 	$(".header").html(data);
	 }).done(function(){
	 	//绑定搜索的键盘按键(弹起)事件(搜索内容提示)
	 	$(".search_con form .input_txt ").keyup(function(){
	 		var url = "https://suggest.taobao.com/sug?code=utf-8&q="+ $(this).val() +"&callback=?";
	 		//$.getJSON()通过使用JSONP形式的回调函数来加载其他网域的JSON数据
	 		$.getJSON(url,function(data){
	 			var html = ""; 
	 			//result是一个数组
	 			data.result.forEach(function(curr){
	 				html += "<div>"+curr[0]+"</div>"
	 			});
	 			$(".search_con form .info").html(html);
	 		});
	 	});
	 }).done(function(){
	 	//如果有用户登录成功，则显示欢迎信息
	 	var user = $.cookie("loginUser");
	 	if(user)
	 		$(".user_info").html("欢迎你：<a href='personal.html'>"+ user +"</a>")
	 })
	 //将footer.html文件 加载显示到index页面中 div.footer盒子中
	 $(".footer").load("/html/include/footer.html");
});
