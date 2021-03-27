<?php
function download($url) {
	$proto = mb_substr($url, 0, );
	if(mb_substr($url, 0, 8) == "https://" or
		mb_substr($url, 0, 7) == "http://")
	{
		return @file_get_contents($url);
	}
	return "E: Invalid Url.";
}
?>
