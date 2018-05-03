<#
.PARAM Build
build the site to public; mutually exclusive with -Server

.PARAM Server
start a development server for sass and hugo; mutually exclusive with -Build

.PARAM Install
Install hugo and sass; windows only

.PARAM NotableExtensions
Extensions to include in should-exist.txt
#>
[CmdletBinding(DefaultParametersetname="Server")]
Param(
	$Hugo="hugo",
	$Sass="sass",
	$SassDir="assets/css",
	$CssDir="static/css",
	$UseDiffArgs=("-d", "--color=always", "--ignore-all-space", "--strip-trailing-cr"),
	$UseDiff="diff.exe", # lol
	$NotableExtensions=('html', 'css', 'js', 'php', 'txt'),
	$ShouldExistFileName="should-exist.txt",
	$ExcludeClean=("chomp", "i-c-the-light", "img", "juniorportfolio", "pdf"),
	[Parameter(ParameterSetName="Install")]
	[Switch]$Install,
	[Parameter(ParameterSetName="Build")]
	[Switch]$Build,
	[Parameter(ParameterSetName="Diagnostic")]
	[Switch]$Diagnostic,
	[Parameter(ParameterSetName="GenerateShouldExist")]
	[Switch]$GenerateShouldExist,
	[Parameter(ParameterSetName="GenerateShouldExist")]
	[Switch]$Overwrite,
	[Parameter(ParameterSetName="DiffShouldExist")]
	[Switch]$DiffShouldExist,
	[Parameter(ParameterSetName="Clean")]
	[Switch]$Clean,
	[Parameter(ParameterSetName="Test")]
	[Switch]$Test
)

$sassDirs = "$SassDir`:$CssDir"
$Watch = If($PSCmdlet.ParameterSetName -eq "Server") {
	"watch"
} Else {
	"update"
}

# keep this in sync with post-merge.sh
$sassArgs = ("--unix-newlines", "--sourcemap=none", "-E", "UTF-8", "--$Watch", $sassDirs)

Switch($PSCmdlet.ParameterSetName) {
	"Install" {
		choco install ruby hugo
		choco install sass --source=ruby
	}
	"Diagnostic" {
		& $Sass $sassArgs
		& $Hugo ("--templateMetrics", "--templateMetricsHints", "--verbose")
	}
	"Build" {
		& $Sass $sassArgs
		& $Hugo --verbose
	}
	"Server" {
		"Starting $Sass $sassArgs"
		Start-Process $Sass $sassArgs -WindowStyle Minimized
		$hugoArgs = ("server", "-D")
		"Starting $Hugo $hugoArgs"
		Start-Process $Hugo $hugoArgs -WindowStyle Minimized
		Start-Process "http://localhost:1313/"
	}
	"GenerateShouldExist" {
		# html, css -> *.html, *.css
		$exts = $NotableExtensions | %{ "*.$_" }

		Push-Location
		Set-Location public

		$len = (Get-Location).ToString().Length + 1

		$shouldExist = Get-ChildItem "*" -Include $exts -Recurse | %{
			$_.FullName.Substring($len) -replace '\\', '/'
		}

		Pop-Location

		$shouldExist | Write-Output

		If($Overwrite) {
			$opath = Join-Path (Get-Location) $ShouldExistFileName
			[IO.File]::WriteAllLines($opath, $shouldExist)
		}
	}
	"DiffShouldExist" {
		./dev.ps1 -GenerateShouldExist | `
		& $UseDiff $ShouldExistFileName - $UseDiffArgs
	}
	"Clean" {
		Get-ChildItem "public" -Exclude $ExcludeClean |
		Remove-Item -Recurse
	}
	"Test" {
		"[INFO] Cleaning"
		./dev.ps1 -Clean
		"[INFO] Building"
		./dev.ps1 -Build
		bash "./check-exists.sh" "./should-exist.txt"
	}
}
