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
			.input{
				position:absolute;
				left:0px;
				right:0px;
				top:0px;
				bottom:0px;
				
				width:500px;
				height:50px;
				margin:auto auto;
				
				line-height:50px;
				
				font-size:20px;
				text-align:center;
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
					location.href = "result.php?data="+encodeURIComponent($(".input").val());
				});
			});
		</script>
	</head>
	<body>
		<div class="full">
			<input class="input" type="text" >
			</input>
			<div class="title">
				将想要抓取的公众号链接复制到上面
			</div>
			<div class="next">
				下一步
			</div>
		</div>
	</body>
</html>