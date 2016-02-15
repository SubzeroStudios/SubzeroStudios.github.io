var keys = [];

/* sets starting screen position */
var screenOffsetX = 700;
var screenOffsetY = 700;

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
var houses = [];
var hasBuiltHouse = false;
function init()
{
	/* makes some dank flowers and add them to their array*/
	var flowerDensity = 275;
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

		//$("<div class='flower' style='background-image:url(assets/flower1.png);left:"+flowerXPos+"px;top:"+flowerYPos+"px'></div>").appendTo("#gamePan");
	}

	/* make some dank 420 trees and at them in their arrays */
	var treeDensity = 275; //125
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
	}

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


		if(playerPosY+100 == i) $("<div id='player' style='background-image:url(assets/playerFront.png);left:100px;top:100px;z-index:"+(playerPosY+100)+";'></div>").appendTo("#gamePan");
	}
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
			if(true)
			{
				screenOffsetY += playerSpeed;
				playerPosY += playerSpeed
			}


			$("#player").css({"background-image":"url(assets/playerFront.png)"});
		}
	}
	if(keys[keyUp])
	{
		//if the player wont go off the screen
		if((screenOffsetY - playerSpeed) >= 0)
		{
			screenOffsetY -= playerSpeed;
			playerPosY -= playerSpeed
			$("#player").css({"background-image":"url(assets/playerBack.png)"});
		}
	}
	if(keys[keyLeft])
	{
		//if the player wont go off the screen
		if((screenOffsetX - playerSpeed) >= 0) 
		{
			screenOffsetX -= playerSpeed;
			playerPosX -= playerSpeed
			$("#player").css({"background-image":"url(assets/playerLeftSide.png)"});
		}
	}
	if(keys[keyRight])
	{
		//if the player wont go off the screen
		if(screenOffsetX <= parseInt(($('#gamePan').css("width")).slice(0, -2)) - playerSpeed - (parseInt(($('#gameWindow').css("width")).slice(0, -2))))
		{ 
			screenOffsetX += playerSpeed;
			playerPosX += playerSpeed
			$("#player").css({"background-image":"url(assets/playerRightSide.png)"});
		}
	}

	if(keys[keyH] && !hasBuiltHouse) buildHouse();

	$('#player').css({"top":""+playerPosY+"px","left":""+playerPosX+"px","z-index":""+(playerPosY+100)+""});


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
		[screenOffsetX+500, screenOffsetY+250, 300, 15]
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
		$("<div class='houseWall' style='width:"+houses[0].walls[i][2]+"px; height:"+houses[0].walls[i][3]+";top:"+houses[0].walls[i][1]+";left:"+houses[0].walls[i][0]+";'></div>").appendTo("#gamePan");
	}

	hasBuiltHouse = true;
}

function gameLoop()
{
	update();
}

setInterval(gameLoop, 1000/60); //updates 60 times a second