var weixin = {
	init:function( ){
	},
	searchPublic:function( request , response ){
		console.log( "searchPublic:"+request );
		var url = "http://weixin.sogou.com/weixin?query=" + encodeURIComponent(request);
		var subPage = require("webpage").create();
		subPage.viewportSize = { width: 800, height: 600 };
		subPage.paperSize = { width: 800 , height: 600, margin: '0px' };
		subPage.onConsoleMessage = function(msg) {
			console.log(msg);
		};
		subPage.open( url , function(status){
			if( status != "success"){
				response({
					code:1,
					message:"open url fail"
				});
			}
			var result = subPage.evaluate(function(){
				var result = [];
				$("._item").each(function(){
					var single = {
						id:encodeURIComponent($(this).attr("href")),
						text:$(this).find('.txt-box h3').text()
					};
					result.push( single );
				});
				return result;
			});
			response({
				code:0,
				message:"",
				data:result
			});
		});
	},
	getPublic:function( request , response ){
		console.log( "getPublic:"+request );
		var url = "http://weixin.sogou.com"+decodeURIComponent(request);
		var subPage = require("webpage").create();
		subPage.viewportSize = { width: 800, height: 600 };
		subPage.paperSize = { width: 800 , height: 600, margin: '0px' };
		subPage.onConsoleMessage = function(msg) {
			console.log(msg);
		};
		subPage.open( url , function(status){
			if( status != "success"){
				response({
					code:1,
					message:"open url fail"
				});
			}
			setTimeout(function(){
				var result = subPage.evaluate(function(){
					var result = {
						img:$(".img-box img").attr("src"),
						title:$(".txt-box h3").text(),
						name:$(".txt-box h4 span").text(),
						introduce:$($(".txt-box .s-p2 .sp-txt")[0]).text(),
						history:[]
					};
					$(".wx-rb3 h4 a").each(function(){
						var single = {
							text:$(this).text(),
							link:$(this).attr("href")
						};
						result.history.push( single );
					});
					return result;
				});
				response({
					code:0,
					message:"",
					data:result
				});
			},1000);
			
		});
	}
};
var network = {
	_server:null,
	init:function( port ){
		this._server = require('webserver').create();
		this._server.listen('127.0.0.1:'+port, function(request, response) {
			var data = JSON.parse( request.postRaw );
			console.log(JSON.stringify(data));
			var fun;
			if( data.fun == "SearchPublic"){
				fun = weixin.searchPublic;
			}else if( data.fun == "GetPublic"){
				fun = weixin.getPublic;
			}else{
				response.statusCode = 404;
				response.close();
				return;
			}
			fun( data.data ,function(result){
				response.statusCode = 200;	
				response.write(JSON.stringify(result));
				response.close();
			});
		});
	}
};
var system = require('system');
if (system.args.length != 2) {
    console.log('Usage: main.js networkport');
    phantom.exit(1);
}
network.init(system.args[1]);
weixin.init();
console.log("init success");
