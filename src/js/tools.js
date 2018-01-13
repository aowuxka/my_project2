/*
 * 作用：查找指定元素在数组中第一次出现的索引
 * @param value 待查找的值
 * @param array 数组
 * @return 返回value在array数组中第一次出现的索引，如果不存在，返回-1
 */
function inArray(value, array) {
	/* 浏览器支持使用数组的 indexOf() 方法 */
	if (Array.prototype.indexOf)
		return array.indexOf(value);
	/* 浏览器不支持使用数组的 indexOf() 方法 */
	for (var i = 0, len = array.length; i < len; i++) {
		if (value === array[i])
			return i;
	}
	return -1;
}

/*
 * 作用：日期时间格式化
 * @param datetime 待格式化的日期时间对象(Date对象)
 * @return 返回格式化后的日期时间字符串：yyyy-MM-dd HH:mm:ss
 */
function format(datetime) {
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		min = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);

	return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + second;
}

/*
 * 作用：根据类名查找元素
 * @param className 待查找类名
 * @param context 查询上下文
 * @return 查找到的元素的集合
 */
function getElementsByClassName(className, context) {
	context = context || document;
	/* 支持使用 */
	if (context.getElementsByClassName) 
		return context.getElementsByClassName(className);

	/* 
	 * 不支持使用
	 * 算法：查找出所有元素，
	 * 遍历每个元素判断其使用的类名中是否有待查找的类名
	 * 如果在遍历到的元素中有使用待查找的类名，
	 * 则说明遍历到的元素是需要找出的元素其中之一
	 */
	// 存放所有查找到元素的数组变量
	var result = [];
	// 查找出所有元素
	var elements = context.getElementsByTagName("*");
	// 遍历每个元素
	for (var i = 0, len = elements.length; i < len; i++) {
		// 获取当前遍历到元素的所有类名
		var classNames = elements[i].className.split(" ");
		// 判断在所有类名中是否存在待查找的类名
		if (inArray(className, classNames) !== -1) {
			// 存在，则说明当前遍历到的元素是要查找元素其中之一
			result.push(elements[i]);
		}
	}
	// 将所有查找到的元素数组返回
	return result;
}

/*
 * 作用：根据元素的id，类名或标签名查找元素
 * @param selector 选择器字符串 支持#id，.className，  tagName
 * @param context 查找上下文对象，可选参数，默认为 document
 * @return 返回查找到的元素（元素集合）
 */
function $(selector, context) {
	// 如果未传递 context ，默认为 document
	context = context || document;

	if (selector.indexOf("#") === 0) // id选择器
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // 类选择器
		return getElementsByClassName(selector.slice(1), context);
	// 元素选择器
	return context.getElementsByTagName(selector);
}

/*
 * 作用：获取/设置指定元素的指定CSS属性值
 * @param element 元素
 * @param attrName CSS属性名
 * @param attrValue 设置的CSS属性值，可选
 * @return 查找到的CSS属性值
 */
 function css(element, attrName, attrValue) {
 	// reading
 	if (typeof attrName === "string" && typeof attrValue === "undefined")
	 	return window.getComputedStyle 
	 			? getComputedStyle(element)[attrName]
	 			: element.currentStyle[attrName];
	// writing
	if (typeof attrName === "object") {
		for (var prop in attrName) {
			element.style[prop] = attrName[prop];
		}
	} else {
		element.style[attrName] = attrValue;
	}
}
/*function css(element, attrName, attrValue) {
	if (window.getComputedStyle) // 支持使用 getComputedStyle() 
		return getComputedStyle(element)[attrName];
	// IE9之前不支持使用 getComputedStyle() 方法
	return element.currentStyle[attrName];
}*/

function hide(element) {
	css(element, "display", "none");
}

function show(element) {
	css(element, "display", "block");
}

/*
 * 作用：绑定事件
 * @param element 待绑定事件的元素
 * @param type 事件类型
 * @param callbak 事件处理程序
 */
