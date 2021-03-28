<?php
function download($url) {
	if(substr($url, 0, 8) == "https://" or substr($url, 0, 7) == "http://")
		return @file_get_contents($url);
	return "E: Invalid Url.";
}

function parse_html($html) {
	$dom = new DOMDocument;
	@$dom->loadHTML($html);
	return $dom;
}

function get_elements_by_class($parent, $class, $tag = "*") {
	$elements = [];
	foreach($parent->getElementsByTagName($tag) as $el) {
		$el_class = $el->getAttribute("class");
		$class_list = preg_split("/\s+/u", $el_class,
					-1, PREG_SPLIT_NO_EMPTY);
		if(in_array($class, $class_list))
			$elements[] = $el;
	}
	return $elements;
}

function get_element_by_class($parent, $class, $tag="*", $i=0) {
	return get_elements_by_class($parent, $class, $tag)[$i];
}

function aparat($url) {
	$result = [];
	
	$html = download($url);
	$dom = parse_html($html);

	$download_dropdown = get_element_by_class($dom, "download-dropdown");
	$qualities = $download_dropdown->getElementsByTagName("li");

	foreach($qualities as $quality) {
		$a = $quality->getElementsByTagName("a")[0];
		$link = $a->getAttribute("href");
		$label = $a->getAttribute("aria-label");
		$label = str_replace("با کیفیت", "", $label);
		$label = trim($label);
		$result[$label] = $link;
	}
	return $result;
}
?>
