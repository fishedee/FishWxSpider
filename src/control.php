<?php
function restart(){
	@unlink(dirname(__FILE__).'/preview.jpg');
	@unlink(dirname(__FILE__).'/msg.txt');
	exec('pkill phantomjs');
	$goCmd = ' cd '.dirname(__FILE__).' && ./phantomjs/bin/phantomjs main.js https://wx.qq.com > msg.txt &';
	exec($goCmd);
	return array(
		"retCode"=>0,
		"retMsg"=>"",
		"data"=>$goCmd
	);
}
function msg(){
	$data = file_get_contents('msg.txt');
	return array(
		"retCode"=>0,
		"retMsg"=>"",
		"data"=>$data
	);
}
function go(){
	if( isset($_GET['fun']) == false ){
		return array(
			"retCode"=>1,
			"retMsg"=>"缺少fun参数"
		);
	}
	$fun = $_GET['fun'];
	return $fun();
}
$result = go();
echo json_encode( $result , false );
?>
