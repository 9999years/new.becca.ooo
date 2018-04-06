<#
.PARAM Build
build the site to public; mutually exclusive with -Server

.PARAM Server
start a development server for sass and hugo; mutually exclusive with -Build

.PARAM Install
Install hugo and sass; windows only
#>
[CmdletBinding()]
Param(
	$Hugo="hugo",
	$Sass="sass",
	$SassDir="assets/css",
	$CssDir="static/css",
	[Parameter(ParameterSetName="Install")]
	[Switch]$Install,
	[Parameter(ParameterSetName="Build")]
	[Switch]$Build,
	[Parameter(ParameterSetName="Server")]
	[Switch]$Server,
	[Parameter(ParameterSetName="Diagnostic")]
	[Switch]$Diagnostic
)

$sassDirs = "$SassDir`:$CssDir"
$Watch = If($Server) {
	"watch"
} Else {
	"update"
}
$sassArgs = ("--unix-newlines", "--sourcemap=none", "--$Watch", $sassDirs)

Switch($PSCmdlet.ParameterSetName) {
	"Install" {
		choco install sass -prerelease
		choco install hugo
	}
	"Diagnostic" {
		& $Sass $sassArgs
		& $Hugo ("--templateMetrics", "--templateMetricsHints", "--verbose")
	}
	"Build" {
		sh "./post-merge.sh"
	}
	"Server" {
		Start-Process $Sass $sassArgs
		Start-Process $Hugo ("server", "-D")
	}
}
