/*
To do.



-add all character stats
-fix equip to automatically unequip and change stats
-add one more room and utilize the change room function (room identifier)
-add backward button
-change room text based on circumstances (dead goblin)
-fix none for you to take bug

*/
var room;


//var taken=false;
var takeFocus;
var searchFocus;
var talkFocus;
var attackFocus;
//character stats
//var attackPower = 1;
var healthPoints = 10;
var pierceAtk = 0;
var slashAtk = 0;
var bluntAtk = 1;
var fireAtk = 0;
var iceAtk = 0;
var radAtk = 0;
var magicAtk = 0;
var pierceRes = 1;
var slashRes = 1;
var bluntRes = 1;
var fireRes = 1;
var iceRes = 1;
var radRes = 1;
var magicRes = 1 ;

var weaponHand;
var specialFunc = ["Pull", "Push", "Eat", "Drink"]
var inventory = ["Strange_Coin"];
var inventoryAsString = inventory.join(", ");


// These objects are living organisms in the game. you can talk and attack them and search them if they are dead
var goblin={
	health: 10,
	pierceAtk: 0,
	slashAtk: 2,
	bluntAtk: 0,
	fireAtk: 0,
	iceAtk: 0,
	radAtk: 0,
	magicAtk: 0,
	pierceRes: 1,
	slashRes: 1,
	bluntRes: 1,
	fireRes: 1,
	iceRes: 1,
	radRes: 1,
	magicRes: 1,
	alive: true,
	special: [""],
	Search: function(){
		if(goblin.alive==false){
			alert("You search the freshly slain goblin and find a key on its person");
			room.takeables.push("key");
			console.log(room.takeables);
		}else{alert("The goblin would prefer it if you kept your distance");}
	},
	dialogue: function(){
						var answer = prompt('"You look like you want to get into the dungeon" The goblin says to you. "I can let you in for a coin." Respond with yes or no');
						if(answer == "yes"){
							for(i=0; i < inventory.length; i++){
								if(inventory[i] == "Strange_Coin"){
									inventory.splice(i,1);
									inventory.push("key");
									inventoryAsString = inventory.join(", ");
									document.getElementById("inventoryText").innerText=inventoryAsString;
								}
							}
							alert('"A pleasure to do business with you"');

						}else{alert('"Suit Yourself"');}
					}

};



//These Objects are inanimate objects in the game. You can search and take them
var log ={
	Search: function(){alert("It is a log from a tree up above. It is large but a good push may move it. It looks like something is stuck under it.")},
	special: ["Push"],
	Push: function(){alert("You manage to move the log a few feet. Underneath the log was a dagger");
	}
	
};

var dagger ={
	attackValue: 5,
	equippable: true,
	special: [""],
	Search: function(){alert("Its a small dagger");},
	Take: function(){
	alert("you take the dagger");
	for(i=0; i < room.takeables.length; i++){
		if(room.takeables[i] == takeFocus){
			room.takeables.splice(i,1);
			inventory.push("dagger");
			inventoryAsString = inventory.join(", ");
			document.getElementById("inventoryText").innerText=inventoryAsString;
		}
	}
	},
	Equip: function(){
		if(weaponHand == "dagger"){
			alert("This is already equipped.");
		}else{
			alert("You equip the dagger.");
			weaponHand="dagger";
			attackPower = 5;
			document.getElementById("weaponText").innerText="dagger";
		}

	}

};

var key={
	special: [""],
	Take: function(){
	alert("you take the key");
	for(i=0; i < room.takeables.length; i++){
		if(room.takeables[i] == takeFocus){
			room.takeables.splice(i,1);
			inventory.push("key");
			inventoryAsString = inventory.join(", ");
			document.getElementById("inventoryText").innerText=inventoryAsString;
		}
	}
	}

};

var Strange_Coin={
	special: [""],
	equippable: false,
	Search: function(){
		alert("A strange coin that bears a face that you do not recognize.");
	}
};

var torch = {
	attackValue: 3,
	equippable: true,
	special: [""],
	Search: function(){alert("Its a torch");},
	Take: function(){alert("you take the torch");},
	Equip: function(){
		if(weaponHand == "torch"){
			alert("This is already equipped.");
		}else{
			alert("You equip the torch.");
			weaponHand="torch";
			attackPower = 3;
			document.getElementById("weaponText").innerText="Torch";}

	}
};

var torches = {
	special: [""],
	Search: function(){	alert("Its a torch");
}

}

var gate = {
	special: [""],
	health: 60,
	Search: function(){	alert("Its a gate");}
}


// These Objects are rooms in the dungeon
var theGate={
	searchables: ["torch", "torches", "gate", "goblin", "log"],
	takeables: ["torch", "torch", "dagger"],
	talkables: ["goblin"],
	attackables: ["goblin"],
	roomHeader: "At the locked Gate",
	roomText: "You stand in front of a large locked gate. Two torches sit in sconces on either side. To the left of the gate sits a weary looking goblin.",
	roomImage: "url('images/gate.png')"
};



function runGame(){
	room=window["theGate"];
	roomChange();
	document.getElementById("inventoryText").innerText=inventoryAsString;
	document.getElementById("hpText").innerText=healthPoints;
}

function goEquip(){
	if(inventory.length < 1){
		alert("You don't have anything to equip");
	}else{
		var equipFocus= prompt("what do you wish to equip?");
		if(inventory.indexOf(equipFocus) !== -1){
				if(window[equipFocus].equippable == true){window[equipFocus].Equip();
				}else{alert("This can not be equipped");}
		}else{alert("You dont have that.");}
	}
}

