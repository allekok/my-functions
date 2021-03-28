<?php
function download($url) {
	if(substr($url, 0, 8) == "https://" or substr($url, 0, 7) == "http://")
		return @file_get_contents($url);
	return "E: Invalid Url.";
}
?>
