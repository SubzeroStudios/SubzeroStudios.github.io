/*
 * 	Custom Tower Defense created by Alex Elliott, 
 * 	a.k.a. 'SubZER0' for www.ZeroBiscuit.com
 *	
 * 	Contact: subzero@zerobiscuit.com
 * 	Additional credit: *Stack Overflow
 *  	               *Jack Lay, a.k.a. 'Styche'
 					   *Alex Emory a.k.a. 'Herry'
 *	
 *	*Feedback and suggestions welcome!*
 */

var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

var W = 900,
H = 600;

canvas.height = H; 
canvas.width = W;

var elemLeft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;

var currentScreen = 1; //1: choose screen; 2: play; 3: track editor;

/* level data [1=track, 0=grass] */
var trackTiles = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				  0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 
				  0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 
				  0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 
				  0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 
				  1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 
				  0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 
				  0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 
				  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 
				  0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 
				  0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 
				  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var trackTilesEdit = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 
				 	  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var selectTileChoice = 1; //for track editor, 0 = grass  1= track

var grassElements = []; //normal
var trackElements = [];
var acid = [];

var grassElementsEdit = []; //track editor
var trackElementsEdit = [];

var tileWidth = 50;

var allTowers = []; //left, top, type

/* preload images */
var _backDrop = new Image();
	_backDrop.src = "assets/images/backdrop.png";

var _normal = new Image();
	_normal.src = "assets/images/normal.png"

var _grassimg = new Image();
	_grassimg.src = "assets/images/grass.png";

var _sidewalkimg = new Image();
	_sidewalkimg.src = "assets/images/sidewalk.png";

var _trashcan = new Image();
	_trashcan.src = "assets/images/trashcan.png";

var _logo = new Image();
	_logo.src = "assets/images/logo.png";

var _checkbox1 = new Image();
	_checkbox1.src = "assets/images/checkbox1.png";

var _checkbox2 = new Image();
	_checkbox2.src = "assets/images/checkbox2.png";

var _cashsign = new Image();
	_cashsign.src = "assets/images/cashsign.png";

var _heart = new Image();
	_heart.src = "assets/images/heart.png";

var _hoveranim = new Image();
	_hoveranim.src = "assets/images/hover.png";

var _enemy1 = new Image();
	_enemy1.src = "assets/images/enemy1.png";

var _enemy2 = new Image();
	_enemy2.src = "assets/images/enemy2.png";
	//_enemy2.src = "https://upload.wikimedia.org/wikipedia/commons/e/ec/Blank_50px.png";

var _startwave = new Image();
	_startwave.src = "assets/images/startwave.png";

var _tower1 = new Image();
	_tower1.src = "assets/images/tower1.png";

var _tower1icon = new Image();
	_tower1icon.src = "assets/images/tower1icon.png";

var _tower1attack = new Image();
	_tower1attack.src = "assets/images/tower1attack.gif";

var _tower2 = new Image();
	_tower2.src = "assets/images/tower2.png";

var _tower2icon = new Image();
	_tower2icon.src = "assets/images/tower2icon.png";

var _tower2attack = new Image();
	_tower2attack.src = "assets/images/tower2attack.png"

var _tower3_0 = new Image();
	_tower3_0.src = "assets/images/tower3-0.png";

var _tower3_1 = new Image();
	_tower3_1.src = "assets/images/tower3-1.png";

var _tower3icon = new Image();
	_tower3icon.src = "assets/images/tower3icon.png";

var _tower4 = new Image();
	_tower4.src = "assets/images/tower4.png";

var _tower4icon = new Image();
	_tower4icon.src = "assets/images/tower4icon.png";

var _acid = new Image();
	_acid.src = "assets/images/acid.png"

var _tower5_0 = new Image();
	_tower5_0.src = "assets/images/tower5-0.png";

var _tower5_1 = new Image();
	_tower5_1.src = "assets/images/tower5-1.png";

var _tower5icon = new Image();
	_tower5icon.src = "assets/images/tower5icon.png";

var _lockedItem = new Image();
	_lockedItem.src = "assets/images/lockedItem.png"

var money = 650;
var lives = 50;
var wave = 0;
var enemies = []; //object array: left, top, health, direction, speed, offScreen
var enemyHealth = 100; //will change later as game progresses
var waveInPorgress = false;
var spawnedEnemies = false; // set to true once you have spawned the enemies
var enableGridlines = false; //can be modified with _checkbox
var enableSound = true; //can be modified with checkbox
var cursorPointer = false;
var amountEnemiesYield = 5;
var current_HoverAnim = [];
var selectedTile = [null, null]; //[0]:x  [1]:y
var towerId = -1;
var healthbar = 0; //0: top  1: right  2: bottom  3: left
var currentNotificationMessage = "Click a tile to select it, then click a tower to place it";
var enemybox = false;
var enemySerial = 0;
var hudsize = 15;
var hudcolor = "white";
var hudfont = "Century Gothic";
var cmdOpen = false;
var submit;
var cmdHasBeenOpened = false;
var cunfrim = 0;
var linumber = 0;
var pauseMoney = false;
var pauseLives = false;
var pauseWave = false;

window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
var keys = [];
function keysPressed(e) {
    keys[e.keyCode] = true;
     
    if(keys[192])
    {
    	if(!cmdOpen) cmdOpenBox();
    	else cmdCloseBox();
    }

    if (keys[13]) 
    {
       if(cmdOpen) cmdHandle($("#textcommand").val());
    }
}

function keysReleased(e) {
    keys[e.keyCode] = false;
}

function init()
{

	if(currentScreen == 1)	//choose
	{	
		cursorPointer = false; //should already be false but just in case
		ctx.drawImage(_backDrop, 0, 0);
	}

	else if(currentScreen == 2) //play
	{
		cursorPointer = false;

		/* adds each tile to its appropriate array (track or grass) */
		ty = 0;
		tx = 300;

		for (var a = 0; a <= 144-1; a++) //loop through all of the data
		{
			if(tx >= ((tileWidth * 12)+300)) //if the current xPos is off the screen,
			{                                //reset it and change the yPos
				tx = 300;
				ty += tileWidth;
			}

			if(trackTiles[a] == 1) //track
			{
				trackElements.push({
				    top: ty,
				    left: tx
				});

			}
			else //grass
			{
				grassElements.push({
				    top: ty,
				    left: tx
				});
			}
			
			tx += tileWidth;
		}
	}

	else if(currentScreen == 3) //editior
	{
		cursorPointer = false;

		/* adds each tile to its appropriate array (track or grass) */
		ty = 0;
		tx = 300;

		for (var a = 0; a <= 144-1; a++) //loop through all of the data
		{
			if(tx >= ((tileWidth * 12)+300)) //if the current xPos is off the screen,
			{                                //reset it and change the yPos
				tx = 300;
				ty += tileWidth;
			}

			grassElementsEdit.push({
			    top: ty,
			    left: tx
			});
			
			tx += tileWidth;
		}
	}
}

init();

// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/ THANK YOU
function getMousePos(canvas, evt) /* add: var mousePos = getMousePos(canvas, event); */
{
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor(evt.clientX - rect.left),
      y: Math.floor(evt.clientY - rect.top)
    };
}

