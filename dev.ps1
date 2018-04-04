[CmdletBinding()]
Param(
	$Hugo="hugo",
	$Sass="sass",
	$SassDir="assets/css",
	$CssDir="static/css",
	[Switch]$Install,
	[Switch]$NoBuild,
	[Switch]$Server
)

If($Install) {
	choco install sass -prerelease
	choco install hugo
}

$sassDirs = "$SassDir`:$CssDir"

If(!$NoBuild) {
	& $Sass --update $sassDirs
	& $Hugo
}

If($Server) {
	Start-Process $Sass ("--watch", $sassDirs)
	Start-Process $Hugo ("server", "-D")
}
