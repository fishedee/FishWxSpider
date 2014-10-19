<?php
	$public_history_url = $_GET["data"];
	//将历史消息url利用phantomjs转换为跳转后的url
	$public_history_newurl = exec("curl 127.0.0.1:8787 -d \"$public_history_url\"");
	$public_history_newurl = json_decode($public_history_newurl);
	//提取跳转后url的关键参数，构造批量获取历史消息数据的url
	$paraUrl = explode('?',$public_history_newurl);
	$para = $paraUrl[1];
	$paraList = explode('&',$para);
	var_dump($paraList);
	exit();
	$paraMap = array();
	foreach( $paraList as $paraSingle ){
		$paraMap[ substr($paraSingle,0,strpos($paraSingle,"=")) ] =
			substr($paraSingle,strpos($paraSingle,"=")+1);
	}
	$messageListUrl = "http://mp.weixin.qq.com/mp/getmasssendmsg?".
		"__biz=".$paraMap["__biz"].
		"&uin=".$paraMap["uin"].
		"&key=".$paraMap["key"].
		"&f=json&count=10";
	//拉取数据
	//FIXME 这里好的做法是用php的curl库将数据拉下来存放到数据库的，我直接Location让浏览器拉取了
	header("Location: ".$messageListUrl);
?>
