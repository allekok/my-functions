<?php
/* Globals */
require("my-library.php");
$my_library_function_names = list_function_names(my_library_functions);
const REQ_KEYWORD = "request";

/* Request Retrival and Validation */
$request = @trim($_REQUEST[REQ_KEYWORD]);
if(!$request) die(json_encode("E: Empty Request."));
$request = json($request);
if(!$request) die(json_encode("E: Invalid JSON."));

/* Print The Result */
$result = run($request);
header("Content-type: application/json; charset=utf-8");
die(json_encode($result));

/* Functions */
function json($str) {
	$arr = json_decode($str, TRUE);
	return json_last_error() == JSON_ERROR_NONE ?
	       $arr :
	       FALSE;
}
function list_function_names($arr) {
	$list = [];
	foreach($arr as $o) {
		$match = [];
		preg_match("/^(.+)\s*\(/u", $o, $match);
		if($match[1]) $list[$match[1]] = TRUE;
	}
	return $list;
}
function run($arr) {
	global $my_library_function_names;
	$func = $arr["func"];
	$arg = $arr["arg"];
	if($func && $arg && is_string($func) && $my_library_function_names[$func])
		return $func($arg);
	return "E: Invalid Request Object.";
}
?>
