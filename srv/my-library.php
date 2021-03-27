<?php
function download($url) {
	if(mb_substr($url, 0, 8) == "https://" or
		mb_substr($url, 0, 7) == "http://")
	{
		return @file_get_contents($url);
	}
	return "E: Invalid Url.";
}
?>
