
var functionToCall;
var room;
var inventory = ["Strange_Coin"];
var inventoryAsString = inventory.join(", ");
var taken=false;
var takeFocus;
var searchFocus;
var talkFocus;
var attackFocus;
var attackPower = 1;
var healthPoints = 10;
var weaponHand;


// These objects are living organisms in the game. you can talk and attack them and search them if they are dead
var goblin={
	health: 10,
	attack: 2,
	alive: true,
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
var key={
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
	equippable: false
};

var torch = {
	attackValue: 3,
	equippable: true,
	Search: function(){alert("Its a torch");},
	Take: function(){
	alert("you take the torch");
	for(i=0; i < room.takeables.length; i++){
		if(room.takeables[i] == takeFocus){
			room.takeables.splice(i,1);
			inventory.push("torch");
			inventoryAsString = inventory.join(", ");
			document.getElementById("inventoryText").innerText=inventoryAsString;
		}
	}
	},
	Equip: function(){
		if(weaponHand == "torch"){
			alert("This is already equipped.");
		}else{
			weaponHand="torch";
			attackPower = 3;
			document.getElementById("weaponText").innerText="Torch";
		}

	}
}

var torches = {
	Search: function(){	alert("Its a torch");
}

}

var gate = {
	health: 60,
	Search: function(){	alert("Its a gate");}
}


// These Objects are rooms in the dungeon
var theGate={
	searchables: ["torch", "torches", "gate", "goblin"],
	takeables: ["torch"],
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
	if(room.searchables.length < 1){
		alert("There is nothing to search.")
	}
	else{
		searchFocus = prompt("what would you like to search?");
	}
	if(room.searchables.indexOf(searchFocus) !== -1){
		//alert("This exists in the room");
		window[searchFocus].Search();
	}
	else{
		alert("This does not exist in the room")
	}
	}

function goTake(){
	if(room.takeables.length < 1){
		alert("There is nothing to take.")
	}
		else{
			takeFocus= prompt("What would you like to take?")
		
	if(inventory.indexOf(takeFocus) !== -1){
		alert("you already have the " + takeFocus);
	}
		else{
			if(room.takeables.indexOf(takeFocus) !== -1){
				window[takeFocus].Take();
				}
				else{
					alert("This does not exist in the room")
				}
			}
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
		var targetAttack = window[attackFocus].attack;
		while(targetHP > 0 && healthPoints > 0){
			targetHP -= attackPower;
			alert("You do " + attackPower + " damage to the " + attackFocus + "! It now has " + targetHP + " HP");
			healthPoints -= targetAttack;
			alert("Your Opponent does " + targetAttack + " damage to you! You now have " + healthPoints + " HP");

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

function roomChange(){
		document.getElementById("header").innerText=room.roomHeader;
		document.getElementById("image").style.backgroundImage=room.roomImage;
		document.getElementById("textbox").innerText=room.roomText
}











