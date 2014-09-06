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
			}
			.title{
				width:800px;
				height:600px;
				line-height:600px;
				font-size:20px;
				text-align:center;
			}
			.next{
				position:absolute;
				bottom:0px;
				left:0px;
				right:0px;
				width:100px;
				height:30px;
				line-height:30px;
				text-align:center;
				
				margin:0 auto;
				background:blue;
				color:white;
			}
		</style>
		<script src="jquery.js"></script>
		<script>
			$(document).ready(function(){
				$(".next").click(function(){
					location.href = "stepone.php";
				});
			});
		</script>
	</head>
	<body>
		<div class="full">
			<div class="title">
				微信公众号历史消息抓取demo
			</div>
			<div class="next">
				开始
			</div>
		</div>
	</body>
</html>