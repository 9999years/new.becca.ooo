<!doctype html>
<!--
Colors: 		Colors of Rio by rockstarflu on kuler
				http://kuler.adobe.com/#themeID/1785951
CSS Framework:	1140px 12 column CSS grid
				http://cssgrid.net/
Zip icon:		Modified from Boolean Icons set
				http://prax-08.deviantart.com/art/Boolean-1-1-166457851
-->
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Bathtub</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<!-- 1140px Grid styles for IE -->
	<!--[if lte IE 9]><link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" /><![endif]-->
	<!-- The 1140px Grid - http://cssgrid.net/ -->
	<link rel="stylesheet" href="../Resources/css/1140.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="../Resources/css/styles.css" type="text/css" media="screen" />
	<style type="text/css">
	h2 input{
	font-size:37px;
	font-weight:bold;
	width:300px;
	border:5px solid #E3E3E3;
	padding:10px;
	padding-top:8px;
	}
	h2{
	font-size:37px;
	}
	.output{
	font-size: 20px;
	display:table-row;
	}
	</style>
	<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
	<script type="text/javascript" src="Resources/js/css3-mediaqueries.js"></script>
	<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29541720-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</head>
<body>
<div class="container header">
<div class="row">
<div class="twelvecol last">
To Fill a Bathtub
</div>
</div>
</div>
<div class="container bodycopy">
<div class="row">
<div class="twelvecol last">
<br>
<h2 class="tcenter"><form>How much would it cost to fill a bathtub with <input type="text" name="item" <?php if($_GET['item']){echo 'value="'.$_GET['item'].'"';} ?>>?</form></h2><br>
<?php
if(!$_GET['item'])
{
exit();
}
$items = json_decode(file_get_contents('https://www.googleapis.com/shopping/search/v1/public/products?key=AIzaSyDb7BnEr14VmSpRsTX4O1b_elzRQyxJIz4&country=US&q='.urlencode($_GET['item']).'&alt=json'));
$i = 0;
if($_GET["try"])
{
$i = $_GET["try"];
}
while($matches == NULL){
if($i>50)
{
echo "Sorry, ".$_GET["item"]." is not supported at this time.";
exit();
}
preg_match("/[0-9]{0,3}( |-)?(oz|ounce|fl oz|fluid ounce)/i",$items->items[$i]->product->title,$matches);
$i++;
}
$i--;
preg_match("/[0-9]+/i",$matches[0],$matches);
$ounces = $matches[0];
$matches == NULL;
preg_match("/([0-9]+( |-)?(ct|count|\/|case|x|pk|pack))|((pack of|case of|case)( |-)?[0-9]+)/i",$items->items[$i]->product->title,$matches);
if($matches != NULL)
{
preg_match("/[0-9]+/i",$matches[0],$matches);
$ounces = $ounces * $matches[0];
}
$gallons = $ounces/128;
if($gallons == 0)
{
echo "Sorry, ".$_GET["item"]." is not supported at this time.";
exit();
}
$quantity = 40/$gallons;
$price = $quantity*($items->items[$i]->product->inventories[0]->price);
$price = floor($price);
echo '<a href="'.$items->items[$i]->product->link.'"><div class="output"><img src="'.$items->items[$i]->product->images[0]->link.'" style="height:100px; float:left; margin-right:20px;"><h2 style="display:inline;">$'.$price.' ($'.floor(($quantity*$items->items[$i]->product->inventories[0]->shipping)+$price).' with shipping)</h2><br>'.$items->items[$i]->product->title.'<p></div></a><a href="index.php?item='.$_GET["item"].'&try='.($i+1).'">Not what you wanted?</a>';
?>
</div>
</div>
</body>
</html>
