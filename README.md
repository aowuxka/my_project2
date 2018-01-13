
自述文件：
	项目：天天新鲜
	
	完成功能：
		
		1. 注册
		2. 登录
		3. 首页
		4. 列表（专题）
		5. 商品详情
		6. 购物车
		7. 确认订单

	技术：
	
		1. HTML + CSS / HTML5 + CSS3 --- 布局样式
		
		2. JavaScript --- 完成交互
		
		3. jQuery --- js库
				  --- 在线js库url: code.jquery.com/jquery-1.12.4.min.js
		
		4. SASS / LESS --- css扩展语言（让你写css更轻松）
		
		5. git / github --- 远程仓库 每日推送你更新的版本
		
		6. gulp --- 自动化构建工具 （实现 代码压缩，自动刷新等 ）
		
		7. RequireJS --- 基于 AMD 规则 的异步模块载入方式 （避免引入过多外部js文件）
		
		8. bootstrap-3.3.7 --- 框架
		
	文件说明：
		src --- 我写的所有源文件
			src/mock --- 模拟的数据
			src/lib --- 引入的资源
				src/html/include --- 头尾资源复用
				
		dist --- gulp压缩后的资源
		
	任务笔记：
		淘宝搜索提示：
			https://suggest.taobao.com/sug?code=utf-8&q="+ $(this).val() +"&callback=?
		
		json文件不能有注释！！！！
		
		Git Bash Here 启动 gulp ctrl+c会中断服务器就连接不上
	