function goSearch(){
	if(room.searchables.length < 1 && inventory.length < 1){
		alert("There is nothing to search.")
	}
	else{
		searchFocus = prompt("what would you like to search?");
	}
	if(room.searchables.indexOf(searchFocus) !== -1){
		//alert("This exists in the room");
		window[searchFocus].Search();
	}
	else if(inventory.indexOf(searchFocus) !== -1){
		window[searchFocus].Search();
		
	}else{alert("This is not something that you can search")};
	}

function goTake(){
	if(room.takeables.length < 1){
		alert("There is nothing to take.");
	}else{var takeFocus= prompt("What would you like to take?")};		
	 		if(room.takeables.indexOf(takeFocus) !== -1){
				window[takeFocus].Take();
				inventory.push(takeFocus);
				inventoryAsString = inventory.join(", ");
				document.getElementById("inventoryText").innerText=inventoryAsString;
				}else{alert("There are none for you to take.");}
	for(i=0; i < room.takeables.length; i++){
		if(room.takeables[i] == takeFocus){
			room.takeables.splice(i,1);
			break;}
				
		
	}
	}

function goTalk(){
	if(room.talkables.length < 1){
		alert("There is no one to speak to.")
	}
		else{
			var talkFocus= prompt("Whom do you wish to speak to?");
		
	if(room.talkables.indexOf(talkFocus) !== -1){
		window[talkFocus].dialogue();
		
	}
	else{alert("That is not something you can speak to here")}
	}
}

function goAttack(){
	if(room.attackables.length < 1){
		alert("There is nothing to attack.")
	}
		else{
			var attackFocus= prompt("What do you wish to attack?");
		
	if(room.attackables.indexOf(attackFocus) !== -1){
		//alert("you can attack that");
		var targetHP = window[attackFocus].health;
		var enPierce = window[attackFocus].pierceAtk;
		var enSlash = window[attackFocus].slashAtk;
		var enBlunt = window[attackFocus].bluntAtk;
		var enFire = window[attackFocus].fireAtk;
		var enIce = window[attackFocus].iceAtk;
		var enRad = window[attackFocus].radAtk;
		var enMag = window[attackFocus].magicAtk;
		var enPierceRes = window[attackFocus].pierceRes;
		var enSlashRes = window[attackFocus].slashRes;
		var enBluntRes = window[attackFocus].bluntRes;
		var enFireRes = window[attackFocus].fireRes;
		var enIceRes = window[attackFocus].iceRes;
		var enRadRes = window[attackFocus].radRes;
		var enMagRes = window[attackFocus].magicRes;
		var yourAttack = (Math.floor(pierceAtk*enPierceRes)+Math.floor(slashAtk*enSlashRes)+Math.floor(bluntAtk*enBluntRes)+Math.floor(fireAtk*enFireRes)+Math.floor(iceAtk*enIceRes)+Math.floor(radAtk*enRadRes)+Math.floor(magiceAtk*enMagRes));
		var enemyAttack = (Math.floor(enPierce*pierceRes)+Math.floor(enBlunt*bluntRes)+Math.floor(enSlash*slashRes)+Math.floor(enFire*fireRes)+Math.floor(enIce*iceRes)+Math.floor(enRad*radRes)+Math.floor(enMag*magicRes));
		while(targetHP > 0 && healthPoints > 0){
			targetHP -= yourAttack ;
			alert("You do " + yourAttack + " damage to the " + attackFocus + "! It now has " + targetHP + " HP");
			if(targetHP <= 0){break;}
			healthPoints -= enemyAttack;
			alert("Your Opponent does " + enemyAttack + " damage to you! You now have " + healthPoints + " HP");

		}
		if(healthPoints <= 0){
			alert("You died.");
			location.reload(true);
		}else{
		alert("It died");
		window[attackFocus].alive = false;
		document.getElementById("hpText").innerText=healthPoints;
		for(i=0; i < room.attackables.length; i++){
		if(room.attackables[i] == attackFocus){
			room.attackables.splice(i,1);
			}
		for(i=0; i < room.talkables.length; i++){
		if(room.talkables[i] == attackFocus){
			room.talkables.splice(i,1);
			}
		}
	}
	}

	}
	else{alert("Attacking that would not do much");}
	}
}

function goForward(){
	if(inventory.indexOf("key") !== -1){
		alert("You unlock the gate and successfully enter the dungeon");
		location.reload(true);
	}else{
		alert("The gate is locked");
	}
}

function goSpecial(){
	var specAction = prompt("Enter one of the following actions (case sensitive): Pull, Push, Eat, Drink");
	if(specialFunc.indexOf(specAction) !== -1){
		var specFocus = prompt("What would you like to " + specAction + " (case sensitive)");
		if(room.searchables.indexOf(specFocus) !== -1 || inventory.indexOf(specFocus) !== -1){
			if(window[specFocus].special.indexOf(specAction) !== -1){
				alert("thats a thing you can do");
				window[specFocus][specAction]();
			}else{alert("That wouldn't do much of anything");}
		}else{ alert("There isn't one in this room");}		
	}else{alert("Please use one of the listed actions");}
}


function roomChange(){
		document.getElementById("header").innerText=room.roomHeader;
		document.getElementById("image").style.backgroundImage=room.roomImage;
		document.getElementById("textbox").innerText=room.roomText;
}











