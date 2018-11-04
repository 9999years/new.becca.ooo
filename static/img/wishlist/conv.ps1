<#
.PARAM NewSize

From https://www.imagemagick.org/script/command-line-processing.php#geometry

size               General description (actual behavior can vary for different
                                        options and settings)
------------------------------------------------------------------------------
scale%             Height and width both scaled by specified percentage.
scale-x%xscale-y%  Height and width individually scaled by specified
                   percentages. (Only one % symbol needed.)
width              Width given, height automagically selected to preserve
                   aspect ratio.
xheight            Height given, width automagically selected to preserve
                   aspect ratio.
widthxheight       Maximum values of height and width given, aspect ratio
                   preserved.
widthxheight^      Minimum values of width and height given, aspect ratio
                   preserved.
widthxheight!      Width and height emphatically given, original aspect ratio
                   ignored.
widthxheight>      Shrinks an image with dimension(s) larger than the
                   corresponding width and/or height argument(s).
widthxheight<      Enlarges an image with dimension(s) smaller than the
                   corresponding width and/or height argument(s).
area@              Resize image to have specified area in pixels. Aspect ratio
                   is preserved.
x:y~               Here x and y denotes an aspect ratio (e.g. 3:2 = 1.5).
{size}{offset}     Specifying the offset (default is +0+0). Below, {size}
                   refers to any of the forms above.
{size}{+-}x{+-}y   Horizontal and vertical offsets x and y, specified in
                   pixels. Signs are required for both. Offsets are affected by
                   ‑gravity setting.  Offsets are not affected by % or other
                   size operators.
.PARAM ImageName
The full name of the image, including extension
#>
Param (
	[Parameter(ValueFromPipeline=$True,
		Mandatory=$True)]
	[String]$ImageName,
	[Int]$Width=250,
	[Double[]]$OutputScales=(1, 2, 3),
	[String]$NewSize="250x250>",
	[int]$BorderWidth=20,
	[Switch]$PreserveOriginal
)

Begin {
	function NewSize {
		[CmdletBinding()]
		Param(
			[Parameter(ValueFromPipeline=$True)]
			$Size
		)
	
		Process {
			return "$($Size)x$($Size)>"
		}
	}

	function TopLeftColor {
		[CmdletBinding()]
		Param(
			[Parameter(ValueFromPipeline=$True)]
			$Name
		)
	
		Process {
			 return magick convert $Name -format '%[pixel:p{0,0}]' info:-
		}
	}
}

Process {
	"Resizing $ImageName"

	$base = Get-ChildItem $ImageName
	If($base.Length -eq 0) {
		throw "$ImageName not found!"
	} else {
		$directory = $base[0].Directory
		$base = $base[0].BaseName
	}
	
	$success = $True
	$OutputScales | %{
		$scale = $_
		"`t${scale}x"
		$borderColor = TopLeftColor $ImageName
		If($borderColor.Length -eq 0) {
			throw "Empty color!"
		}
		$size = NewSize ($Width * $scale)
		$outName = "$directory/$base-${scale}x.jpg"
		magick convert -trim -border ($BorderWidth * $scale) `
			-bordercolor $borderColor `
			-resize $size $ImageName $outName
		$success = $success -and (Test-Path $outName)
		If(!$success) {
			throw "Converting $ImageName at $($scale)x failed!"
		}
	}

	If($success -and !$PreserveOriginal) {
		Remove-Item $ImageName
	}
}
