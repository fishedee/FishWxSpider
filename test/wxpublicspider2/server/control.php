<?php
	function invokePhantomjs($input){
		$input = json_encode($input);
		$input = str_replace("\"","\\\"",$input);
		$cmd = "curl localhost:8787 -d \"$input\"";
		$output = exec($cmd);
		$output = json_decode($output);
		return $output;
	}
	function main(){
		if( $_GET['fun'] == "SearchPublic" )
			return SearchPublic();
		else if( $_GET['fun'] == "GetPublic" )
			return GetPublic();
		else
			return array(
				"code"=>1,
				"message"=>"ЮДжЊЕФfun"
			);
	}
	function SearchPublic(){
		$searchword = array(
			"fun"=>"SearchPublic",
			"data"=>$_GET['data']
		);
		$searchresult = invokePhantomjs($searchword);
		return $searchresult;
	}
	function GetPublic(){
		$searchword = array(
			"fun"=>"GetPublic",
			"data"=>$_GET['data']
		);
		$searchresult = invokePhantomjs($searchword);
		return $searchresult;
	}
	
	$result = main();
	echo json_encode($result);
?>