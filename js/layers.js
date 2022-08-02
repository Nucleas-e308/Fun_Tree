function d(){return  player.s}
function n(x){return new Demical(x)}
addLayer("h", {
    name: "happy", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		ck11: new Decimal(0),
    }},
    color: "#DC143C",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "寄点", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
	branches: ["x"],
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: 进行寄点重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	update(diff) {
		generatePoints("h", this.revenue(diff))
	},
    layerShown(){return true},
	upgrades:{
		11:{
            title:"更多乐子",
            description:"减少屑见手青休息时间，开启996模式，乐子产出效率*2",
			cost:new Decimal(1),
		},
		12:{
            title:"乐子时代",
            description:"乐子人屑见手青开始更好的生产乐子，寄点开始加成乐子",
			unlocked(){return hasUpgrade(this.layer,11)},
			effect() {
                return player[this.layer].points.add(4).pow(0.25)
            },
            effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
			cost:new Decimal(5),
		},
		13:{
            title:"自给自足",
            description:"乐子现在能使屑见手青提高效率",
			effect(){
				return player.points.add(4).pow(0.25)
			},
			unlocked(){return hasUpgrade(this.layer,12)},
			effectDisplay(){ return format(upgradeEffect(this.layer,this.id))+"×" },
			cost:new Decimal(20),
		},
		15:{
            title:"辉影神秘",
            description:"见手青请来了被称作屑b的神秘，他能为你的乐子产量^1.2",
			unlocked(){return hasUpgrade(this.layer,13)},
			cost:new Decimal(40),
		},
		16:{
            title:"匿名123",
            description:"匿名为本游戏赞助了vip，它能进行自动化，每秒获取你乐子获取量百分之二十的寄点",
			unlocked(){return hasUpgrade(this.layer,15)},
			cost:new Decimal(80),
		},
		21:{
            title:"QwQe308",
            description:"qwq指导了你如何继续压榨见手青，现在变为007，它使“更多乐子”效果^1.3",
			unlocked(){return hasUpgrade(this.layer,16)},
			cost:new Decimal(120),
		},
	},
	clickables:{
		11:{
			title(){return "<h2>寄居蟹</h2><br>等级:"+format(player.h.ck11,0)+"/15<br>将你的乐子获取^"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)},
			canClick(){return player.h.ck11.lt(15)&&player.h.points.gte(this.cost())},
			unlocked(){return hasUpgrade("x",11)},
			gain(){
                var gain = new Decimal(1.05)
                gain=gain.add(player.h.ck11.mul(0.03))
                return gain
            },
            cost(){
                var cost = new Decimal(100)
                cost=cost.mul(new Decimal(1.5).pow(player.h.ck11))
                return cost
			},
			onClick(){
            player.h.points=player.h.points.sub(this.cost())
            player.h.ck11=player.h.ck11.add(1)
            },
	},
	},
	revenue(diff) {
			let zd = 0
			if (hasUpgrade("h",16)){zd += 20}
			return diff * zd / 100
		},
})
addLayer("x", {
    name: "xie", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "X", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(500), // Can be a function that takes requirement increases into account
	branches: ["xa","j"],
    resource: "屑见手青", // Name of prestige currency
    baseResource: "寄点", // Name of resource prestige is based on
	canBuyMax() {if(hasMilestone("x",2)) return true
	return false
	},
    baseAmount() {return player.h.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "x", description: "X: 进行屑见手青重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
        lore: {
            title: "强大的见手青",
            body() { return "<h3>你每拥有一个见手青，乐子产量就多增加一倍" },
        },
    },
	unlocked(){return hasUpgrade("h",21)},
    layerShown(){return hasUpgrade("h",21)},
	milestones: {
		0: {
			requirementDescription: "屑见手青<br>1 屑见手青",
			effectDescription: "你开始制造更多的屑见手青，他们将提高你生产乐子的速度,效果初始速度^1.01",
			done() {return player.x.points.gte(1)},
			},
		1: {
			requirementDescription: "更高效率<br>3 屑见手青",
			effectDescription: "屑见手青们速度翻倍",
			done() {return player.x.points.gte(3)},
		},
		2: {
			requirementDescription: "更多购买<br>6 屑见手青",
			effectDescription: "你可以购买最大值的屑见手青",
			done() {return player.x.points.gte(6)},
			},
		3:{
			requirementDescription: "下一阶段<br>20 屑见手青",
			effectDescription: "解锁一个新节点",
			done() {return player.x.points.gte(20)},
			},
	},
	upgrades:{
		11:{
            title:"献祭",
            description:"将一个屑见手青献祭给咕海，获得力量，解锁一个寄点购买项",
			cost:new Decimal(1),
		},
		12:{
            title:"献祭+",
            description:"将两个屑见手青献祭给陌尘，获得力量，解锁一个挑战",
			cost:new Decimal(2),
		},
		13:{
            title:"你被骗了",
            description:"never gonna give you up~",
			cost:new Decimal(1),
		},
		14:{
            title:"你被骗了+",
            description:"never gonna give you up~",
			unlocked(){return hasUpgrade(this.layer,13)},
			cost:new Decimal(1),
		},
		15:{
            title:"你被骗了++",
            description:"never gonna give you up~",
			unlocked(){return hasUpgrade(this.layer,14)},
			cost:new Decimal(1),
		},
		21:{
            title:"你被骗了+++",
            description:"never gonna give you up~",
			unlocked(){return hasUpgrade(this.layer,15)},
			cost:new Decimal(1),
		},
		22:{
            title:"你被骗了++++",
            description:"never gonna give you up~",
			unlocked(){return hasUpgrade(this.layer,21)},
			cost:new Decimal(2),
		},
		23:{
            title:"献祭++",
            description:"将3个屑见手青献祭给屑b53，获得力量，解锁一个新节点",
			unlocked(){return hasUpgrade(this.layer,22)},
			cost:new Decimal(3),
		},
	},
	challenges: {
        11: {
            name: "<h1>鉴手青</h1>",
            challengeDescription: "<h4>当见手青认真起来变成”鉴手青“乐子将会何去何从呢？……乐子产量^0.25</h4>",
            canComplete(){return player.points.gte("1e6")},
            goalDescription(){return format(new Decimal("1e6"))+"乐子"},
            rewardDescription(){return `乐子获取×50`},
            unlocked(){return hasUpgrade("x",12)},
            onEnter(){layerDataReset("h")},
            //onComplete(){player.p.digitCapacity = n(5)},
        },
	},
})
addLayer("n", {
    name: "nao", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		ck11: new Decimal(0),
    }},
    color: "#00BFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "恼", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "n", description: "N: 进行恼重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade("x",23)},
	upgrades:{
		11:{
            title:"我恼了",
            description:"解锁一个可重复购买项",
			cost:new Decimal(222),
		},
	},
	clickables:{
		11:{
			title(){return "<h2>大恼天宫</h2><br>等级:"+format(player.n.ck11,0)+"/100<br>将你的乐子获取^"+format(this.gain(),2)+"<br>消耗:"+format(this.cost(),2)},
			canClick(){return player.n.ck11.lt(100)&&player.n.points.gte(this.cost())},
			unlocked(){return hasUpgrade("n",11)},
			gain(){
                var gain = new Decimal(1)
                gain=gain.add(player.n.ck11.mul(0.003))
                return gain
            },
            cost(){
                var cost = new Decimal(80)
                cost=cost.mul(new Decimal(1.05).pow(player.n.ck11))
                return cost
			},
			onClick(){
            player.n.points=player.n.points.sub(this.cost())
            player.n.ck11=player.n.ck11.add(1)
            },
	},
	},
})
addLayer("j", {
    name: "jian", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "J", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
	doReset(){},
	branches: ["d"],
    resource: "贱手青", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
	canBuyMax() {if(hasMilestone("j",2)) return true
	return false
	},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "j", description: "J: 进行贱手青重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	infoboxes: {
        lore: {
			unlocked(){return hasUpgrade("j",11)},
            title: "乐",
            body() { return "<h3>你被骗了，真是大乐透" },
        },
    },
	unlocked(){return hasMilestone("x",3)},
    layerShown(){return hasMilestone("x",3)},
	milestones: {
		0: {
			requirementDescription: "迈出第一步<br>1 贱手青",
			effectDescription: "解锁一个挑战",
			done() {return player.j.points.gte(1)},
			},
		1: {
			requirementDescription: "加速<br>2 贱手青",
			effectDescription: "增量额外*2效果",
			done() {return player.j.points.gte(2)},
		},
		2: {
			requirementDescription: "新玩法<br>5 贱手青",
			effectDescription: "解锁一个玩法更好玩的节点",
			done() {return player.j.points.gte(5)},
		},
	},
	upgrades:{
		11:{
            title:"超级能力",
            description:"解锁一个新能力",
			cost:new Decimal(4),
		},
	},
	challenges: {
		11: {
            name: "<h1>鉴守清</h1>",
            challengeDescription: "<h4>当见手青认真起来变成”鉴守清“乐子将会何去何从呢？……乐子产量^0.2,乐子越多产量越低</h4>",
            canComplete(){return player.points.gte("1e8")},
            goalDescription(){return format(new Decimal("1e8"))+"乐子"},
            rewardDescription(){return `乐子获取×200`},
            unlocked(){return hasMilestone("j",0)},
            onEnter(){layerDataReset("n")},
            //onComplete(){player.p.digitCapacity = n(5)},
        },
	},
})
addLayer("xa", {
    name: "jianaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xb"],
    resource: "一重压缩屑见手青", // Name of prestige currency
    baseResource: "屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return true
	},
    baseAmount() {return player.x.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "压缩",
            body() { return "<h3>屑见手青可以被压缩" },
        },
    },
	unlocked(){return player.x.points>3},
    layerShown(){return player.x.points>3},
	milestones: {
		0: {
			requirementDescription: "压缩<br>1 一重压缩屑见手青",
			effectDescription: "乐子产量翻倍",
			done() {return player.xa.points.gte(1)},
			},
	},
})
addLayer("xb", {
    name: "iana", // This is optional, only used in a few places, If absent it just uses the layer i
    symbol: "XB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xc"],
    resource: "二重压缩屑见手青", // Name of prestige currency
    baseResource: "一重压缩屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return true
	},
    baseAmount() {return player.xa.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "压缩再压缩",
            body() { return "<h3>屑见手青可以被压缩" },
        },
    },
	unlocked(){return hasMilestone("xa",0)},
    layerShown(){return hasMilestone("xa",0)},
	milestones: {
		0: {
			requirementDescription: "压缩再压缩<br>1 二重压缩屑见手青",
			effectDescription: "乐子产量翻倍",
			done() {return player.xb.points.gte(1)},
			},
	},
})
addLayer("xc", {
    name: "jianaaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XC", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["k"],
    resource: "三重压缩屑见手青", // Name of prestige currency
    baseResource: "二重压缩屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return true
	},
    baseAmount() {return player.xb.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "更强的压缩工艺",
            body() { return "<h3>屑见手青可以被压缩" },
        },
    },
	unlocked(){return hasMilestone("xb",0)},
    layerShown(){return hasMilestone("xb",0)},
	milestones: {
		0: {
			requirementDescription: "更强的压缩工艺<br>1 三重压缩屑见手青",
			effectDescription: "乐子产量翻倍",
			done() {return player.xc.points.gte(1)},
			},
	},
})
addLayer("d", {
    name: "dai", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		atk: new Decimal(0),
    }},
    color: "#FFFF00",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
	doReset(){},
	branches: ["s"],
    resource: "代价", // Name of prestige currency
    baseResource: "贱手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.j.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
	base:3,
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: 进行代价重置", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	update(diff) {
		player.d.atk = player.d.atk.add(player.d.points.pow(2).mul(diff));
	},
	infoboxes: {
        lore: {
            title: "交换",
            body() { return "<h3>见手青为了变得更强与某些存在做了交易，但是代价是什么？……" },
        },
    },
	unlocked(){return hasMilestone("j",2)},
    layerShown(){return hasMilestone("j",2)},
	milestones: {
		0: {
			requirementDescription: "无法回头<br>1 代价",
			effectDescription: "解锁一个点击项",
			
			done() {return player.d.points.gte(1)},
			},
		1: {
			requirementDescription: "坠落<br>4 代价",
			effectDescription: "解锁一个点击项",
			done() {return player.d.points.gte(4)},
			},
		2: {
			requirementDescription: "沉堕<br>6 代价",
			effectDescription: "解锁一个点击项",
			done() {return player.d.points.gte(6)},
			},
		3: {
			requirementDescription: "文字游戏<br>8 代价",
			effectDescription: "解锁一个点击项，一个新节点",
			done() {return player.d.points.gte(8)},
			},
	},
	clickables: {
			11: {
				display() {return  '你现在有 ' + format(player.d.atk) + " 实力"},
				canClick(){return true}
			},
			21: {
				title:"锻炼",
				display() {return  "- 10 实力<br>获得1~50的升级<br>有2.5%几率获得贱手青"},
				unlocked(){return hasMilestone("d",0)},
				canClick() {
					let ac = player.d.atk
					if (ac >= 10) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 51)
					let cm = Math.floor(Math.random() * 40)
					player.d.atk = player.d.atk.sub(10)
					player.s.points = player.s.points.add(bm);
					if (cm == 0) {player.j.points = player.j.points.add(1)};
					return bm + cm
				},
			},
			22: {
				title:"强化",
				display() {return  "- 100 实力<br>获得1~500的升级<br>有5%几率获得战斗"},
				unlocked(){return hasMilestone("d",1)},
				canClick() {
					let ac = player.d.atk
					if (ac >= 100) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 501)
					let cm = Math.floor(Math.random() * 20)
					player.d.atk = player.d.atk.sub(100)
					player.s.points = player.s.points.add(bm);
					if (cm == 0) {player.s.gj = player.s.gj.add(1)};
					return bm + cm
				},
			},
			23: {
				title:"淬体",
				display() {return  "- 1000 实力<br>获得1~5000的升级<br>有10%几率获得抵御"},
				unlocked(){return hasMilestone("d",2)},
				canClick() {
					let ac = player.d.atk
					if (ac >= 1000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 5001)
					let cm = Math.floor(Math.random() * 10)
					player.d.atk = player.d.atk.sub(1000)
					player.s.points = player.s.points.add(bm);
					if (cm == 0) {player.s.dy = player.s.dy.add(1)};
					return bm + cm
				},
			},
			24: {
				title:"淬魂",
				display() {return  "- 10000 实力<br>获得1~50000的升级<br>有20%几率获得疗伤"},
				unlocked(){return hasMilestone("d",3)},
				canClick() {
					let ac = player.d.atk
					if (ac >= 10000) 
					return true
					},
				onClick(){
					let bm = Math.floor(Math.random() * 50001)
					let cm = Math.floor(Math.random() * 5)
					player.d.atk = player.d.atk.sub(10000)
					player.s.points = player.s.points.add(bm);
					if (cm == 0) {player.s.ls = player.s.ls.add(1)};
					return bm + cm
				},
			},
	},
	upgrades:{
	},
	challenges: {
		
	},
})
addLayer("xsda", {
    name: "jiasdnaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XsdA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xb"],
    resource: "一重压缩屑见手青", // Name of prestige currency
    baseResource: "屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.x.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
	unlocked(){return hasMilestone("x",3)},
    layerShown(){return "ghost"},
})
addLayer("xsdwda", {
    name: "jiaswdnaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XswdA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xb"],
    resource: "一重压缩屑见手青", // Name of prestige currency
    baseResource: "屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.x.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
	unlocked(){return hasMilestone("x",3)},
    layerShown(){return "ghost"},
})
addLayer("xsdea", {
    name: "jiasdneaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XseedA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xb"],
    resource: "一重压缩屑见手青", // Name of prestige currency
    baseResource: "屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.x.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
	unlocked(){return hasMilestone("x",3)},
    layerShown(){return "ghost"},
})
addLayer("xsdwdea", {
    name: "jiaswednaa", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "XsewdA", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#666666",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
	branches: ["xb"],
    resource: "一重压缩屑见手青", // Name of prestige currency
    baseResource: "屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.x.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
	unlocked(){return hasMilestone("x",3)},
    layerShown(){return "ghost"},
})
addLayer("s", {
    name: "level", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		doReset(){},
		points: new Decimal(0),
		gj: new Decimal(0),
		dy: new Decimal(0),
		ls: new Decimal(0),
		dengji: new Decimal(0),
		xuqiu: new Decimal(0),
    }},
    color: "#00FF00",
	branches: ["c"],
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "升级", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
	update(diff){
	if(d().dengji.gte(10))d().xuqiu=30
    if(d().dengji.gte(15))d().xuqiu=50
    if(d().dengji.gte(20))d().xuqiu=100
    if(d().dengji.gte(50))d().xuqiu=500
    if(d().dengji.gte(100))d().xuqiu=1000
    if(d().dengji.gte(200))d().xuqiu=3000
    if(d().dengji.gte(300))d().xuqiu=5000
	},
	canBuyMax() {
	return false
	},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "升级",
            body() { return "<h3>我们需要更高的level" },
        },
    },
    layerShown(){return hasMilestone("d",3)},
	milestones: {
		0: {
			requirementDescription: "等级达标<br>500 等级 6 战斗 4 抵御 2 疗伤",
			effectDescription: "解锁一个新节点",
			done() {return player.s.points.gte(500)&&player.s.gj.gte(6)&&player.s.dy.gte(4)&&player.s.ls.gte(2)},
			},
	},
	    clickables: {
        11: {
            display() {return  '你现在有 ' + format(player.s.dengji) + " 级<br>下次升级需要"+ format(player.s.xuqiu) + "升级"},
            canClick(){return player.s.points.gte(d().xuqiu)},
            onClick(){
                player.s.points=player.s.points.sub(player.s.xuqiu)
                player.s.dengji=player.s.dengji.add(1)
            }
        },
		12: {
		    display() {return  '你现在有 ' + format(player.s.gj) + " 战斗"},
        },
		13: {
		    display() {return  '你现在有 ' + format(player.s.dy) + " 抵御"},
        },
		14: {
		    display() {return  '你现在有 ' + format(player.s.ls) + " 疗伤"},
        },
		},
})
addLayer("c", {
    name: "jihui", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	doReset(){},
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		chance: 0,
		cg: new Decimal(0),
    }},
    color: "#FFFFFF",

	branches: ["k"],
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "成仙", // Name of prestige currency
    baseResource: "乐子", // Name of resource prestige is based on
	update(diff){
	player.c.chance=player.c.points.pow(0.75)
	},
	canBuyMax() {
	return false
	},
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "成仙",
            body() { return "<h3>我们需要渡劫成仙" },
        },
    },
	unlocked(){return hasMilestone("s",0)},
    layerShown(){return hasMilestone("s",0)},
	milestones: {
		0: {
			requirementDescription: "渡劫成仙<br>成仙成功",
			effectDescription: "解锁一个新节点",
			done() {return player.c.cg.gte(1)},
			},
	},
	    clickables: {
        11: {
            display() {return  '你现在有 ' + format(player.c.chance) + "%成仙几率<br>每次成仙需要50等级"},
            canClick(){return player.s.dengji.gte(50)},
            onClick(){
                player.s.dengji=player.s.dengji.sub(50)
                player.c.points=player.c.points.add(1)
				let cm = Math.floor(Math.random() * 100)
				if (cm < Math.ceil(player.c.chance)) {player.c.cg = player.c.cg.add(1)};
				return cm
            }
		},
		},
})
addLayer("k", {
    name: "space", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		chance: new Decimal(0),
		cg: new Decimal(0),
    }},
    color: "#4D4DFF",
    requires: new Decimal(4), // Can be a function that takes requirement increases into account
    resource: "空间之力", // Name of prestige currency
    baseResource: "三重压缩屑见手青", // Name of resource prestige is based on
	canBuyMax() {
	return false
	},
    baseAmount() {return player.xc.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
	infoboxes: {
        lore: {
            title: "融合",
            body() { return "<h3>将成仙之后的屑见手青与三重压缩屑见手青融合，获得了掌握着空间之力的屑见手青" },
        },
    },
	unlocked(){return hasMilestone("c",0)},
    layerShown(){return hasMilestone("c",0)},
	milestones: {
		0: {
			requirementDescription: "时间为帝 空间为王<br>1 空间之力",
			effectDescription: "解锁#@！￥%……",
			done() {return player.k.points.gte(1)},
			},
	},
	   
})
