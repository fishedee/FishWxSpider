var weixin = {
	_mainPage:null,
	_mainPageArgv:{},
	_getResource:function( res ){
		//只截取start封包
		if( res.stage != 'start')
			return;
		//只截取status为200的封包
		if( res.status != '200' )
			return;
		//只截取包含微信数据的封包
		var urlTest = (/^https:\/\/webpush2.weixin.qq.com\/cgi-bin\/mmwebwx-bin\/synccheck.*$/);
		if( urlTest.test(res.url) == false )
			return;
		//解析url
		var url = res.url;
		var parastr = url.split("?")[1];
		var paralist = parastr.split("&");
		var paramap = {};
		for( var j = 0 ; j != paralist.length ; ++j ){
			paramap[paralist[j].split("=")[0]] = paralist[j].split("=")[1];
		}
		this._mainPageArgv = paramap;
	},
	init:function( ){
		var self = this;
		this._mainPage = require('webpage').create();
		//设置截图
		this._mainPage.viewportSize = { width: 800, height: 600 };
		this._mainPage.paperSize = { width: 800 , height: 600, margin: '0px' };
		this._mainPage.open("https://wx.qq.com");
		setInterval(function(){
			self._mainPage.render("preview.jpg");	
		},1000);
		//设置抓包
		this._mainPage.onResourceReceived = function(res){
			self._getResource(res);
		};
	},
	getRealUrl:function( request , response ){
		system.stdout.writeLine("request:"+request+";mainArgv:"+JSON.stringify(this._mainPageArgv));
		var publicInfo = request;
		var publicUrl = "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxcheckurl?" +
			"uin="+this._mainPageArgv.uin+
			"&sid="+this._mainPageArgv.sid+
			"&skey="+this._mainPageArgv.skey+
			"&deviceid="+this._mainPageArgv.deviceid+
			"&opcode=2"+
			"&requrl="+encodeURIComponent(publicInfo)+
			"&scene=1";
		system.stdout.writeLine("url1:"+publicUrl);
		var subPage = require('webpage').create();
		subPage.viewportSize = { width: 800, height: 600 };
		subPage.paperSize = { width: 800 , height: 600, margin: '0px' };
		var interval = setInterval(function(){
			subPage.render("preview2.jpg");
		},1000);
		subPage.open(publicUrl,function(){
			system.stdout.writeLine("response:"+subPage.url);
			response( subPage.url );
			clearInterval(interval);
			subPage.close();
		});
		
	}
};
var network = {
	_server:null,
	init:function( port ){
		this._server = require('webserver').create();
		this._server.listen('127.0.0.1:'+port, function(request, response) {
			weixin.getRealUrl(request.postRaw,function(result){
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