var tileWidth = 50
var boardDems = {
	width: 10,
	height: 10
};
var mode = [0, 0];
var ty = 0;
var tx = 0;
var tiles = [];
var tilesUncovered = 0;
var totalTiles = 0;
var totalBombs = 0;
var inProg = false;
var clockInt;
var choice;
var warningHasBeenPressed = 0;
var mainMenuShowing = 1;
$(document).bind("contextmenu",function(e){e.preventDefault();});

function generateBoard(x, y, bd, m) //x, y, bomb density, mode
{
	console.log(mode);
	$('#menu').fadeOut(50);
	$('#gameContainer').fadeIn(250);

	clearInterval(clockInt);
	inProg = true;

	var screenDems = {
		width: x*tileWidth,
		height: y*tileWidth
	};

	tiles = [];
	ty = 0;
	tx = 0;

	//$('#menu').css({"width":""+screenDems.width+"px","height":""+screenDems.height+"px",   "margin-top":"-"+screenDems.height+"px"});

	$('#gameContainer').empty(); //safety net
	$('#gameContainer').css({"width":""+(screenDems.width)+"px","height":""+(screenDems.height)+"px"});
	$('#menu').css({"width":""+(900)+"px","height":""+(500)+"px", "opacity":"0.7"});
	var serial = 1;

	/* print tiles to the screen */
	for (var a = 0; a <= (x * y)-1; a++) //loop through all of the data
	{
		if(tx >= (tileWidth * (x))) //if the current xPos is off the screen,
		{                                //reset it and change the yPos
			tx = 0;
			ty += tileWidth;
		}

		var b = false;
		if(Math.floor((Math.random() * 100) + 1) <= (bd))
		{
			b = true;
		}

		tiles.push({x:tx,y:ty,bomb:b,ser:serial,flagged:false,turned:false,num:0,counted:false});
		serial++;
		tx += tileWidth;
	}

	serial = 1;
	tiles.forEach(function(t){ //t.x, t.y, t.bomb
		/* make the square a bomb */
		if(t.bomb)
		{
			totalBombs++;
			if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(explosion.gif), url(emptybox2.png);"></div>').appendTo('#gameContainer');

			if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
			{
				//mlgcosby.gif
				$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(explosion.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
			}

			$('<div id="'+serial+'" class="cover" style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(emptybox.png);" onclick='+"showTile('bomb', '"+serial+"')"+'></div>').appendTo('#gameContainer');
		}
		/* number or empty space */
		else
		{
			/* determine the number on the inside */
			var number = 0;
			tiles.forEach(function(e){
				/* top left */
				if((e.bomb)&&(t.x-tileWidth == e.x && t.y-tileWidth == e.y)) number++;			
				/* top middle */
				if((e.bomb)&&(t.x == e.x && t.y-tileWidth == e.y)) number++;		
				/* top right */
				if((e.bomb)&&(t.x+tileWidth == e.x && t.y-tileWidth == e.y)) number++;	
				/* middle right */
				if((e.bomb)&&(t.x+tileWidth == e.x && t.y == e.y)) number++;
				/* bottom right */
				if((e.bomb)&&(t.x+tileWidth == e.x && t.y+tileWidth == e.y)) number++;
				/* bottom middle */
				if((e.bomb)&&(t.x == e.x && t.y+tileWidth == e.y)) number++;
				/* bottom left */
				if((e.bomb)&&(t.x-tileWidth == e.x && t.y+tileWidth == e.y)) number++;
				/* middle left */
				if((e.bomb)&&(t.x-tileWidth == e.x && t.y == e.y)) number++;
			});
			t.num = number;

			switch(number)
			{
				case 1:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(frog.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

					if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
					{
						//mlgcosby.gif
						$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(frog.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
					}
					break;

				case 2:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(spook.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(spook.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 3:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(snoop.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(snoop.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 4:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(kiddance.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(kiddance.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 5:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(doge.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(doge.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 6:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(sanic.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(sanic.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 7:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(yourmemes.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(yourmemes.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;

				case 8:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(blacknod.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(blacknod.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
					break;
				default:
					if(m[0] == 0) $('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(pepe.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');

						if(m[0] == 1)//epilepsy one (i used '== 1' simply for easier reading if i add future ones)
						{
							//mlgcosby.gif
							$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(pepe.gif), url(mlgcosby.gif);">'+number+'</div>').appendTo('#gameContainer');
						}
			}
			$('<div id="'+serial+'" class="cover" style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(emptybox.png);" onclick='+"showTile('bomb', '"+serial+"')"+'></div>').appendTo('#gameContainer');

			
			if(m[0] == 1) $('.cover').css({"background-image":"url(flashingrainbowsmall.gif)"});
					
		}	
		serial++;
	});

	if(m[3] == 0) //cursor 
	{
		$(".cursor").css({"cursor":"pointer"});
		$("#gameContainer div").css({"cursor":"pointer"});
		console.log("cursor");
	}
	else if(m[3] == 1) //blind
	{
		$(".cursor").css({"cursor":"none"});
		$("#gameContainer div").css({"cursor":"none"});
		console.log("blind");
	}

	$('.cover').mousedown(function(e){
		var left = $(this).css("left");
		left = parseInt(left.slice(0, -2));
		var top = $(this).css("top");
		top = parseInt(top.slice(0, -2));

		if(e.which === 1) //left
		{
			tiles.forEach(function(t){
				if(t.x == left && t.y == top && (!t.flagged) && inProg)
				{
					$('#'+t.ser).fadeOut(50);
					t.turned = true;
					if(!t.bomb)
					{
						tilesUncovered++;
					}
					else //if it is a bomb
					{
						inProg = false;
						 endGame(0);
					}
					//console.log(tilesUncovered);
				}
			});

			if((totalTiles - totalBombs == tilesUncovered) && inProg) endGame(1);
		}
		if(e.which === 3) //right
		{
			tiles.forEach(function(t){
				if(t.x == left && t.y == top)
				{
					t.flagged = !t.flagged;
					if(t.flagged)
					{
						if(m[0] == 0) $('#'+t.ser).css({"background-image":"url(flag.png), url(emptybox.png)"}); 
						if(m[0] == 1) $('#'+t.ser).css({"background-image":"url(flag.png),url(mlgcosby.gif)"});
					}
					else
					{
						if(m[0] == 0) $('#'+t.ser).css({"background-image":"url(emptybox.png)"});
						if(m[0] == 1) $('#'+t.ser).css({"background-image":"url(flashingrainbowsmall.gif)"});
					}
				}
			});
		}
	});

	clock(m);
}

function clock(m) //m: mode
{
	if(inProg)
	{
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var tseconds = 0;
		var degs = 0;
		var degs2 = 0;
		clockInt = setInterval(function(){

			if(m[1] == 1 && !mainMenuShowing) /* tilefield spinning */
			{
				$("#gameAndMenu").css({"-webkit-transform":"rotate("+degs+"deg)"});
				degs++;

				if(degs >= 361)
				{
					degs = 0;
				}
			}

			if((m[2] == 1) && (m[0] == 1) && !mainMenuShowing) /* background spinning */
			{
				$("#background").css({"-webkit-transform":"rotate("+degs2+"deg)"});
				degs2 -= 1.75;

				if(degs2 <= -361)
				{
					degs2 = 0;
				}
				console.log(m[0]);
			}

			if(mainMenuShowing)
			{
				$("#gameAndMenu").css({"-webkit-transform":"rotate(0deg)"});
				$("body").css({"-webkit-transform":"rotate(0deg)"});
				$("#background").css({"-webkit-transform":"rotate(0deg)"});
				$("#background").css({"background":"#fff"})
			}

			tiles.forEach(function(l){
				/* if its a pepe that has not been counted for */
				if(l.num === 0 && !l.bomb && !l.counted && l.turned)
				{
					tiles.forEach(function(t2){
						/* top left */
						if(l.x-tileWidth == t2.x && l.y-tileWidth == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}	
						/* top middle */
						if(l.x == t2.x && l.y-tileWidth == t2.y)		
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* top right */
						if(l.x+tileWidth == t2.x && l.y-tileWidth == t2.y)	
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* middle right */
						if(l.x+tileWidth == t2.x && l.y == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* bottom right */
						if(l.x+tileWidth == t2.x && l.y+tileWidth == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* bottom middle */
						if(l.x == t2.x && l.y+tileWidth == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* bottom left */
						if(l.x-tileWidth == t2.x && l.y+tileWidth == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
						/* middle left */
						if(l.x-tileWidth == t2.x && l.y == t2.y)
						{
							if(!t2.turned) tilesUncovered++;
							$('#'+t2.ser).fadeOut(50);
							t2.turned = true;
						}
					});
					l.counted = true;
					if((totalTiles - totalBombs == tilesUncovered) && inProg) endGame(1);
				}
			});
		},50);
	}
}

function endGame(win) //win=0 is a LOSS | win=1 is a WIN
{
	$('#gameContainer').delay(750).fadeOut(400, function(){
		$('#menu').fadeIn(400);
	});
	if(win)
	{
		$('#menu #menuSubCont img').attr("src", "cage.gif");
		$('#menuMainCont').css({"margin-top":"-600px"});
		var dif = "Custom";
		switch(choice)
		{
			case 1:
				dif = "Beginner";
				break;

			case 2:
				dif = "Easy";
				break;

			case 3:
				dif = "Medium";
				break;

			case 4:
				dif = "Hard";
				break;

			case 5:
				dif = "Satan";
				break;
		}
		$('#menu #menuSubCont #endMessage').css({"color":"#fff"});
		$('#menu #menuSubCont #endMessage').html("Congratulations! <br> You Cleared 100% Of The Empty Tiles On "+dif);
	}
	else
	{ 
		$('#menu #menuSubCont img').attr("src", "neil.gif");
		$('#menuMainCont').css({"margin-top":"-600px"});
		var dif2 = "Custom";
		switch(choice)
		{
			case 1:
				dif = "Beginner";
				break;

			case 2:
				dif = "Easy";
				break;

			case 3:
				dif = "Medium";
				break;

			case 4:
				dif = "Hard";
				break;

			case 5:
				dif = "Satan";
				break;
		}
		/*
			var tilesUncovered = 0;
			var totalTiles = 0;
			var totalBombs = 0;
		*/

		console.log(tilesUncovered,totalTiles,totalBombs);
		var tilescleared = tilesUncovered/(totalTiles-totalBombs)*100;

		$('#menu #menuSubCont #endMessage').css({"color":"#000"});
		$('#menu #menuSubCont #endMessage').html("You Got Rekt m8! <br> You Only Cleared "+Math.round(tilescleared*10)/10+"% Of The Empty Tiles On "+dif);
 	}
}

function returnToMenu()
{
	mainMenuShowing = 1;
	$('body').css({"background":"white"});
	$('#keyButton').css({"background-image":""});
	$('#changeLogButton').css({"background-image":""});
	$('#menuMainCont').animate({"margin-top":"0px"},500);
}

function sendData(a) //0:CUTSOM 1:very easy  2:easy  3:medium  4:hard  5.extreme
{
	var x, y, bd;
	choice = a;
	switch(a)
	{
		case 0: //custom
			if(bd > 100) bd = 100;
			x = $('#xcoord').val();
			y = $('#ycoord').val();
			if($('#bombcoord').val() !== null && ($('#bombcoord').val() <= 100 && $('#bombcoord').val() >= 1 )) bd = $('#bombcoord').val();
			break;

		case 1:
			x = 10;
			y = 10;
			bd = 10;
			break;

		case 2:
			x = 15;
			y = 15;
			bd = 15;
			break;

		case 3:
			x = 20;
			y = 20;
			bd = 25;
			break;

		case 4:
			x = 25;
			y = 25;
			bd = 30;
			break;

		case 5:
			x = 50;
			y = 50;
			bd = 40;
			break;
	}

	var modes = document.getElementsByName('mode');
	for (i = 0; i < modes.length; i++)
	{
		if(modes[i].checked)
		{
			mode[i] = 1;
		}
		else
		{
			mode[i] = 0;
		}
	}

	if(mode == [0,0,0]) //classic
	{
		$('#background').css({"background":"white"});
	}
	else if(mode[0] == 1) //epilepsy 
	{
		if(!warningHasBeenPressed)
			{
				alert("****SEVERE EPILEPSY WARNING****");
				warningHasBeenPressed = true;
			}
			$('#background').css({"background-image":"url(flashingrainbow.gif)"});
			$('body').css({"background-image":"url(flashingrainbow.gif)"});
			$('#keyButton').css({"background-image":"url(cosby.gif)"});
			$('#changeLogButton').css({"background-image":"url(cosby.gif)"});
	}










	
	mainMenuShowing = 0;

	// reset variables from previous game
	totalTiles = x * y;
	totalBombs = 0;
	tilesUncovered = 0; //resets just incase

	generateBoard(x,y,bd, mode);
}











