<?
$characters = "abcdefghijklmnopqrstuvwxyz0123456789";
$q = "";
for ($i = 0; $i < 3; $i++) {
      $q .= $characters[rand(0,35)];
 }
 $url = "";
 $result = [];
while(!array_key_exists("items",$result))
{
$url = "https://www.googleapis.com/customsearch/v1?q=" . $q . "&orTerms=diagram&excludeTerms=face&num=10&imgColorType=color&imgSize=large&safe=medium&searchType=image&num=1&start=" . rand(1,10) . "&cx=001160323968712172301:0olfm7hjyck&key=AIzaSyC2C6KXdxiffRSqjvhfcSRQRaWnc9WeajQ";
$result = json_decode(file_get_contents($url));
}
//echo $result->items[0]->link;
$images = fopen("images","a");
$write = "";
foreach($result->items as $img)
{
//echo $img->link;
if(!array_key_exists("link",$img))
{
echo "key doesn't exist";
break;
}
if(substr($img->link,0,7) == "x-image")
{
echo "x-image";
continue;
}
$write .= $img->link . "\r\n";
}
// echo $write;
fwrite($images,$write);
?>