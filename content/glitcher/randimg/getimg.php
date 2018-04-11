<?
/*
custom search api key: AIzaSyC2C6KXdxiffRSqjvhfcSRQRaWnc9WeajQ
engine id: 001160323968712172301:0olfm7hjyck

q = string (search)
imgColorType=color&imgSize=large&safe=medium&searchType=image&num=1&start= (random)
&cx=001160323968712172301:0olfm7hjyck&key=AIzaSyC2C6KXdxiffRSqjvhfcSRQRaWnc9WeajQ
*/
$ipFileAddr = dirname(__FILE__) . "/users/" . $_SERVER['REMOTE_ADDR'];
$currentImage = 0;
if(file_exists($ipFileAddr))
{
$currentImage = file_get_contents($ipFileAddr);
}
fwrite(fopen($ipFileAddr,"w"), $currentImage + 1);

$images = explode("\n",file_get_contents(dirname(__FILE__)."/images"));
$rounds = ceil(($currentImage-sizeOf($images))/10);
ob_start();
for($j = 0; $j < $rounds; $j++){
include('addbatch.php');
}
if(!array_key_exists($currentImage,$images) || $images[$currentImage] == "")
{
include('addbatch.php');
}
ob_end_clean();
$images = explode("\n",file_get_contents(dirname(__FILE__)."/images"));

// var_dump($images);
// echo $currentImage . ", " . sizeOf($images) . ", " . $rounds . ", " . $_SERVER['REMOTE_ADDR'] . ",\r\n ";
echo preg_replace( '/[^[:print:]]/', '',$images[$currentImage]);
?>