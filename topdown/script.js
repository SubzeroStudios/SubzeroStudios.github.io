var debugMode = true;

var keys = [];

/* sets starting screen position */
var screenOffsetX = 0;
var screenOffsetY = 0;

var playerPosX = screenOffsetX + ((parseInt(($('#gameWindow').css("width")).slice(0, -2))) / 2);
var playerPosY = screenOffsetY + ((parseInt(($('#gameWindow').css("height")).slice(0, -2))) / 2);

var playerSpeed = 5;

/* holds the keycodes for certain keys */
var keyUp = 38;
var keyDown = 40;
var keyLeft = 37;
var keyRight = 39;
var keyH = 72;


var flowers = [];
var trees = [];
var graves = [];
var houses = [];


var hasBuiltHouse = false;
var level = 1; //0 will be the intro; 1 will be the first actual level

function init()
{
	/* debug mode (makes boxes around elements) */
	if(debugMode)
	{
		//fuck me
	}

	/* makes some dank flowers and add them to their array*/
	/*var flowerDensity = 275;
	for (var i = 0; i <= flowerDensity-1; i++) 
	{
		var flowerXPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("width")).slice(0, -2)))) + 1);
		var flowerYPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("height")).slice(0, -2)))) + 1);
		var flowerType = Math.floor(Math.random() * 2) + 1;

		flowers.push({
			xPos: flowerXPos,
			yPos: flowerYPos,
			type: flowerType,
			id: i
		});
	}*/

	/* make some dank 420 trees and at them in their arrays */
	/*var treeDensity = 75; //125
	for (var i = 0; i <= treeDensity-1; i++) 
	{
		var treeXPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("width")).slice(0, -2)))) + 1);
		var treeYPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("height")).slice(0, -2)))) + 1);
		var treeType = Math.floor(Math.random() * 2) + 1;

		trees.push({
			xPos: treeXPos,
			yPos: treeYPos,
			type: treeType,
			id: i
		});
	}*/

	/* make some dank doink graves and at them in their arrays */
	/*var graveDensity = 75; //125
	for (var i = 0; i <= treeDensity-1; i++) 
	{
		var graveXPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("width")).slice(0, -2)))) + 1);
		var graveYPos = Math.floor((Math.random() * (parseInt(($('#gamePan').css("height")).slice(0, -2)))) + 1);
		var graveType = 1;

		graves.push({
			xPos: graveXPos,
			yPos: graveYPos,
			type: graveType,
			id: i
		});
	}*/


	for (var i = 0; i <= parseInt(($('#gamePan').css("height")).slice(0, -2))+200; i++) //200 is the max height for all the below items
	{
		//50 is the max height of the flowers
		flowers.forEach(function(f){
			if(f.yPos+50 == i) $("<div class='flower' id='f"+i+"' style='background-image:url(assets/flower"+f.type+".png);left:"+f.xPos+"px;top:"+f.yPos+"px;z-index:"+(f.yPos+50)+"'></div>").appendTo("#gamePan");
		});

		//200 is the max height of the trees
		trees.forEach(function(t){
			if(t.yPos+200 == i) $("<div class='tree' id='t"+i+"' style='background-image:url(assets/tree"+t.type+".png);left:"+t.xPos+"px;top:"+t.yPos+"px;z-index:"+(t.yPos+200)+"'></div>").appendTo("#gamePan");
		});

		//125 is the max height of the graves
		graves.forEach(function(g){
			if(g.yPos+125 == i) $("<div class='grave' id='t"+i+"' style='background-image:url(assets/graveFront.png);left:"+g.xPos+"px;top:"+g.yPos+"px;z-index:"+(g.yPos+45)+"'></div>").appendTo("#gamePan");
		});


		if(playerPosY+100 == i) $("<div id='player' style='left:100px;top:100px;z-index:"+(playerPosY+100)+";'></div>").appendTo("#gamePan");
	}

	/* create the minimap */
	$('<div id="miniMap"></div>').appendTo("#gameWindow");
	$('<div id="playerIcon"></div>').appendTo("#gameWindow");

}
init();