function isCursorWithinBounds(xmin, xmax, ymin, ymax, mouseX, mouseY)
{
	if(mouseX > xmin && mouseX < xmax && mouseY > ymin && mouseY < ymax)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function towerCost(t) //returns cost of the tower starts at 1(NOT 0) and goes to 8
{
	switch(t)
	{
		/*    towers aranged as  1 2 3 4
		 *	  				     5 6 7 8
		 *	  on left menu
		 */
		 
		case 1: //Saw Launcher
			return 100;
			break;

		case 2: //Radiation Emitter
			return 250;
			break;

		case 3:
			return 10;
			break;

		case 4:
			return 10;
			break;

		case 5:
			return 10;
			break;

		case 6:
			return 10;
			break;

		case 7:
			return 10000;
			break;

		case 8:
			return 10000;
			break;

		default:
			return null;
	}
}

function update()
{
	clearCanvas(); 

	if(cmdOpen) //only update the time when the console is open
	{
		var d = new Date();
		var seconds;
		var minutes;
		if(d.getSeconds() < 10) seconds = "0" + d.getSeconds();
		else seconds = d.getSeconds();
		if(d.getMinutes() < 10) minutes = "0" + d.getMinutes();
		else minutes = d.getMinutes();
		document.getElementById("date").innerHTML = d.getHours() + ":"+ minutes + ":" + seconds;
	}

	if($("#ulcmd").children().length > 19) document.getElementById("ulcmd").firstChild.remove();

	//make sure the ` doesnt go into the text field
	if($("#textcommand").val() != undefined && $("#textcommand").val() == "`")
	{
		document.getElementById('textcommand').value = "";	
	}

	if(currentScreen == 1) //choose
	{
		
	}

	else if(currentScreen == 2) //play
	{

		if(waveInPorgress)
		{
			if(!spawnedEnemies)
			{
				currentNotificationMessage = "Wave " + (wave+1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Has started";
				spawnEnemies();
			}
			updateEnemies();
		}
		else
		{
			allTowers.forEach(function(e){
				e.attacking = false;
			});
		}

		/* determine wether or not there is an enemy in range */
		allTowers.forEach(function(t){
			var g = false;
			//if(t.currentCooldown < t.cooldown) t.currentCooldown++;
			
			enemies.forEach(function(e){
				if(t.left != null && t.top != null && t.attack != 0 && t.range != 0)
				{
					if(circleContainsPoint({x:(t.left+(tileWidth/2)),y:(t.top+(tileWidth/2)),radius:(t.range)}, {x:(e.left + (tileWidth/2)), y:(e.top + (tileWidth/2))}))
					{
						if(t.type == 1) //saw
						{
							if(t.currentCooldown >= t.cooldown)
							{
								e.health -= t.attack;
								t.attacking = true;
								g = true;
								//t.currentCooldown = 0;
								console.log("boom");
							}

							if(t.currentCooldown < t.cooldown) t.currentCooldown++;
						}
						else if(t.type == 2) //radiation emmitter
						{
							e.health -= t.attack;
							t.attacking = true;
							g = true;
						}
						else if(t.type == 3) //sniper
						{
							if(t.currentCooldown >= t.cooldown)
							{
									var a = 0;
									for(i = 0; i <= enemies.length; i++)
									{
										if(enemies[i] != null)
										{
											if(circleContainsPoint({x:(t.left+(tileWidth/2)),y:(t.top+(tileWidth/2)),radius:(t.range)}, {x:(enemies[i].left + (tileWidth/2)), y:(enemies[i].top + (tileWidth/2))}))
											{
												var a = 1;
												//blast the fuck out of the enemy *gunshot*
												enemies[i].health -= t.attack;
												t.attacking = true;
												t.currentCooldown = 0;
												break;
											}
										}
									}

									if(!a)
									{
										
									}
								t.attacking = false;
							}

							if(t.currentCooldown < t.cooldown) t.currentCooldown++;
						}

						else if(t.type == 4)
						{
							if((t.currentCooldown >= t.cooldown) && (acid.length < trackElements.length))
							{
								var success = 0;

								while(!success)
								{
									var a = Math.floor((Math.random() * trackElements.length)+1);
									acid.forEach(function(b){
										if(b.left != undefined && b.top != undefined)
										{
											
										}
									});
								}

								t.currentCooldown = 0;
							}
						}

						else if(t.type == 5)
						{
							if(t.currentCooldown >= t.cooldown)
							{
								var a = 0;
								for(i = 0; i <= enemies.length; i++)
								{
									if(enemies[i] != null)
									{
										if(circleContainsPoint({x:(t.left+(tileWidth/2)),y:(t.top+(tileWidth/2)),radius:(t.range)}, {x:(enemies[i].left + (tileWidth/2)), y:(enemies[i].top + (tileWidth/2))}))
										{
											var a = 1;
											//blast the fuck out of the enemy *gunshot*
											
											try
											{
												enemies[i-1].health -= t.attack;
												enemies[i-1].speed *= 0.8;
											}
											catch(e){}
											enemies[i].health -= t.attack;
											try
											{
												enemies[i+1].health -= t.attack;
												enemies[i+1].speed *= 0.8;
											}
											catch(e){}
											t.attacking = true;
											t.currentCooldown = 0;
											break;
										}
									}
								}

								if(!a)
								{
									
								}

								t.attacking = false;
							}

							if(t.currentCooldown < t.cooldown) t.currentCooldown++;
						}
					}
				}
			});

			if(t.type == 1)
			{
				if(t.currentCooldown >= t.cooldown)
				{
					t.currentCooldown = 0;
					console.log("reset");
				}
			}

			if(!g)
			{
				t.attacking = false;
			}
		});
	}

	else if(currentScreen == 3) //track editor
	{

	}

	/* update cursor style depending on its region */
	if(cursorPointer)
	{
		$('canvas').css({"cursor":"pointer"});

	}
	else
	{
		$('canvas').css({"cursor":"auto"});
	}

	draw();
}

function circleContainsPoint(c, p) {
	var contains = false,
	    dx, dy,
	    x = p.x,
	    y = p.y;
 
	if (c.radius > 0 && x >= c.x - c.radius && x <= c.x + c.radius && y >= c.y - c.radius && y <= c.y + c.radius) {
		dx = (c.x - x) * (c.x - x);
		dy = (c.y - y) * (c.y - y);
 
		contains = (dx + dy) <= (c.radius * c.radius);
	}
 
	return contains;
}

function spawnEnemies()
{
	spawnedEnemies = true;
	wave++;

	enemies = []; //prevent leak by reseting the object array each round.

	var amountOfEnemies = Math.floor((Math.random() *(wave*4)) + (wave*3));

	var leftPos = 250;

	enemyHealth = 50 + (wave*50);

	var health = Math.floor((Math.random() * (enemyHealth + 20)) + (enemyHealth - 20));

	for(i = 0; i <= amountOfEnemies; i++)
	{
		var health = Math.floor((Math.random() * (enemyHealth + 20)) + (enemyHealth - 20));

		enemySerial++;

		enemies.push({
			left: leftPos,
			top: 250,
			health: health,
			originalHealth: health,
			direction: "E",
			speed: 1.5,
			offScreen: false,
			counted: false, //true if its crossing the line was already counted
			dead: false,
			serial: enemySerial, 
			size: 50
		});

		leftPos -= Math.floor((Math.random() * 90) + 30);
	}
}

function updateEnemies()
{	


	enemies.forEach(function(e){
		if(!e.offScreen)
		{
			switch(e.direction)
			{
				case 'N':
					e.top -= e.speed;
					break;

				case 'E':
					e.left += e.speed;
					break;

				case 'S':
					e.top += e.speed;
					break;

				case 'W':
					e.left -= e.speed;
					break;
			}

			grassElements.forEach(function(g){

				/*if(e.left > 300) // if the enemy is on the screen
				{
					switch(e.direction)
					{
						case 'N':
							
							break;

						case 'S':

							break;

						case 'E':
							if((e.left + e.size) > (g.left) && (e.left + e.size) < (g.left + tileWidth) && (e.top == g.top))
							{
								e.left = (g.left - tileWidth);

								grassElements.forEach(function(g2){
									if(g2.left == e.left)
									{
										if(g2.top == (e.top - e.size))
										{
											e.direction = 'N';
										}
										else if(g2.top == (e.top + e.size))
										{
											e.direction = 'S';
										}
										else
										{
											console.log("ERROR");
										}
									}
								});
							}
							break;

						case 'W':
							if(((e.left < (g.left + tileWidth))) &&     (e.left > g.left)                && (e.top == g.top))
							{

							}
							break;
						
					}
				}*/
				/*if(e.direction == 'N')
				{

				}
				else if(e.direction == 'S')
				{

				}
				else if(e.direction == 'E')
				{
					if(((e.left + e.size) > (g.left)) && ((e.left + e.size) < (g.left + tileWidth)))
					{
						e.direction = 'N';
					}
				}
				else if(e.direction == 'W')
				{

				}*/
			});

			if((e.left >= 500 && e.left <= 550) && (e.top >= 250 && e.top <= 300))//1 turn
			{
				e.direction = 'N';
			}
			if((e.left >= 500 && e.left <= 550) && (e.top >= 100 && e.top <= 150))// 2 turn
			{
				e.direction = 'W';
			}
			if((e.left >= 350 && e.left <= 400) && (e.top >= 100 && e.top <= 150))// 3 turn
			{
				e.direction = 'N';
			}
			if((e.left >= 350 && e.left <= 400) && (e.top >= 0 && e.top <= 50))// 4 turn
			{
				e.direction = 'E';
			}
			if((e.left >= 700 && e.left <= 750) && (e.top >= 0 && e.top <= 50))// 5 turn
			{
				e.direction = 'S';
			}
			if((e.left >= 700 && e.left <= 750) && (e.top >= 150 && e.top <= 200))// 6 turn
			{
				e.direction = 'W';
			}
			if((e.left >= 550 && e.left <= 600) && (e.top >= 150 && e.top <= 200))// 7 turn
			{
				e.direction = 'S';
			}
			if((e.left >= 550 && e.left <= 600) && (e.top >= 250 && e.top <= 300))// 8 turn
			{
				e.direction = 'E';
			}
			if((e.left >= 700 && e.left <= 750) && (e.top >= 250 && e.top <= 300))// 9 turn
			{
				e.direction = 'S';
			}
			if((e.left >= 700 && e.left <= 750) && (e.top >= 350 && e.top <= 400))// 10 turn
			{
				e.direction = 'W';
			}
			if((e.left >= 350 && e.left <= 400) && (e.top >= 350 && e.top <= 400))// 11 turn
			{
				e.direction = 'S';
			}
			if((e.left >= 350 && e.left <= 400) && (e.top >= 500 && e.top <= 550))// 12 turn
			{
				e.direction = 'E';
			}
			if((e.left >= 800 && e.left <= 850) && (e.top >= 500 && e.top <= 550))// 13 turn
			{
				e.direction = 'N';
			}
			if((e.left >= 800 && e.left <= 850) && (e.top >= 0 && e.top <= 50))// 14 turn
			{
				e.direction = 'E';
			}
			if((e.left > canvas.width) && (e.top >= 0 && e.top <= 50))//finished!
			{
				e.offScreen = true;
			}


			/* if the enemy died on the playing field */
			if(!e.offScreen && e.health <= 0)
			{
				e.dead = true;
				e.left = null;
				e.top = null;
				if(!e.counted && !pauseMoney)money += amountEnemiesYield;
				e.counted = true;
			}

			/* if the enemy escaped */
			if(e.offScreen && e.health > 0 && !e.counted)
			{
				lives--;
				e.counted = true;
			}
		}
	});

	if(areAllEnemiesOffScreen()) //the round has ended
	{
		waveInPorgress = false;

		//give round bonus
		roundBonus = Math.floor(200 + (4 * wave));
		if(!pauseMoney) money += roundBonus;
		currentNotificationMessage = "Round "+(wave+1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+ " Ended, "+roundBonus.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+" Money Rewarded";
	}
}

function areAllEnemiesOffScreen()
{
	var outcome = true;
	enemies.forEach(function(e){
		if(!e.offScreen && !e.dead) outcome = false;
	});
	return outcome;
}


function draw()
{
	if(currentScreen == 1) //choose
	{
		ctx.drawImage(_backDrop, 0, 0);

		ctx.globalAlpha = 0.2;
		ctx.fillStyle = "#000";
		ctx.fillRect(160, 110, 600, 400);
		ctx.globalAlpha = 1;

		ctx.fillStyle = "#fff";
		ctx.fillRect(150, 100, 600, 400); //full white box

		ctx.fillStyle = "#bbb";
		ctx.drawImage(_normal, 175, 200); //play default
		ctx.fillRect(375, 200, 150, 175); //track editor
		ctx.fillRect(575, 200, 150, 175); //insert data manually

		ctx.fillStyle = "#000";
		ctx.font = "30px Century Gothic";
		ctx.fillText("Normal", 195, 410);
		ctx.fillText("Track Editor", 365, 410);
		ctx.fillText("Track Editor", 365, 410);
		ctx.fillText("Paste Data", 570, 410);
		
	}

	else if(currentScreen == 2) //play
	{
		/* print tiles to screen */
		
		ty = 0; 
		tx = 300;

		for (var a = 0; a <= 144-1; a++) //loop through all of the data
		{
			if(tx >= ((tileWidth * 12)+300)) //if the current xPos is off the screen,
			{                                //reset it and change the yPos
				tx = 300;
				ty += tileWidth;
			}

			if(trackTiles[a] == 1) //track
			{
				ctx.drawImage(_sidewalkimg, tx, ty);
			}
			else //grass
			{
				ctx.drawImage(_grassimg, tx, ty);
			}
			
			/* draw gridlines if apllicable */
			if(enableGridlines)
			{
				ctx.strokeStyle = "#555";
				ctx.strokeRect(tx, ty, tileWidth, tileWidth);
			}

			tx += tileWidth;
		}

		acid.forEach(function(a){
			ctx.drawImage(_acid, a.left, a.top);
		});

		/* attacking animation/.png */
		allTowers.forEach(function(e){
			//console.log(e.attacking);

			if(e.attacking)
			{
				switch(e.type)
				{
					case 1:
						//ctx.drawImage(_tower1attack, e.left - 75, e.top - 75);
						break;

					case 2:
						ctx.drawImage(_tower2attack, e.left - 75, e.top - 75);
						//console.log("attack animation called");

						break;

					case 3:
						break;

					default:
						alert("Error");
				}
			}//
		});

		/* enemies */
		enemies.forEach(function(e){
			if(!e.dead) ctx.drawImage(_enemy2, e.left, e.top);
			if(enemybox)
			{
				ctx.strokeStyle = "black";
				if(!e.dead) ctx.strokeRect(e.left, e.top, e.size, e.size);
			}
		});

		/* enemy health bar */
		enemies.forEach(function(e){
			if(!e.dead)
			{
				switch(healthbar)
				{
					case 0: //top
						ctx.fillStyle = "#F00";
						ctx.fillRect(e.left, e.top-10, 50, 5);
						ctx.fillStyle = "#0F0";
						ctx.fillRect(e.left, e.top-10, Math.floor((e.health/e.originalHealth)*50), 5);
						break;

					case 1: //right
						ctx.fillStyle = "#F00";
						ctx.fillRect(e.left + 53, e.top, 5, 50);
						ctx.fillStyle = "#0F0";
						ctx.fillRect(e.left + 53, e.top + (50 - Math.floor((e.health/e.originalHealth)*50)), 5, Math.floor((e.health/e.originalHealth)*50));
						break;

					case 2: //bottom
						ctx.fillStyle = "#F00";
						ctx.fillRect(e.left, e.top+55, 50, 5);
						ctx.fillStyle = "#0F0";
						ctx.fillRect(e.left, e.top+55, Math.floor((e.health/e.originalHealth)*50), 5);
						break;

					case 3: //left
						ctx.fillStyle = "#F00";
						ctx.fillRect(e.left -8, e.top, 5, 50);
						ctx.fillStyle = "#0F0";
						ctx.fillRect(e.left -8, e.top + (50 - Math.floor((e.health/e.originalHealth)*50)), 5, Math.floor((e.health/e.originalHealth)*50));
						break;
				}
			}
		});

		/* select a tower */
		/* show the range */
		allTowers.forEach(function(e){
			if(selectedTile[0] == e.left && selectedTile[1] == e.top)
			{
				ctx.beginPath();
				ctx.globalAlpha = 0.5;
	      		ctx.arc(e.left + (tileWidth/2), e.top + (tileWidth/2), e.range, 0, 2 * Math.PI, false);
	      		ctx.fillStyle = '#eee';
	      		ctx.fill();
	      		ctx.globalAlpha = 1;
			}
		});

		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 300, canvas.height);

		/* _cashsign */
		ctx.drawImage(_cashsign, 20, 200);
		ctx.font = "30px Courier New";
		ctx.fillStyle = "black";
		ctx.fillText(money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 55, 225);

		/* _heart */
		ctx.drawImage(_heart, 20, 240);
		ctx.font = "30px Courier New";
		ctx.fillText(lives, 55, 265);

		/* open console */
		ctx.fillStyle = "#BBB";
		ctx.font = "18px Courier New";
		ctx.fillRect(200, 200, 80, 60);
		ctx.fillStyle = "#000";
		ctx.fillText("Open", 218, 220);
		ctx.fillText("Console", 202, 245);

		/* enable grids _checkbox */
		ctx.font = "15px Century Gothic";
		ctx.fillText("Enable Gridlines", 20, 296);

		ctx.drawImage(_checkbox1, 155, 283);

		if(enableGridlines)
		{
			ctx.drawImage(_checkbox2, 155, 283);
		}
		else 
		{

			ctx.drawImage(_checkbox2, 147, 283);
		}

		/* sound checkbox */
		ctx.fillText("Sound", 200, 296);

		ctx.drawImage(_checkbox1, 250, 283);

		if(enableSound)
		{
			ctx.drawImage(_checkbox2, 250, 283);
		}
		else 
		{

			ctx.drawImage(_checkbox2, 242, 283);
		}

		/* Towers icons */
		ctx.fillStyle = "#BBB";
		//row 1
		ctx.drawImage(_tower1icon, 10, 320);
		if(towerCost(1) > money) ctx.drawImage(_lockedItem,  10, 320);

		ctx.drawImage(_tower2icon, 82.5, 320);
		if(towerCost(2) > money) ctx.drawImage(_lockedItem, 82.5, 320);

		ctx.drawImage(_tower3icon, 155, 320);
		if(towerCost(3) > money) ctx.drawImage(_lockedItem, 155, 320);

		ctx.drawImage(_tower4icon, 227.5, 320);
		if(towerCost(4) > money) ctx.drawImage(_lockedItem, 227.5, 320);

		//row2
		ctx.drawImage(_tower5icon, 10, 440);
		if(towerCost(5) > money) ctx.drawImage(_lockedItem, 10, 440);

		ctx.fillRect(82.5, 440, 63, 100);
		if(towerCost(6) > money) ctx.drawImage(_lockedItem, 82.5, 440);

		ctx.fillRect(155, 440, 63, 100);
		if(towerCost(7) > money) ctx.drawImage(_lockedItem, 155, 440);

		ctx.fillRect(227.5, 440, 63, 100);
		if(towerCost(8) > money) ctx.drawImage(_lockedItem, 227.5, 440);


		/* Start Wave button */
		if(!waveInPorgress)
		{
			ctx.drawImage(_startwave, 10, 550);
		}

		/* towers */
		allTowers.forEach(function(e){
			if(e.left != null && e.top != null)
			{
				switch (e.type)
				{
					case 1:
						ctx.drawImage(_tower1, e.left, e.top);
						break;

					case 2:
						ctx.drawImage(_tower2, e.left, e.top);
						break;

					case 3:
						ctx.drawImage(_tower3_0, e.left, e.top);
						var a = 0;
						for(i = 0; i <= enemies.length; i++)
						{
							if(enemies[i] != null)
							{
								if(circleContainsPoint({x:(e.left+(tileWidth/2)),y:(e.top+(tileWidth/2)),radius:(e.range)}, {x:(enemies[i].left + (tileWidth/2)), y:(enemies[i].top + (tileWidth/2))}))
								{
									var a = 1;
									rotateImg(_tower3_1, e.left, e.top, (Math.atan2((enemies[i].top - e.top),(enemies[i].left - e.left)) * 180 / Math.PI)+90);
									break;
								}
							}
						}

						if(!a)
						{
							ctx.drawImage(_tower3_1, e.left, e.top);
						}
						break;

					case 4:
						ctx.drawImage(_tower4, e.left, e.top);
						break;

					case 5:
						ctx.drawImage(_tower5_0, e.left, e.top);
						var a = 0;
						for(i = 0; i <= enemies.length; i++)
						{
							if(enemies[i] != null)
							{
								if(circleContainsPoint({x:(e.left+(tileWidth/2)),y:(e.top+(tileWidth/2)),radius:(e.range)}, {x:(enemies[i].left + (tileWidth/2)), y:(enemies[i].top + (tileWidth/2))}))
								{
									var a = 1;
									rotateImg(_tower5_1, e.left, e.top, (Math.atan2((enemies[i].top - e.top),(enemies[i].left - e.left)) * 180 / Math.PI)+90);
									break;
								}
							}
						}

						if(!a)
						{
							ctx.drawImage(_tower5_1, e.left, e.top);
						}

						/*enemies.forEach(function(i){*/
							/*if(circleContainsPoint({x:(e.left+(tileWidth/2)),y:(e.top+(tileWidth/2)),radius:(e.range)}, {x:(enemies[0].left + (tileWidth/2)), y:(enemies[0].top + (tileWidth/2))}))
							{
								rotateImg(_tower5_1, e.left, e.top, (Math.atan2((enemies[0].top - e.top),(enemies[0].left - e.left)) * 180 / Math.PI)+90);
								console.log(Math.atan2((enemies[0].top - e.top),(enemies[0].left - e.left)) * 180 / Math.PI);
							}
							else
							{
								ctx.drawImage(_tower5_1, e.left, e.top);
							}*/
						/*});*/
						
						break;

					case 6:
						ctx.drawImage(_tower6, e.left, e.top);
						break;

					case 7:
						ctx.drawImage(_tower7, e.left, e.top);
						break;

					case 8:
						ctx.drawImage(_tower8, e.left, e.top);
						break;

					default:
						alert("Error");
				}
			}
		});

		ctx.font = hudsize+"px "+hudfont;
		/* wave counter in the top left corner */
		ctx.fillStyle = hudcolor;
		ctx.fillText("Wave "+ wave.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 310, ((hudsize / 2) + 15));

		/* average enemy health counter bottom left */
		ctx.fillText("Ave. Health "+ enemyHealth.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 310, 590);
		ctx.fillStyle = "#fff";

		/* trash can */
		ctx.drawImage(_trashcan, 870, 570);

		/* hover animation */
		ctx.drawImage(_hoveranim, current_HoverAnim[0], current_HoverAnim[1]);

		/* selected tile */
		ctx.drawImage(_hoveranim, selectedTile[0], selectedTile[1]);

		/* draw _logo */
		ctx.drawImage(_logo, 0, 0);

		/* notification pane */
		ctx.fillStyle = "white";
		ctx.font = "15px Century Gothic";
		ctx.globalAlpha = 0.5;
		ctx.fillRect(400, 2, 400, 20);
		ctx.fillStyle = "black";
		ctx.globalAlpha = 1;
		ctx.fillText(currentNotificationMessage, 410, 17);
	}

	else if(currentScreen == 3) //editior
	{
		ctx.fillText("Select Tile Type", 35, 235);

		ctx.drawImage(_grassimg, 55, 260);
		ctx.drawImage(_sidewalkimg, 180, 260);

		ctx.strokeStyle = "#000";

		if(selectTileChoice)
		{	
			ctx.strokeRect(180, 260, 50, 50);
		}
		else
		{
			ctx.strokeRect(55, 260, 50, 50);
		}

		ctx.fillText("Have 1 tile on the", 20, 360);
		ctx.fillText("Left and 1 tile on", 25, 400);
		ctx.fillText("the right", 85, 440);

		//shadow effect
		ctx.globalAlpha = 0.4;
		ctx.fillStyle = "#000";
		ctx.fillRect(25, 475, 260, 50);
		ctx.globalAlpha = 1;

		ctx.fillStyle = "#BBB"
		ctx.fillRect(20, 470, 260, 50);
		ctx.fillStyle = "#000";
		ctx.fillText("Submit Track", 60, 505);

		ty = 0; 
		tx = 300;

		for (var a = 0; a <= 144-1; a++) //loop through all of the data
		{
			if(tx >= ((tileWidth * 12)+300)) //if the current xPos is off the screen,
			{                                //reset it and change the yPos
				tx = 300;
				ty += tileWidth;
			}

			if(trackTilesEdit[a] == 1) //track
			{
				ctx.drawImage(_sidewalkimg, tx, ty);
			}
			else //grass
			{
				ctx.drawImage(_grassimg, tx, ty);
			}
			
			/* draw gridlines if apllicable */
			if(enableGridlines)
			{
				ctx.strokeStyle = "#555";
				ctx.strokeRect(tx, ty, tileWidth, tileWidth);
			}

			tx += tileWidth;
		}

		trackElementsEdit.forEach(function(e){
			ctx.drawImage(_sidewalkimg, e.left, e.top);
		});

		/* hover animation */
		ctx.drawImage(_hoveranim, current_HoverAnim[0], current_HoverAnim[1]);

		/* draw _logo */
		ctx.drawImage(_logo, 0, 0);
	}

	/* create canvas border */
		ctx.strokeStyle = "#AAA";
		ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

/* opens the box */
function cmdOpenBox()
{
	if(!cmdOpen)
	{
		cmdOpen = true;

		$("#console").slideDown(100);

		/*if(!cmdHasBeenOpened)
		{*/
			$("<div/>", {
		   		id: 'closeButton',
		   		onClick: 'cmdCloseBox()'
			}).appendTo("#closeBoxContainer");

			document.getElementById('closeButton').innerHTML = "X";

			/* add the command line and submit button to the DOM */
			$("<input/>", {
		   		id: 'textcommand',
		    	name: 'textcommand',
		    	autofocus: 'true',
		    	autocomplete: 'off'
			}).appendTo("#consoleForm");

			$("<input/>", {
				type: 'button',
				id: 'submitButton',
				autocomplete: 'true',
		   		value: 'Submit',
		   		onClick: 'cmdHandle($("#textcommand").val())'
			}).appendTo("#consoleForm");

			$("#textcommand").focus();

			$("#textcommand").keypress(function(e) {
			    var chr = String.fromCharCode(e.which);
			    if (" -_.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".indexOf(chr) < 0)
			        return false;
			});

			cmdHasBeenOpened = true;
		/*}*/
	}
}

function rotateImg(img, x, y, degrees)
{
	ctx.save();
	ctx.translate(x+(tileWidth/2),y+(tileWidth/2));
	ctx.rotate(degrees*Math.PI/180);
	ctx.drawImage(img,-25,-25);
	ctx.restore();
}

/* closes the box */
function cmdCloseBox()
{
	if(cmdOpen)
	{
		cmdOpen = false;

		$("#console").slideUp(100);
		$("#closeButton").remove();
		$("#submitButton").remove();
		$("#textcommand").remove();
	}
}

function cmdHandle(result) //handles
{
	//clear the text field
	document.getElementById('textcommand').value = "";

	if (!result.replace(/\s/g, '').length) {
	    cmdCloseBox();
	}

	else
	{
		linumber++;

		$("<li/>", {
	   		id: linumber
		}).appendTo("#ulcmd");

		var d = new Date();
		var seconds;
		var minutes;
		if(d.getSeconds() < 10) seconds = "0" + d.getSeconds();
		else seconds = d.getSeconds();
		if(d.getMinutes() < 10) minutes = "0" + d.getMinutes();
		else minutes = d.getMinutes();

		document.getElementById(linumber).innerHTML = "[" + d.getHours() + ":"+ minutes + ":" + seconds + "]" + " > " + result;
		$("#"+linumber).addClass("cmdli");
		$("#"+linumber).hide();
		$("#"+linumber).slideDown(100);

		var serverResponse = "command successful!";
	}	

	if (result != null && result != "" && result != " " && result.replace(/\s/g, '').length) //if it is not empty
	{
	    cmdArray = result.toLowerCase().split(" ");

	    switch(cmdArray[0])
	    {
	    	case "tower":
	    		if(cmdArray[1] != null)
	    		{
			    	var newtype = null; //defaults will be changed below
			    	var newrange = null; //if a new tower is being built
			    	var newattack = null;
			    	var newcooldown = null;
			    	var makeTower = true;
			    				
		    		switch(cmdArray[1])
		    		{
			    		case 'saw':
			    			newtype = 1;
			    			newrange = 100;
			    			newattack = 0.23;
			    			break;

			    		case 'radiation':
			    			newtype = 2;
			    			newrange = 100;
			    			newattack = 0.35;
			    			break;

			    		case 'sniper':
			    			newtype = 3;
			    			newrange = 200;
			    			newattack = 0.5;
			    			newcooldown = 300;
			    			break;

			    		case 'acid':
			    		case 'acidrain':
			    			/*newtype = 3;
			    			newrange = 200;
			    			newattack = 0.5;*/
			    			break;

			    		case 'water':
			    		case 'waterblaster':
			    			newtype = 5;
			    			newrange = 100;
			    			newattack = 30;
			    			newcooldown = 80;
			    			break;
				   
			    		default:
			    			serverResponse = "command unknown";
			    			makeTower = false;
			    	}

		    		if(makeTower)
				    {
				    	if(cmdArray[2] != null && !isNaN(cmdArray[2])) //range
				    	{
				    		newrange = parseInt(cmdArray[2]);
				    	}

				    	if(cmdArray[3] != null && !isNaN(cmdArray[3])) //attack
				    	{
				    		newattack = parseInt(cmdArray[3]);
				    	}

				    	var success = false;

				    	if(selectedTile[0] != null || selectedTile[1] != null)
				    	{
					    	allTowers.push({
								left: selectedTile[0],
								top: selectedTile[1], 
								type: newtype, 
								range: newrange,
								attack: newattack, 
								attacking: false,
								currentCooldown: 0,
								cooldown: newcooldown
							});
							success = true;
				    	}
				    	else if(cmdArray[4] != null && !isNaN(cmdArray[4]) && cmdArray[5] != null && !isNaN(cmdArray[5]))
				    	{	
				    		if(isTileClear((((cmdArray[4]-1)*50)+300), ((cmdArray[5]-1)*50)))
				    		{
					    		grassElements.forEach(function(e){
					    			if(e.left == (((cmdArray[4]-1)*50)+300) && e.top == ((cmdArray[5]-1)*50))
					    			{
					    		    	allTowers.push({
					    					left: (((cmdArray[4]-1)*50)+300),
					    					top: ((cmdArray[5]-1)*50), 
					    					type: newtype, 
					    					range: newrange,
					    					attack: newattack, 
					    					attacking: false
					    				});
					    				success = true;
				    		    	}
			    				});	
		    				}		
		    				else //there is a tower there
		    				{
		    					$.each(allTowers, function(i){
		    					    if(allTowers[i].left == (((cmdArray[4]-1)*50)+300) && allTowers[i].top == ((cmdArray[5]-1)*50)) {
		    					        allTowers.splice(i,1);
		    					        return false;
		    					    }
		    					});

    					    	allTowers.push({
    								left: (((cmdArray[4]-1)*50)+300),
    								top: ((cmdArray[5]-1)*50), 
    								type: newtype, 
    								range: newrange,
    								attack: newattack, 
    								attacking: false
    							});
    							success = true;
		    				}	
				    	}
				    	else
				    	{
				    		serverResponse = "tower could not be create becuase no location was provided";
				    	}

				    	if(success) serverResponse = "tower created successfully";
		    			else serverResponse = "tower could not be create because the coordinates provided were not valid";
					}
				}

				else
				{
					serverResponse = "tower could not be create becuase no tower type was provided";
				}
	    		break;

	    	case "spawn-pref":
		    	switch(cmdArray[1])
		    	{
		    		case "spawn":
		    			var newamount = 1;
			    		var newhealth = enemyHealth;
			    		var newspeed = 1.5;

			    		if(cmdArray[2] != null && !isNaN(cmdArray[2])) //amount
			    		{
			    			newamount = parseInt(cmdArray[2]);
			    		}

			    		if(cmdArray[3] != null && !isNaN(cmdArray[3])) //health
			    		{
			    			newhealth = parseInt(cmdArray[3]);
			    		}

			    		if(cmdArray[4] != null && !isNaN(cmdArray[4])) //speed
			    		{
			    			newspeed = parseInt(cmdArray[4]);
			    		}

			    		var leftPos2 = 250;

			    		for(i = 1; i <= newamount; i++)
			    		{
			    			enemySerial++;

				    		enemies.push({
					    		left: leftPos2,
					    		top: 250,
					    		health: newhealth,
					    		originalHealth: newhealth,
					    		direction: "E",
					    		speed: newspeed,
					    		offScreen: false,
					    		counted: false, //true if its crossing the line was already counted
					    		dead: false,
					    		serial: enemySerial, 
					    		size: 50
					    	});

					    	leftPos2 -= Math.floor((Math.random() * 90) + 30);
			    		}

			    		serverResponse = "spawned " + newamount + " enemies successfully!";

				    	spawnedEnemies = true;
				    	waveInPorgress = true;
		    			break;

		    		case "enpic":
		    			_enemy2.src = cmdArray[2];
		    			serverResponse = "enemy pic modified successfully!";
		    			break;

		    		case "healthbar":
		    			switch(cmdArray[2])
		    			{
		    				case "top":
		    				case "north":
		    					healthbar = 0;
		    					serverResponse = "healthbar modified to '" + cmdArray[2] + "' successfully!";
		    					break;

		    				case "right":
		    				case "east":
		    					healthbar = 1;
		    					break;

		    				case "bottom":
		    				case "south":
		    					healthbar = 2;
		    					break;

		    				case "left":
		    				case "west":
		    					healthbar = 3;
		    					break;

		    				default:
	    				serverResponse = "command unknown";
		    					break;
		    			}
		    			break;

		    		default:
	    				serverResponse = "command unknown";
		    			break;
		    	}
	    		break;

	    	case "modvar":
	    		switch(cmdArray[1])
		    	{
		    		case "money":
		    			if(cmdArray[2] != null && !isNaN(cmdArray[2]) && cmdArray[2] >= 0)
		    			{
		    				money = parseInt(cmdArray[2]);
		    				serverResponse = cmdArray[1] + " variable modified successfully!";
		    			}
		    			break;

		    		case "lives":
		    			if(cmdArray[2] != null && !isNaN(cmdArray[2]) && cmdArray[2] >= 0)
		    			{
		    				lives = parseInt(cmdArray[2]);
		    				serverResponse = cmdArray[1] + " variable modified successfully!";
		    			}
		    			break;

		    		case "wave":
		    			if(cmdArray[2] != null && !isNaN(cmdArray[2]) && cmdArray[2] >= 0)
		    			{
		    				wave = parseInt(cmdArray[2]);
		    				serverResponse = cmdArray[1] + " variable modified successfully!";
		    			}
		    			break;

		    		case "aveenemyhealth":
		    			if(cmdArray[2] != null && !isNaN(cmdArray[2]) && cmdArray[2] >= 0)
		    			{
		    				enemyHealth = parseInt(cmdArray[2]);
		    				serverResponse = cmdArray[1] + " variable modified successfully!";
		    			}
		    			break;

		    		default:
	    				serverResponse = "command unknown";
		    			break;
		    	}
	    		break;

	    	case "delete":
	    		if(cmdArray[1] != null)
	    		{
	    			switch(cmdArray[1])
	    			{
	    				/*case "save":
	    					eraseCookie("money");
	    					eraseCookie("lives");
	    					eraseCookie("wave");
	    					eraseCookie("gridlines");
	    					eraseCookie("sound");
	    					eraseCookie("hudsize");
	    					eraseCookie("hudcolor");
	    					eraseCookie("enemypic");
	    					break;*/

	    				default:    					
	    					serverResponse = "command unknown";
				    		if(cmdArray[1] != null && !isNaN(cmdArray[1]) && cmdArray[2] != null && !isNaN(cmdArray[2]))
				    		{
				    			if(!isTileClear((((cmdArray[1]-1)*50)+300), ((cmdArray[2]-1)*50)))
				    			{

				    				allTowers.forEach(function(e){
										$.each(allTowers, function(i){
										    if(allTowers[i].left == e.left && allTowers[i].top == e.top) {
										        allTowers.splice(i,1);
										        return false;
										    }
										});
						    			//give money back
						    			moneyBack = Math.floor( 0.45 * (towerCost(e.type)));
						    			if(!pauseMoney) money += moneyBack;

						    			//display notification
						    			currentNotificationMessage = "Tower sold for "+moneyBack.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " money";
										
										serverResponse = "tower deleted successfully!";
									});
				    			}
				    		}
	    					break;
	    			}
	    		}
	    		else
	    		{
		    		if(selectedTile[0] != null || selectedTile[1] != null) //if you have a tile selected
		    		{
		    			if(!isTileClear(selectedTile[0], selectedTile[1]))
		    			{
		    				allTowers.forEach(function(e){
		    					if(e.left == selectedTile[0] && e.top == selectedTile[1])
		    					{
		    						$.each(allTowers, function(i){
		    						    if(allTowers[i].left == e.left && allTowers[i].top == e.top) {
		    						        allTowers.splice(i,1);
		    						        return false;
		    						    }
		    						});
		    		    			//give money back
		    		    			moneyBack = Math.floor( 0.45 * (towerCost(e.type)));
		    		    			if(!pauseMoney) money += moneyBack;

		    		    			//display notification
		    		    			currentNotificationMessage = "Tower sold for "+moneyBack.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " money";

		    		    			//have no tile selected
		    						selectedTile[0] = null;
		    						selectedTile[1] = null;

		    						serverResponse = "tower deleted successfully!";
		    					}
		    				});
		    			}
		    		}
	    		}
	    		break;

	    	case "enable":
	    		switch(cmdArray[1])
		    	{
		    		case "gridlines":
		    			enableGridlines = !enableGridlines;
		    			serverResponse = cmdArray[1] + " enabled";
		    			break;

		    		case "sound":
		    			enableSound = !enableSound;
		    			serverResponse = cmdArray[1] + " enabled";
		    			break;

		    		default:
	    				serverResponse = "command unknown";
		    			break;
		    	}
	    		break;

	    	case "hud":
	    		switch(cmdArray[1])
		    	{
		    		case "size":
		    			serverResponse = "HUD " + cmdArray[1] + " modified successfully!";
		    			if(cmdArray[2] != null && !isNaN(cmdArray[2]) && cmdArray[2] >= 0) hudsize = cmdArray[2];
		    			if(cmdArray[2] == null || isNaN(cmdArray[2]) || cmdArray[2] < 0 || cmdArray[2] == "default")
		    			{ 
		    				hudsize = 15;
		    				serverResponse = "HUD " + cmdArray[1] + " defaulted successfully!";
		    			}
		    			
		    			break;

		    		case "color":
		    			
		    				hudcolor = cmdArray[2];
		    				serverResponse = "HUD " + cmdArray[1] + " modified successfully!";
		    			
		    				if(cmdArray[2] == "default")
		    				{
		    					hudcolor = "white";
		    					serverResponse = "HUD " + cmdArray[1] + " defaulted successfully!";
		    				}

		    			break;

		    		case "font":
		    			if(cmdArray.length == 5) hudfont = cmdArray[2] + " " + cmdArray[3] + " " + cmdArray[4];
		    			else if(cmdArray.length == 4) hudfont = cmdArray[2] + " " + cmdArray[3];
		    			else if(cmdArray.length == 3) hudfont = cmdArray[2];
		    			serverResponse = "HUD " + cmdArray[1] + " modified successfully!";
		    			break;

		    		default:
	    				serverResponse = "command unknown";
		    			break;
		    	}
	    		break;

	    	case "endwave":
	    	case "end":
	    	case "waveend":
	    		if(waveInPorgress)
	    		{
	    			waveInPorgress = false;
	    			enemies = [];
	    			serverResponse = "wave ended";
	    		}
	    		else
	    		{
	    			serverResponse = "no wave in progress";
	    		}
	    		break;

	    	case "startwave":	    	
	    	case "start":
	    	case "wavestart":
	    		if(!waveInPorgress)
	    		{
	    			waveInPorgress = true;
	    			serverResponse = "wave started";
	    		}
	    		else
	    		{
	    			serverResponse = "wave already in progress";
	    		}
	    		break;

	    	case "debug":
	    		switch(cmdArray[1])
	    		{
	    			case "enemybox":
	    				enemybox = !enemybox;
	    				serverResponse = "enemy boxes set to " + enemybox;
	    				break;

	    			default:
	    				serverResponse = "command unknown";
	    				break;
	    		}
	    		break;

	    	case "pausevar":
	    		switch(cmdArray[1])
	    		{
	    			case "money":

	    				break;

	    			case "lives":

	    				break;

	    			case "wave":

	    				break;
	    				
	    			default:
	    				serverResponse = "command unknown";
	    				break;
	    		}
	    		break;	

	    	case "clear":
	    		switch(cmdArray[1])
	    		{
	    			case "console":
	    				document.getElementById("ulcmd").innerHTML = "";
	    				serverResponse = "console cleared successfully!";
	    				break;

	    			case "save":
	    					eraseCookie("money");
	    					eraseCookie("lives");
	    					eraseCookie("wave");
	    					eraseCookie("gridlines");
	    					eraseCookie("sound");
	    					eraseCookie("hudsize");
	    					eraseCookie("hudcolor");
	    					eraseCookie("enemypic");
	    					eraseCookie("healthbar");
	    					serverResponse = "save and cookies cleared successfully!";
	    					break;

	    			default:
	    				serverResponse = "command unknown";
	    				break;
	    		}
	    		break;

	    	case "pause":
	    		
	    		break;

	    	case "styche":
    			if(cunfrim) //turn it back
    			{
    				_grassimg.src = "assets/images/grass.png";
	    		    _sidewalkimg.src = "assets/images/sidewalk.png";
	    		    _tower1.src = "assets/images/tower1.png";
	    		    _tower2.src = "assets/images/tower2.png";
	    		    _tower3.src = "assets/images/tower3.png";
	    		    _enemy1.src = "assets/images/enemy1.png";
	    		    _enemy2.src = "assets/images/enemy2.png";
	    		    serverResponse = "the dank memes have been reset";
	    		    cunfrim = 0;
    			}
    			else //turn everything styche
    			{
    				var r = confirm("Are you_ready for this.mp4.avi xD");
    				if (r)
    				{
		    		    _grassimg.src = "assets/images/stychegrass.jpg";
		    		    _sidewalkimg.src = "assets/images/stychetrack.png";
		    		    _tower1.src = "assets/images/styche.jpg";
		    		    _tower2.src = "assets/images/styche.jpg";
		    		    _tower4.src = "assets/images/styche.jpg";
		    		    _tower3_1.src = "assets/images/styche.jpg";
		    		    _tower5_1.src = "assets/images/styche.jpg";
		    		    _enemy1.src = "assets/images/styche.jpg";
		    		    _enemy2.src = "assets/images/styche.jpg";
		    		    serverResponse = "darude_memestorm.mp5 enabled";
		    		    cunfrim = 1;
	    			}
				}	    		    
	    		break;

	    	case "describe":
	    		var success = false;

				allTowers.forEach(function(e){
					if(selectedTile[0] != null || selectedTile[1] != null) //if you have a tile selected
					{
    					if(e.left == selectedTile[0] && e.top == selectedTile[1])
    					{
    						success = true;
    						serverResponse = "[location-x: "+(((e.left-300)/50)+1)+" ]"+
    										 "[location-y: "+((e.top/50)+1)+" ]"+
    										 "[type: "+(e.type)+" ]"+
    										 "[range: "+(e.range)+" ]"+
    										 "[attack: "+(e.attack)+" ]";
    					}
    				}

    				else if(cmdArray[1] != null && cmdArray[2] != null) //if you inputed the data manually
    				{
    					if(!isNaN(cmdArray[1]) && !isNaN(cmdArray[2]))
    					{
	    					if(e.left == (((parseInt(cmdArray[1])-1)*50)+300) && e.top == ((parseInt(cmdArray[2])-1)*50))
	    					{
	    						success = true;
	    						serverResponse = "[location-x: "+(((e.left-300)/50)+1)+" ]"+
	    										 "[location-y: "+((e.top/50)+1)+" ]"+
	    										 "[type: "+(e.type)+" ]"+
	    										 "[range: "+(e.range)+" ]"+
	    										 "[attack: "+(e.attack)+" ]";
	    					}
    					}

    					else
    					{
    						serverResponse = "failed command execution due to non integer input(s)";
    					}
    				}

    				else
    				{

    					serverResponse = "command unknown";
    				}
				});
				
				makeTower = false;
				if(!success) serverResponse = "unable to locate tower with given coordinates";
	    		break;

	    	case "save":
	    		if(cmdArray[1] != null)
	    		{
		    		switch(cmdArray[1])
		    		{
		    			case "":
		    				break;

		    			default:
		    				serverResponse = "command unknown";
		    		}
	    		}
	    		else
	    		{
	    			if(readCookie("money") != "") eraseCookie("money");
	    			createCookie("money", money, 7);

	    			if(readCookie("lives") != "") eraseCookie("lives");
	    			createCookie("lives", lives, 7);

	    			if(readCookie("wave") != "") eraseCookie("wave");
	    			createCookie("wave", wave, 7);

	    			if(readCookie("gridlines") != "") eraseCookie("gridlines");
	    			if(enableGridlines)
	    			{
	    				createCookie("gridlines", "1", 7);
	    			}
	    			else
	    			{
	    				createCookie("gridlines", "0", 7);
	    			}

	    			if(readCookie("sound") != "") eraseCookie("sound");
	    			if(enableSound)
	    			{
	    				createCookie("sound", "1", 7);
	    			}
	    			else
	    			{
	    				createCookie("sound", "0", 7);
	    			}

	    			if(readCookie("hudsize") != "") eraseCookie("hudsize");
	    			createCookie("hudsize", hudsize, 7);

	    			if(readCookie("hudcolor") != "") eraseCookie("hudcolor");
	    			createCookie("hudcolor", hudcolor, 7);

	    			if(readCookie("enemypic") != "") eraseCookie("enemypic");
	    			createCookie("enemypic", _enemy2.src, 7);

	    			if(readCookie("healthbar") != "") eraseCookie("healthbar");
	    			createCookie("healthbar", healthbar, 7);
	    		}

	    		serverResponse = "game saved successfully! save will expire in 7 days unless overwritten";
	    		break;

	    	case "load":
	    		if(readCookie("money") != null) money = parseInt(readCookie("money"));
	    		if(readCookie("lives") != null) lives = parseInt(readCookie("lives"));
	    		if(readCookie("wave") != null) wave = parseInt(readCookie("wave"));
	    		if(readCookie("gridlines") != null){
	    			if(readCookie("gridlines") == "0") enableGridlines = false;
	    			else enableGridlines = true;
	    		}
	    		if(readCookie("sound") != null){
	    			if(readCookie("sound") == "0") enableSound = false;
	    			else enableSound = true;
	    		}
	    		if(readCookie("hudsize") != null) hudsize = parseInt(readCookie("hudsize"));
	    		if(readCookie("hudcolor") != null) hudcolor = readCookie("hudcolor");
	    		if(readCookie("enemypic") != null) _enemy2.src = readCookie("enemypic");
	    		if(readCookie("healthbar") != null) healthbar = parseInt(readCookie("healthbar"));
	    		
	    		//if there is not save
	    		if(readCookie("money") == null &&
	    			readCookie("lives") == null &&
	    			readCookie("wave") == null &&
	    			readCookie("gridlines") == null &&
	    			readCookie("sound") == null &&
	    			readCookie("hudsize") == null &&
	    			readCookie("hudcolor") == null &&
	    			readCookie("enemypic") == null &&
	    			readCookie("healthbar") == null)
	    		{
	    			serverResponse = "no save to load from";
	    		}
	    		else
	    		{
	    			serverResponse = "save loaded successfully!";
	    		}
	    		break;

	    	case "print":
	    		var x = "";

	    		for(i = 1; i <= cmdArray.length-1; i++)
	    		{
	    			x += (cmdArray[i] + " ");
	    		}

	    		serverResponse = x;
	    		break;

	    	case "test":
	    		/*var theArray = [1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1,
	    						1,0,1,0,1,0,1,1,0,0,0,1];
	    		var encoded = "";
	    		for(i = 0; i<theArray.length; i++)
	    		{
	    			var x = Math.floor((Math.random() * 5) + 1);
	    			var y = Math.floor(Math.random() * 2);

	    			if(theArray[i]) //track
	    			{
	    				switch(x)
	    				{
	    					case 1:
	    						encoded += "*$#";
	    						break;

	    					case 2:
	    						encoded += "!@^";
	    						break;

	    					case 3:
	    						encoded += "$*^@";
	    						break;

	    					case 4:
	    						encoded += "$$#^";
	    						break;

	    					case 5:
	    						encoded += "!@#!*^";
	    						break;
	    				}
	    			}
	    			else
	    			{
	    				switch(x)
	    				{
	    					case 1:
	    						encoded += "##^*@!";
	    						break;

	    					case 2:
	    						encoded += "@#^!";
	    						break;

	    					case 3:
	    						encoded += "!*^";
	    						break;

	    					case 4:
	    						encoded += "@#^^$";
	    						break;

	    					case 5:
	    						encoded += "!*$$";
	    						break;
	    				}
	    			}

	    			if(y) encoded += "%";
	    			else encoded += "&"
	    		}*/

	    		encoded = cmdArray[1];

	    		var split = encoded.split(/&|%/);
	    		var array = [];
	    			for(i = 0; i<split.length; i++) 
	    			{
	    				if(split[i] == "*$#" ||
	    					split[i] == "!@^" ||
	    					split[i] == "$*^@" ||
	    					split[i] == "$$#^" ||
	    					split[i] == "!@#!*^") array.push(1);

	    				else if(split[i] == "##^*@!" ||
	    					split[i] == "@#^!" ||
	    					split[i] == "!*^" ||
	    					split[i] == "@#^^$" ||
	    					split[i] == "!*$$") array.push(0);
	    			}

	    		for(i = 0; i<144; i++)
	    		{
	    			trackTiles[i] = array[i];
	    		}
	    		break;
	    		
	    	default:
	    		serverResponse = "command unknown. for documentation, scroll down.";
	    		break;
	    }

    	linumber++;

    	$("<li/>", {
       		id: linumber
    	}).appendTo("#ulcmd");

    	document.getElementById(linumber).innerHTML = "> " + serverResponse;
    	$("#"+linumber).addClass("resultli");    	
		$("#"+linumber).hide();
		$("#"+linumber).slideDown(100);
	}
}

function clearCanvas() 
{
	ctx.clearRect(0, 0, W, H);
}

function isTileClear(selX, selY)
{
	var isClear = true; // is true by default unless the below function sets it to false. returns the result of isClear

	allTowers.forEach(function(e){
		if(e.top == selY && e.left == selX)
		{
			isClear = false;
		}
	});

	return isClear;
}

/* handle canvas "click" events */
canvas.addEventListener("click", function(event) {
	var mousePos = getMousePos(canvas, event);

	if(currentScreen == 1) //choose
	{
		//normal
		if(isCursorWithinBounds(175, 325, 200, 375, mousePos.x, mousePos.y))
		{
			currentScreen = 2;
			init();
		}

		//track editor
		else if(isCursorWithinBounds(375, 525, 200, 375, mousePos.x, mousePos.y))
		{
			currentScreen = 3;
			init();
		}

		//paste data
		else if(isCursorWithinBounds(575, 725, 200, 375, mousePos.x, mousePos.y))
		{

		}
	}

	else if(currentScreen == 2) //play
	{

		/* open console button */
		if(isCursorWithinBounds(200, 280, 200, 260, mousePos.x, mousePos.y))
		{
			cmdOpenBox();
		}

		/* enable gridlines checkbox */
	    if (isCursorWithinBounds(150, 185, 283, 298, mousePos.x, mousePos.y))//150,185 283,298
	    {
	        enableGridlines = !enableGridlines;
	    }

	    /* enable sound checkbox */
	    if (isCursorWithinBounds(250, 280, 283, 298, mousePos.x, mousePos.y))
	    {
	        enableSound = !enableSound;
	    }

	    if(isCursorWithinBounds(300, canvas.width, 0, canvas.height, mousePos.x, mousePos.y))
	    {
	    	/* deselect selected tile */
	    	if(selectedTile[0] != null || selectedTile[1] != null) //if there already is a selected tile
	    	{
	    		if(!isCursorWithinBounds(870, 895, 570, 595, mousePos.x, mousePos.y))//if you are not hovering over the trash can
	    		{
					selectedTile[0] = null;
					selectedTile[1] = null;
				}
	    	}
	    	/* select a tile */
	    	else //if there is not a selected tile
	    	{
				grassElements.forEach(function(e){
					if(mousePos.y > e.top && mousePos.y < e.top + tileWidth && mousePos.x > e.left && mousePos.x < e.left + tileWidth)
					{
						if(!isCursorWithinBounds(870, 895, 570, 595, mousePos.x, mousePos.y))
						{
							selectedTile[0] = e.left;
							selectedTile[1] = e.top;
						}
					}
				});
	    	}
	    }

	    /* 'Begin Onslaught' start wave */
	    if(isCursorWithinBounds(10, 290, 550, 590, mousePos.x, mousePos.y))
	    {
	    	if(!waveInPorgress)
	    	{
	    		waveInPorgress = true;
	    		spawnedEnemies = false;
	    	}
	    }

	    /* handle tower clicks */
	    if(selectedTile[0] != null || selectedTile[1] != null)
	    {
		    //tower 1 icon
			if(isCursorWithinBounds(10, 72.5, 320, 420, mousePos.x, mousePos.y))
			{
				if(towerCost(1) <= money && isTileClear(selectedTile[0], selectedTile[1]))//can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(1);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 1, 
				    	range: 100,
				    	attack: 45, 
				    	attacking: false,
				    	cooldown: 120, //cooldown in game ticks (60 is 1 second)
				    	currentCooldown: 0
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 2 icon
			else if(isCursorWithinBounds(82.5, 145, 320, 420, mousePos.x, mousePos.y))
			{
				if(towerCost(2) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(2);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 2, 
				    	range: 100,
				    	attack: 0.35, 
				    	attacking: false
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 3 icon
			else if(isCursorWithinBounds(155, 217.5, 320, 420, mousePos.x, mousePos.y))
			{
				if(towerCost(3) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(3);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 3, 
				    	range: 300,
				    	attack: 90, 
				    	attacking: false,
				    	cooldown: 300, //cooldown in game ticks (60 is 1 second)
				    	currentCooldown: 0
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 4 icon
			else if(isCursorWithinBounds(227.5, 290, 320, 420, mousePos.x, mousePos.y))
			{
				if(towerCost(4) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(4);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 4, 
				    	range: 1000,
				    	attack: 0.1, 
				    	attacking: false,
				    	cooldown: 120, //cooldown in game ticks (60 is 1 second)
				    	currentCooldown: 0
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 5 icon
			else if(isCursorWithinBounds(10, 72.5, 440, 540, mousePos.x, mousePos.y))
			{
				if(towerCost(5) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(5);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 5, 
				    	range: 100,
				    	attack: 30, 
				    	attacking: false,
				    	cooldown: 80, //cooldown in game ticks (60 is 1 second)
				    	currentCooldown: 0
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 6 icon
			else if(isCursorWithinBounds(82.5, 145, 440, 540, mousePos.x, mousePos.y))
			{
				if(towerCost(6) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(6);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 6, 
				    	range: 100,
				    	attack: 0.1, 
				    	attacking: false
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 7 icon
			else if(isCursorWithinBounds(155, 217.5, 440, 540, mousePos.x, mousePos.y))
			{
				if(towerCost(7) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(7);

					towerId++;

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 7, 
				    	range: 100,
				    	attack: 0.1, 
				    	attacking: false
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}
			//tower 8 icon
			else if(isCursorWithinBounds(227.5, 290, 440, 540, mousePos.x, mousePos.y))
			{
				if(towerCost(8) <= money && isTileClear(selectedTile[0], selectedTile[1])) //can you afford it and is the space clear
				{
					if(!pauseMoney) money -= towerCost(8);

					allTowers.push({
						left: selectedTile[0],
				    	top: selectedTile[1], 
				    	type: 8, 
				    	range: 100,
				    	attack: 0.1, 
				    	attacking: false
					});
				}

				selectedTile[0] = null;
				selectedTile[1] = null;
			}

			/* delete tower handler */
			else if(isCursorWithinBounds(870, 895, 570, 595, mousePos.x, mousePos.y))
			{	
				if(selectedTile[0] != null || selectedTile[1] != null) //if you have a tile selected
				{
					if(!isTileClear(selectedTile[0], selectedTile[1]))
					{
						allTowers.forEach(function(e){
							if(e.left == selectedTile[0] && e.top == selectedTile[1])
							{
								$.each(allTowers, function(i){
								    if(allTowers[i].left == e.left && allTowers[i].top == e.top) {
								        allTowers.splice(i,1);
								        return false;
								    }
								});
				    			//give money back
				    			moneyBack = Math.floor( 0.45 * (towerCost(e.type)));
				    			if(!pauseMoney) money += moneyBack;

				    			//display notification
				    			currentNotificationMessage = "Tower sold for "+moneyBack.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " money";

				    			//have no tile selected
								selectedTile[0] = null;
								selectedTile[1] = null;
							}
						});
					}
				}
			}
	 	}
	}

	else if(currentScreen == 3) //track editor
	{
		grassElementsEdit.forEach(function(e){
			if(mousePos.y > e.top && mousePos.y < e.top + tileWidth && mousePos.x > e.left && mousePos.x < e.left + tileWidth)
			{
				if(selectTileChoice == 0) //grass
				{
					var confirmed = 0; 

					trackElementsEdit.forEach(function(t){

						if(e.top == t.top && e.left == t.left)
						{
							confirmed = 1;
						}
					});

					if(confirmed == 1) //there is a track tile on those coords
					{
						$.each(trackElementsEdit, function(i){
						    if(trackElementsEdit[i].left == e.left && trackElementsEdit[i].top == e.top){
						        trackElementsEdit.splice(i,1);
						        return false;
						    }
						});
					}
				}

				else if(selectTileChoice == 1) //track
				{
					var confirmed = 0; 

					trackElementsEdit.forEach(function(t){

						if(e.top == t.top && e.left == t.left)
						{
							confirmed = 1;
						}
					});

					if(confirmed == 0) //there is not a track tile on those coords
					{
						

						trackElementsEdit.push({
							top: e.top,
							left: e.left
						});
					}
				}
			}
		});

		if(isCursorWithinBounds(55, 105, 260, 310, mousePos.x, mousePos.y)) //grass
		{
			selectTileChoice = 0;
		}

		else if(isCursorWithinBounds(180, 230, 260, 310, mousePos.x, mousePos.y)) //track
		{
			selectTileChoice = 1;
		}

		else if(isCursorWithinBounds(20, 280, 470, 520, mousePos.x, mousePos.y))
		{
			//submit track
			/* adds each tile to its appropriate array (track or grass) */

			var encoded = "";
			
			var placeHolderArray = [];
			for(i = 0; i <= 144; i++) placeHolderArray.push(0);

			ty = 0;
			tx = 300;

			for (var a = 0; a <= 144-1; a++) //loop through all of the data
			{
				if(tx >= ((tileWidth * 12)+300)) //if the current xPos is off the screen,
				{                                //reset it and change the yPos
					tx = 300;
					ty += tileWidth;
				}

				trackElementsEdit.forEach(function(t){
					if(t.left == tx && t.top == ty)
					{
						placeHolderArray[a] = 1;
					}
				});
				
				tx += tileWidth;
			}

			var encoded = "";
			for(i = 0; i<placeHolderArray.length; i++)
			{
				var x = Math.floor((Math.random() * 5) + 1);
				var y = Math.floor(Math.random() * 2);

				if(placeHolderArray[i]) //track
				{
					switch(x)
					{
						case 1:
							encoded += "*$#";
							break;

						case 2:
							encoded += "!@^";
							break;

						case 3:
							encoded += "$*^@";
							break;

						case 4:
							encoded += "$$#^";
							break;

						case 5:
							encoded += "!@#!*^";
							break;
					}
				}
				else
				{
					switch(x)
					{
						case 1:
							encoded += "##^*@!";
							break;

						case 2:
							encoded += "@#^!";
							break;

						case 3:
							encoded += "!*^";
							break;

						case 4:
							encoded += "@#^^$";
							break;

						case 5:
							encoded += "!*$$";
							break;
					}
				}

				if(y) encoded += "%";
				else encoded += "&"
			}

			console.log(encoded);

		}
	}
}, false);


	

/* handle game events involving the mouse not needing to be clicked */
canvas.addEventListener("mousemove", function(event){
	var mousePos = getMousePos(canvas, event);

	if(currentScreen == 1) //choose
	{
		//normal
		if(isCursorWithinBounds(175, 325, 200, 375, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		//track editor
		else if(isCursorWithinBounds(375, 525, 200, 375, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		//paste data
		else if(isCursorWithinBounds(575, 725, 200, 375, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		else
		{
			cursorPointer = false;
		}
	}

	else if(currentScreen == 2)	//play
	{
		/* add in white hover animation over ONLY grass blocks */
		if(selectedTile[0] == null || selectedTile[1] == null)
		{
			grassElements.forEach(function(e){
				if(mousePos.y > e.top && mousePos.y < e.top + tileWidth && mousePos.x > e.left && mousePos.x < e.left + tileWidth)
				{
					current_HoverAnim = [e.left, e.top];
				}
			});
		}

		trackElements.forEach(function(e){
			if(mousePos.y > e.top && mousePos.y < e.top + tileWidth && mousePos.x > e.left && mousePos.x < e.left + tileWidth)
			{
				current_HoverAnim = [null, null];
			}
		});

		if(mousePos.y < 5 || (mousePos.y > (canvas.height-5)) || (mousePos.x < 300) || (mousePos.x > (canvas.width-5)) || (mousePos.x === undefined) || (mousePos.y === undefined))
		{
			current_HoverAnim = [null, null];
		}

		/* open console button */
		if(isCursorWithinBounds(200, 280, 200, 260, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		/* change cursor to pointer when over the ENABLE GRIDLINES SLIDER */
		else if(isCursorWithinBounds(155, 183, 283, 298, mousePos.x, mousePos.y))
		{
			cursorPointer = true;	
		}

		/* enable sound checkbox */
	    else if (isCursorWithinBounds(250, 280, 283, 298, mousePos.x, mousePos.y))
	    {
	        cursorPointer = true;
	    }

		/* change cursor to pointer when over the TOWER ICONS ON THE LEFT MENU */
		//tower 1 icon
		else if(isCursorWithinBounds(10, 72.5, 320, 420, mousePos.x, mousePos.y))
		{
			if(towerCost(1) <= money) cursorPointer = true;	
		}
		//tower 2 icon
		else if(isCursorWithinBounds(82.5, 145, 320, 420, mousePos.x, mousePos.y))
		{
			if(towerCost(2) <= money) cursorPointer = true;	
		}
		//tower 3 icon
		else if(isCursorWithinBounds(155, 217.5, 320, 420, mousePos.x, mousePos.y))
		{
			if(towerCost(3) <= money) cursorPointer = true;	
		}
		//tower 4 icon
		else if(isCursorWithinBounds(227.5, 290, 320, 420, mousePos.x, mousePos.y))
		{
			if(towerCost(4) <= money) cursorPointer = true;	
		}
		//tower 5 icon
		else if(isCursorWithinBounds(10, 72.5, 440, 540, mousePos.x, mousePos.y))
		{
			if(towerCost(5) <= money) cursorPointer = true;	
		}
		//tower 6 icon
		else if(isCursorWithinBounds(82.5, 145, 440, 540, mousePos.x, mousePos.y))
		{
			if(towerCost(6) <= money) cursorPointer = true;	
		}
		//tower 7 icon
		else if(isCursorWithinBounds(155, 217.5, 440, 540, mousePos.x, mousePos.y))
		{
			if(towerCost(7) <= money) cursorPointer = true;	
		}
		//tower 8 icon
		else if(isCursorWithinBounds(227.5, 290, 440, 540, mousePos.x, mousePos.y))
		{
			if(towerCost(8) <= money) cursorPointer = true;	
		}

	 	/*change cursor to pointer while hovering over 'Begin Onslaught' Button */
	 	else if(isCursorWithinBounds(10, 290, 550, 590, mousePos.x, mousePos.y))
		{
			if(!waveInPorgress)
			{
				cursorPointer = true;
			}	
		}

		/* delete tower icon */
		else if(isCursorWithinBounds(870, 895, 570, 595, mousePos.x, mousePos.y))
		{	
			cursorPointer = true;
		}

		//hovering over nothing
		else
		{
			cursorPointer = false;
		}
	}

	else if(currentScreen == 3) //track editor
	{
		grassElementsEdit.forEach(function(e){
			if(mousePos.y > e.top && mousePos.y < e.top + tileWidth && mousePos.x > e.left && mousePos.x < e.left + tileWidth)
			{
				current_HoverAnim = [e.left, e.top];
			}
		});

		if(isCursorWithinBounds(55, 105, 260, 310, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		else if(isCursorWithinBounds(180, 230, 260, 310, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		else if(isCursorWithinBounds(20, 280, 470, 520, mousePos.x, mousePos.y))
		{
			cursorPointer = true;
		}

		else
		{
			cursorPointer = false;
		}
	}
});

setInterval(update, 1000/60);