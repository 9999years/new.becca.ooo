<?
function error()
{
}
//set_error_handler("error");
$allowedExts = array(
	"jpg",
	"jpeg",
	"gif",
	"png",
	"tiff",
	"bmp",
	"raw",
	"tga",
	"img"
);
$filename    = "";
$extension   = "";
$output      = "";
// echo $_FILES["file"]["tmp_name"];
function extension($file)
{
	// $file_info = new finfo(FILEINFO_MIME);  // object oriented approach!
	// return strstr($file_info->buffer(file_get_contents($file)),";",true);  // e.g. gives "image/jpeg"
	// return $file_info->buffer(file_get_contents($file));  // e.g. gives "image/jpeg"
	$extensions = [
		1=>"gif",
		2=>"jpeg",
		3=>"png",
		6=>"bmp",
		7=>"tiff",
		8=>"tiff",
		14=>"iff",
		15=>"wbmp",
		16=>"xbm",
	];
	return $extensions[exif_imagetype($file)];
}
function extFileSize($url){
     $ch = curl_init($url);

     curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
     curl_setopt($ch, CURLOPT_HEADER, TRUE);
     curl_setopt($ch, CURLOPT_NOBODY, TRUE);

     $data = curl_exec($ch);
     $size = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);

     curl_close($ch);
     return $size;
}


if(!empty($_FILES["file"]["tmp_name"]))
{
	//file upload
	$extension = substr(strrchr($_FILES["file"]["name"], "."), 1);
	if(($_FILES["file"]["size"]<10485760) && in_array($extension, $allowedExts))
	{
		$filename = "tmpimg/" . substr($_FILES["file"]["name"], 0, strrpos($_FILES["file"]["name"], ".")) . "-" . hash_file("md5", $_FILES["file"]["tmp_name"]) . "." . $extension;
		if($_FILES["file"]["error"]>0)
		{
			echo "ERROR: " . $_FILES["file"]["error"];
		}
		else
		{
			if(!file_exists($filename))
			{
				move_uploaded_file($_FILES["file"]["tmp_name"], $filename);
			}
			$output = $_FILES["file"]["type"] . ';base64,' . base64_encode(file_get_contents($filename));
		}
	}
}
else if(!empty($_GET))
{
	//get var
	if(!empty($_GET["f"]))
	{
		//filename link
		$filename  = "tmpimg/" . $_GET["f"];
		$extension = filetype($filename);
		$output    = "image/" . $extension . ';base64,' . base64_encode(file_get_contents($filename));
	}
	else
	{
		//random img
		ob_start();
		$extURL = "";
		include('randimg/getimg.php');
		$extURL = ob_get_contents();
		ob_end_clean();
		$extension = extension($extURL);
		$name      = substr(strrchr($extURL, "/"), 1);
		$filename  = "tmpimg/" . substr($name, 0, strrpos($name, ".")) . "-" . hash_file("md5", $extURL) . "." . $extension;
		if(!file_exists($filename) && in_array($extension, $allowedExts))
		{
			file_put_contents($filename, file_get_contents($extURL));
		}
		$output = "image/" . $extension . ';base64,' . base64_encode(file_get_contents($filename));
	}
}
else if(!empty($_POST))
{
	//url upload (post)
	// echo $_POST["url"];
	$extension = extension($_POST["url"]);
	if((extFileSize($_POST["url"])<10485760) && in_array($extension, $allowedExts))
	{
		$filename = "tmpimg/" . substr(strrchr($_POST["url"], "/"),1,strrpos(strrchr($_POST["url"], "/"), ".")-1) . "-" . hash_file("md5",$_POST["url"]) . "." . $extension;
		if(!file_exists($filename))
		{	
			copy($_POST["url"],$filename);
			// move_uploaded_file($_POST["url"], $filename);
		}
		$output = "image/" . $extension . ';base64,' . base64_encode(file_get_contents($filename));
	}
}
else
{
	//nothing
	$filename = "tmpimg/default.png";
	$output   = 'image/jpg;base64,' . base64_encode(file_get_contents($filename));
}

$output = "data:" . $output . "\"" . substr($filename, 7);
echo $output;
?>