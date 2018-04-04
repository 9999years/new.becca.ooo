[CmdletBinding()]
Param(
	$Hugo="hugo",
	$Sass="sass",
	$SassDir="assets/css",
	$CssDir="static/css",
	[Switch]$Build,
	[Switch]$Server
)

$sassDirs = "$SassDir`:$CssDir"

If($Build) {
	& $Sass --update $sassDirs
	& $Hugo
}

If($Server) {
	Start-Process $Sass ("--watch", $sassDirs)
	Start-Process $Hugo ("server", "-D")
}
