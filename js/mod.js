let modInfo = {
	name: "乐子树",
	id: "mymod",
	author: "屑见手青",
	pointsName: "乐子",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "1.0.0",
	name: "Literally nothing",
}

let changelog = `<h1>更新日志:</h1><br>
	<h3>v1.0.0</h3><br>
		增加C节点<br>
		增加K节点<br>
	<h3>v0.0.2</h3><br>
		增加S节点<br>
		增加D节点<br>
		增加J节点<br>
		增加XA,XB,XC节点<br>
	<h3>v0.0.1</h3><br>
		增加N节点<br>
		增加X节点<br>
		增加H节点<br>`

let winText = `恭喜！你 >暂时< 通关了！`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let eff = new Decimal(1)
	if(hasUpgrade("h",12)){eff=eff.mul(upgradeEffect("h",12))}
	if(hasUpgrade("h",11)){eff=eff.mul(2)}
	if(hasUpgrade("h",13)){eff=eff.mul(upgradeEffect("h",13))}
	if(hasUpgrade("h",15)){eff=eff.pow(1.2)}
	if(hasUpgrade("h",17)){eff=eff.pow(1.3)}
	eff=eff.pow(layers.h.clickables[11].gain())
	eff=eff.pow(layers.n.clickables[11].gain())
	if(hasMilestone("x",0)){eff=eff.pow(1.01)}
	if(hasMilestone("x",1)){eff=eff.mul(2)}
	if(inChallenge("x",11))eff=eff.pow(0.25)
	if(inChallenge("j",11))eff=eff.pow(0.2)
	if(inChallenge("j",11))eff=eff/(eff.pow(0.2))
	if(hasChallenge("x",11))eff=eff.mul(50)
	if(hasMilestone("j",1)){eff=eff.mul(2)}
	if(hasMilestone("xa",1)){eff=eff.mul(2)}
	if(hasMilestone("xb",1)){eff=eff.mul(2)}
	if(hasMilestone("xc",1)){eff=eff.mul(2)}
	eff = eff.mul(((player.xa.points.add(1)).mul(4)).div(4))
	eff = eff.mul(((player.xb.points.add(1)).mul(16)).div(16))
	eff = eff.mul(((player.xc.points.add(1)).mul(64)).div(64))
	eff = eff.mul(player.x.points.add(1))
	eff = eff.mul((player.j.points.add(1)).pow(2))
	return eff
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return hasMilestone("k",0)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}