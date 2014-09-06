<?php
	@unlink(dirname(__FILE__).'/preview.jpg');
	@unlink(dirname(__FILE__).'/preview2.jpg');
	exec('pkill phantomjs');
	$goCmd = ' cd '.dirname(__FILE__).' && sh run.sh > /dev/null &';
	exec($goCmd);
?>
<!DOCTYPE>
<html>
	<head>
		<meta charset="utf8"/>
		<title>微信公众号历史消息抓取实例</title>
		<style>
			.full{
				position:absolute;
				left:0px;
				right:0px;
				top:0px;
				bottom:0px;
				
				width:800px;
				height:600px;
				margin:auto auto;
				border:1px solid black;
				
				background:url(preview.jpg);
			}
			.title{
				position:absolute;
				bottom:0px;
				left:0px;
				
				height:30px;
				line-height:30px;
				
				background:blue;
				color:white;
			}
			.next{
				position:absolute;
				bottom:0px;
				right:0px;
				width:100px;
				height:30px;
				line-height:30px;
				text-align:center;
				
				background:blue;
				color:white;
			}
		</style>
		<script src="jquery.js"></script>
		<script>
			$(document).ready(function(){
				$(".next").click(function(){
					location.href = "steptwo.php";
				});
				setInterval(function(){
					$(".full").css("background","url(preview.jpg?tag="+Math.random()+")");
				},1000);
			});
		</script>
	</head>
	<body>
		<div class="full">
			<div class="title">
				拿出手机扫描图片中的二维码
			</div>
			<div class="next">
				下一步
			</div>
		</div>
	</body>
</html>
