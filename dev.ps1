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
	[Switch]$Install,
	[Switch]$Build,
	[Switch]$Server
)

If($Install) {
	choco install sass -prerelease
	choco install hugo
}

$sassDirs = "$SassDir`:$CssDir"

If($Build) {
	& $Sass --update $sassDirs
	& $Hugo
} Else If($Server) {
	Start-Process $Sass ("--sourcemap=none", "--watch", $sassDirs)
	Start-Process $Hugo ("server", "-D")
}
