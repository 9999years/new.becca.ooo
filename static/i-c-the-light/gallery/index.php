<!DOCTYPE html>
<!--
url format is /page_number,images_per_page
try not to kill my server please
-->
<meta charset="utf-8">
<title>gallery: i c the light</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="icon" href="/icon-32.png" sizes="32x32" type="image/png">
<link rel="icon" href="/icon-196.png" sizes="any" type="image/png">
<style>
html, body {
	font-family: "Segoe UI", "San Francisco", "Geneva", "Helvetica", sans-serif;
	color: #222;
	font-size: 18px;
}

h1, h2, h3, h4, h5, h6 {
	margin: 2em 0 1em 0;
}

h1 {
	font-size: 28px;
}

h2 {
	font-size: 18px;
}

p {
	margin: 0 0 1em 0;
}

a, a:visited {
	color: #44a;
	text-decoration: none;
	position: relative;
	text-decoration: none;
	background-image: linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(68, 68, 258 ,0.8) 50%);
	background-repeat: repeat-x;
	background-size: 2px 0.1em;
	background-position: 0 1.15em;
}

a:hover {
	color: #b26;
	background-image: linear-gradient(to bottom,rgba(0,0,0,0) 50%,rgba(187,34,102,0.8) 50%);
}

img {
	max-width: 100%;
}

#container {
	margin: 50px auto;
	max-width: 800px;
	text-align: center;
}

.image {
	display: inline-block;
	margin: 15px;
}

.links a, .links .page {
	margin-left: 1em;
}
</style>
<div id="container">
	<div id="content">
		<h1>various images produced by <a href="../">i c the light</a></h1>
		<p>guarenteed to be different but not dissimilar, showcasing a wide variety of graphical defects and algorithmic mistakes
<?
//ini_set("display_errors", 1);
function clamp($in, $min, $max) {
	return max($min, min($max, $in));
}

function sup($num) {
	$str = number_format($num);
	return strstr($str, "0123456789", "⁰¹²³⁴⁵⁶⁷⁸⁹");
}

function sub($num) {
	$str = number_format($num);
	return strstr($str, "0123456789", "₀₁₂₃₄₅₆₇₈₉");
}

$images = scandir("../output/", $sorting_order = SCANDIR_SORT_DESCENDING);
$page = array_key_exists("p", $_GET) ? $_GET["p"] : 1;
$ppdefault = 50;
$per_page = array_key_exists("per_page", $_GET) ? $_GET["per_page"] != "" ?$_GET["per_page"] : $ppdefault : $ppdefault;
$last_page = floor(count($images) / $per_page);
$page = clamp($page, 1, $last_page);

$links = "<div class=\"links\">";
$link_suffix = $per_page != $ppdefault ? "," . $per_page : "";
if($page < $last_page) {
	if($page != $last_page) {
		$links .= "<a href=\"" . $last_page . $link_suffix . "\">⇐ last</a>";
	}
	$links .= "<a href=\"" . ($page + 1) . $link_suffix . "\">← earlier</a>";
}
$links .= "<span class=\"page\">《<sup>" . $page . "</sup>⁄<sub>" . $last_page . "</sub>》</span>";
if($page > 1) {
	$links .= "<a href=\"" . ($page - 1) . $link_suffix . "\">sooner →</a>";
	if($page != 1) {
		$links .= "<a href=\"./" . $link_suffix . "\">first ⇒</a>";
	}
}

$links .= "</div>";

echo $links;

$page -= 1;
$images = array_slice($images, $page * $per_page, $per_page);
foreach($images as $image) {
	if($image[0] == "." || $image == "bounce.dir" || $image == "hash") continue;
	echo "<div class=\"image\"><img src=\"../output/" . $image . "\"/></div>\n";
}

echo $links;
?>
		</div>
	</div>
</div>