function on(element, type, callback) {	
	if (element.addEventListener) { // 支持 addEventListener() 
		if (type.indexOf("on") === 0) // 以 "on" 开头，则去掉 "on"
			type = type.slice(2);
		element.addEventListener(type, callback, false)
	} else { // 不支持 addEventListener() ，则使用 attachEvent() 方法
		if (type.indexOf("on") !== 0) // 不以 "on" 开头，则添加 "on" 前缀
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}

/*
 * 作用：移除事件
 * @param element 待移除事件的元素
 * @param type 事件类型
 * @param callbak 事件处理程序
 */
function off(element, type, callback) {	
	if (element.removeEventListener) { // 支持 removeEventListener() 
		if (type.indexOf("on") === 0) // 以 "on" 开头，则去掉 "on"
			type = type.slice(2);
		element.removeEventListener(type, callback, false)
	} else { // 不支持 removeEventListener() ，则使用 detachEvent() 方法
		if (type.indexOf("on") !== 0) // 不以 "on" 开头，则添加 "on" 前缀
			type = "on" + type;
		element.detachEvent(type, callback);
	}
}

/*
 * 作用：获取/设置指定元素在文档中的定位坐标
 * @param element 元素
 * @param coordinates 待设置的坐标，对象{top:0, left:0}，可选
 * @return 返回元素在文档中的坐标对象：{top:0, left:0}
 */
function offset(element, coordinates) {
	// 未传递 coordinates 参数，则获取文档中坐标
	if (typeof coordinates === "undefined") {
		var _top = 0,
			_left = 0;
		// 循环累加，计算元素在文档中定位位置值
		while(element !== null) {
			_top += element.offsetTop;
			_left += element.offsetLeft;
			element = element.offsetParent;
		}

		return {
			top : _top,
			left : _left
		};
	}
	
	// 设置元素在文档中坐标
	var _top = 0,
		_left = 0,
		parent = element.offsetParent;
	// 循环累加，计算父元素在文档中定位位置值
	while(parent !== null) {
		_top += parent.offsetTop;
		_left += parent.offsetLeft;
		parent = parent.offsetParent;
	}
	// 使用参数坐标对象属性与计算的父元素坐标相减
	// 设置CSS样式
	css(element, {
		top : coordinates.top - _top + "px",
		left : coordinates.left - _left + "px"
	});
}

/*
 * 解决 event.pageX 与 event.pageY 兼容问题
 * @param e
 * @return 解决兼容问题后所得到光标在文档中定位位置的对象 {x:0, y:0}
 */
function page(e) {
	var _x = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)),
		_y = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop));

	return {
		x : _x,
		y : _y
	}
}

/*
 * 作用：获取/设置 cookie
 * @param key cookie名
 * @param value cookie值
 * @param options 可配置项，是保存cookie时需要设置的可选项 {expires:7, path:"/", domain:"xxxx", secure:true}
 */
function cookie(key, value, options) {
	// reading
	if (typeof value === "undefined") {
		// 获取所有 cookie 的数组
		var cookies = document.cookie.split("; ");
		// 遍历数组中每条 cookie 信息
		for (var i = 0, len = cookies.length; i < len; i++) {
			// 使用 = 将 "key=value" 的字符串结构分割
			var parts = cookies[i].split("=");
			// 第一个 = 号前是 cookie 名
			var name = decodeURIComponent(parts.shift());
			// 根据当前遍历到 cookie 的名字，与参数的cookie比较
			if (name === key) { // 查找到 cookie 值，则返回
				return decodeURIComponent(parts.join("="));
			}
		}
		// 未查找到
		return undefined;
	}

	// writing
	// 未传递 options 则默认为 {}
	options = options || {};
	// 失效时间处理
	if (options.expires)  {
		var date = new Date();
		date.setDate(date.getDate() + options.expires);
		options.expires = date.toUTCString();
	}
	// 串联保存 cookie 的字符串
	var cookie = [
		encodeURIComponent(key),
		"=",
		encodeURIComponent(value),
		options.expires ? ";expires="+options.expires : "",
		options.path ? ";path=" + options.path : "",
		options.domain ? ";domain=" + options.domain : "",
		options.secure ? ";secure" : ""
	].join("");

	// 保存cookie
	document.cookie = cookie;
}

/*
 * 作用：根据cookie名删除cookie，基于 cookie 函数实现功能
 * @param key cookie名
 * @param options 可选配置项
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}

/**
 * 作用：运动框架
 * @param element 待添加运动动画效果的DOM元素
 * @param options 多属性运动时的配置属性
 * @param speed 限定运动动画执行总时间
 * @param fn 运动动画结束后继续执行的函数
 */
function animate(element, options, speed, fn) {
	// 清除element元素上已有的运动效果
	clearInterval(element.timer);
	// 定义变量保存各属性运动初值，运动区间范围值
	var start = {}, range = {};
	for (var attr in options) {
		start[attr] = parseFloat(css(element, attr));
		range[attr] = options[attr] - start[attr];
	}

	// 记录计时器启动的时间
	var startTime = +new Date();
	// 启动计时器，实现运动动画效果
	element.timer = setInterval(function(){
		// 计算运动开销时间
		var elapsed = Math.min(+new Date() - startTime, speed);
		// 为每个运动属性计算当前值
		for (var attr in options) {
			var result = elapsed * range[attr] / speed + start[attr];
			css(element, attr, result + (attr === "opacity" ? "" : "px"));
		}
		// 判断是否停止计时器
		if (elapsed === speed) { // 运动结束
			clearInterval(element.timer);
			// 判断是否有运动结束后执行的函数，有则调用执行
			fn && fn();
		}
	}, 1000/60);
}

/*
 * 淡入
 * @param element 待添加淡入动画效果的DOM元素
 * @param speed 动画时间
 * @param fn 运动动画结束后执行的函数
 */
function fadeIn(element, speed, fn) {
	show(element);
	element.style.opacity = 0;
	animate(element, {opacity:1}, speed, fn);
}

/*
 * 淡出
 * @param element 待添加淡出动画效果的DOM元素
 * @param speed 动画时间
 * @param fn 运动动画结束后执行的函数
 */
function fadeOut(element, speed, fn) {
	animate(element, {opacity:0}, speed, function(){
		hide(element);
		fn && fn();
	});
}