/* handle key presses */
window.addEventListener("keydown", function(e){


	/* 
	up - 38
	down - 40
	left - 37
	right - 39
	*/

	keys[e.keyCode] = true;

}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);

function update()
{
	$('#gamePan').css({"margin-left":"-"+screenOffsetX+"px",
					   "margin-top":"-"+screenOffsetY+"px"});



	if(keys[keyDown])
	{
		//if the player wont go off the screen
		if(screenOffsetY <= parseInt(($('#gamePan').css("height")).slice(0, -2)) - playerSpeed - (parseInt(($('#gameWindow').css("height")).slice(0, -2))))
		{
			//if the player wont walk through a wall
			var canContinue = true;

			trees.forEach(function(t){
				/* if player lines up with the tree X-wise
					50 is the width of the player
					100 is the width of the tree */
				if((playerPosX >= (t.xPos-50)) && (playerPosX <= (t.xPos + 100)))
				{
					if((playerPosY + 100) < (t.yPos + 200)) //if the player is above the tree
					{
						if(   ((playerPosY+playerSpeed) > (t.yPos+75)))
						{
							canContinue = false;
						}
					}
				}
			});
			graves.forEach(function(g){
				/* if player lines up with the grave X-wise
					50 is the width of the player
					75 is the width of the grave */
				if((playerPosX >= (g.xPos-50)) && (playerPosX <= (g.xPos + 75)))
				{
					if((playerPosY + 100) < (g.yPos + 45)) //if the player is above the gravestone (not whole grave)
					{
						if(   ((playerPosY+playerSpeed) > (g.yPos-60))) //I have no idea why its minus 60 this makes no sense let the insanity commence. Lord hlep us all. Okay aparently for some fucking reason its getting its yPos from the bottom side and not the top I don't have any fucking clue why but who gives a shit it works.
						{
							canContinue = false;
						}
					}
				}
			});

			if(canContinue)
			{
				if((playerPosY+50) >= ((parseInt($('#gameWindow').css("height").slice(0, -2)))/2)) screenOffsetY += playerSpeed;



				playerPosY += playerSpeed
			}
		}

		else if(playerPosY + 100 + playerSpeed <= parseInt(($('#gamePan').css("height")).slice(0, -2)))
		{
			playerPosY += playerSpeed;
		}

		$("#player").css({"background-image":"url(assets/bodyFrontShrunk.png)"});
	}
	if(keys[keyUp])
	{
		//if the player wont go off the screen
		if((screenOffsetY - playerSpeed) >= 0)
		{
			//if the player wont walk through a wall
			var canContinue = true;

			trees.forEach(function(t){
				/* if player lines up with the tree X-wise
					50 is the width of the player
					100 is the width of the tree */
				if((playerPosX >= (t.xPos-50)) && (playerPosX <= (t.xPos + 100)))
				{
					if((playerPosY + 100) >= (t.yPos + 200)) //if the player is below the tree
					{
						if(   ((playerPosY-playerSpeed) < (t.yPos+100)))
						{
							canContinue = false;
						}
					}
				}
			});
			graves.forEach(function(g){
				/* if player lines up with the grave X-wise
					50 is the width of the player
					75 is the width of the grave */
				if((playerPosX >= (g.xPos-50)) && (playerPosX <= (g.xPos + 75)))
				{
					if((playerPosY + 100) >= (g.yPos + 45)) //if the player is below the gravestone
					{
						if(   ((playerPosY-playerSpeed) < (g.yPos-45))) //I have no idea why its minus, this makes no sense let the insanity commence. Lord hlep us all. g.yPos is the bottom side for some fucking reason wtf
						{
							canContinue = false;
						}
					}
				}
			});

			if(canContinue)
			{
				if((playerPosY+50) <= (  parseInt(($('#gamePan').css("height")).slice(0, -2)) - ((parseInt($('#gameWindow').css("height").slice(0, -2)))/2))) screenOffsetY -= playerSpeed;
				playerPosY -= playerSpeed;
			}
		}

		else if(playerPosY - playerSpeed >= 0)
		{
			playerPosY -= playerSpeed;
		}

		$("#player").css({"background-image":"url(assets/bodyBackShrunk.png)"});
	}
	if(keys[keyLeft])
	{
		//if the player wont go off the screen
		if((screenOffsetX - playerSpeed) >= 0) 
		{
			if((playerPosX+25) <= (  parseInt(($('#gamePan').css("width")).slice(0, -2)) - ((parseInt($('#gameWindow').css("width").slice(0, -2)))/2))) screenOffsetX -= playerSpeed;
			playerPosX -= playerSpeed;
		}

		else if(playerPosX - playerSpeed >= 0)
		{
			playerPosX -= playerSpeed;
		}


		$("#player").css({"background-image":"url(assets/bodyLeftShrunk.png)"});
	}
	if(keys[keyRight])
	{
		//if the player wont go off the screen
		if(screenOffsetX <= parseInt(($('#gamePan').css("width")).slice(0, -2)) - playerSpeed - (parseInt(($('#gameWindow').css("width")).slice(0, -2))))
		{ 
			if((playerPosX+25) >= ((parseInt($('#gameWindow').css("width").slice(0, -2)))/2)) screenOffsetX += playerSpeed;
			playerPosX += playerSpeed;
		}

		else if(playerPosX + 50 + playerSpeed <= parseInt(($('#gamePan').css("width")).slice(0, -2)))
		{
			playerPosX += playerSpeed;
		}

		$("#player").css({"background-image":"url(assets/BodyRightShrunk.png)"});
	}

	if(keys[keyH] && !hasBuiltHouse) buildHouse();

	/* actual on screen player (not dot on minimap) */
	$('#player').css({"top":""+playerPosY+"px","left":""+playerPosX+"px","z-index":""+(playerPosY+100)+""});

	/* player's icon on the minimap */
	$('#playerIcon').css({
		"top":""+(parseInt(($('#miniMap').css("top")).slice(0, -2))+(((playerPosY+50)/(parseInt($('#gamePan').css("height").slice(0, -2))))*parseInt(($('#miniMap').css("height")).slice(0, -2))))+"px",
		"left":""+(parseInt(($('#miniMap').css("left")).slice(0, -2))+(((playerPosX+25)/(parseInt($('#gamePan').css("width").slice(0, -2))))*parseInt(($('#miniMap').css("width")).slice(0, -2))))+"px",
		"z-index":""+(playerPosY+100)+""
	});

	/* correct the layaring of the player with the background elements MAKE MORE EFFICIENT YA FO0KW1t */
	/*trees.forEach(function(t){
		if((t.yPos+200) > (playerPosY+100)) //if the tree base is below the player base...
		{
			$('#t'+t.id).css({"z-index":"3"}); //player z-index is 2
		}
		else if((t.yPos+200) < (playerPosY+100)) //if the tree base is above the player base...
		{
			$('#t'+t.id).css({"z-index":"1"});
		}
	});*/
}


function buildHouse()
{
	/* [x, y, length, hight]  */
	wallsArray = [
		{
			x: screenOffsetX+500,
			y: screenOffsetY+250,
			l: 300,
			h: 15
		},
	];

	houses.push({
		type: 1,
		walls: wallsArray
	});

	drawHouse();
}

function drawHouse()
{
	for(var i = 0; i <= houses[0].walls.length-1; i++)
	{
		$("<div class='houseWall' style='width:"+houses[0].walls[i].l+"px; height:"+houses[0].walls[i].h+";top:"+houses[0].walls[i].y+";left:"+houses[0].walls[i].x+";'></div>").appendTo("#gamePan");
	}

	hasBuiltHouse = true;
}

function gameLoop()
{
	update();
}

setInterval(gameLoop, 1000/60); //updates 60 times a second





/*(parseInt($('#gamePan').css("height")).slice(0, -2))
(parseInt($('#gamePan').css("width")).slice(0, -2))*/