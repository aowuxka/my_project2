"use strict";$(function(){for(var e=$(".slide"),t=$(".slide_list li"),i=$(".prev"),s=$(".next"),a=$(".points"),n=t.length,l=0;l<n;l++){var c=$("<li>");0==l&&c.addClass("active"),a.append(c)}t.not(":first").css({left:760});var o=0,v=0;a.delegate("li","click",function(){$(this).addClass("active"),$(this).siblings().removeClass("active"),o=$(this).index(),u()});var f=!1;function r(){o++,u(),$(".points li").eq(o).addClass("active").siblings().removeClass("active")}i.click(function(){f||(f=!0,o--,u(),$(".points li").eq(o).addClass("active").siblings().removeClass("active"))}),s.click(function(){f||(f=!0,o++,u(),$(".points li").eq(o).addClass("active").siblings().removeClass("active"))});var d=setInterval(r,2e3);function u(){return o>n-1?(o=0,v=n-1,t.eq(o).css({left:760}),t.eq(v).animate({left:-760}),t.eq(o).animate({left:0},function(){f=!1}),void(v=o)):o<0?(o=n-1,v=0,t.eq(o).css({left:-760}),t.eq(v).animate({left:760}),t.eq(o).animate({left:0},function(){f=!1}),void(v=o)):(o>v&&(t.eq(o).css({left:760}),t.eq(v).animate({left:-760})),o<v&&(t.eq(o).css({left:-760}),t.eq(v).animate({left:760})),t.eq(o).animate({left:0},function(){f=!1}),void(v=o))}e.mouseenter(function(){clearInterval(d)}),e.mouseleave(function(){d=setInterval(r,2e3)})});