var page = require('webpage').create(),
    system = require('system'),
    address;
var system = require('system');
function getShowString( m ){
	var result = "";
	for( var i = 0 ; i != m.length ; ++i ){
		result = result + m.charCodeAt(i) + ",";
	}
	result += m.length;
	return result;
}
if (system.args.length === 1) {
    console.log('Usage: netlog.js <some URL>');
    phantom.exit(1);
} else {
    address = system.args[1];
	page.viewportSize = { width: 800, height: 600 };
	page.paperSize = { width: 800 , height: 600, margin: '0px' }

	/*
    page.onResourceReceived = function (res) {
		//只截取start封包
		if( res.stage != 'start')
			return;
		//只截取status为200的封包
		if( res.status != '200' )
			return;
		//只截取包含微信数据的封包
		var urlTest = (/^https:\/\/wx2\.qq\.com\/cgi-bin\/mmwebwx-bin\/webwxsync.*$/);
		if( urlTest.test(res.url) == false )
			return;
		//数据解析并打印出来
		var data = JSON.parse(res.data);
		if( data.BaseResponse.Ret != 0 )
			return;	
		for( var i = 0 ; i != data.AddMsgList.length ; ++i ){
			var msg = data.AddMsgList[i];
			if( msg.Content.length > 1024 )
				continue;
			if( msg.MsgType != 1 )
				continue;
			system.stdout.writeLine(
				'msgId: ' + msg.MsgId +
				' FromUserName: ' + msg.FromUserName + 
				' ToUserName: ' + msg.ToUserName + 
				' Content: ' + msg.Content +
				'<br/>');
		}
    };
	*/
    page.open(address);
	function test(){
		page.render("preview.jpg");	
		setTimeout( test , 1000 );
	}
	setTimeout(test,1000);
}
