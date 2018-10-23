flavors = [
	"Certified!™",
	'Now with <a href="mailto://becca@becca.ooo">Electronic Mail!</a>',
	"better than ever!",
	"now on-line!",
	"now made with real pixels!",
	"now in hi-res!™",
	"Excellent",
	"!!!!!!!!!",
	"she/her",
	"professional amateur",
	"new markup, same great taste!",
	"now with 20% less hypertext per page!",
	"welcome to my web page",
	"<code>bcrypt()</code>ed",
	"becca: oobject oriented",
	//"woof!",
	"like bad, but worse",
	"i’m doing very well these ways",
	"the official mascot of pbkdf2!",
	"the official mascot of sha256!",
	"i put a lot of stickers on my laptop, please ask me about them",
	"bad gardener but trying my best",
	"notable shoes-with-toes hater",
	"#00ffaa fan",
	"home of Dirt",
	"ask me about vim!",
	"ask me about my business cards!",
	"that’s the stuff!",
	"flavorful!",
	"[[ɹə̆ˈbɛˌkʰə]]",
	"brutalist architecture liker",
	"live and die by the command line",
	"workers of the world, unite!",
	"mood lighting aficionado",
	"extended becca-naur form",
	"ebnf lover",
	//"vim is good actually",
	//"vim is bad actually",
	//"look ma, i’m on the web!",
]

let $ = id => document.getElementById(id)

let arr_rand = arr => arr[Math.floor(Math.random() * arr.length)]

let flavor = () => $("flavor").innerHTML = arr_rand(flavors)

document.addEventListener('DOMContentLoaded', flavor, false)
