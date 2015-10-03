var tileWidth = 50
var boardDems = {
	width: 10,
	height: 10
};
var ty = 0;
var tx = 0;
var tiles = [];
var bombDensity = 25; //x out of every 100 will be a bomb
var inProg = false;
var clockInt;

$(document).bind("contextmenu",function(e){e.preventDefault();});

function generateBoard(x, y)
{
	clearInterval(clockInt);
	inProg = true;
	//console.log("generated board with dems of "+x+" , "+y);
	var screenDems = {
		width: x*tileWidth,
		height: y*tileWidth
	};

	tiles = [];
	ty = 0;
	tx = 0;

	$('#gameContainer').empty(); //safety net
	$('#gameContainer').css({"width":""+screenDems.width+"px","height":""+screenDems.height+"px"});

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
		if(Math.floor((Math.random() * 100) + 1) <= (bombDensity))
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
			$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(explosion.gif), url(emptybox2.png);"></div>').appendTo('#gameContainer');
			$('<div id="'+serial+'" class="cover" style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(emptybox.png);cursor:pointer;" onclick='+"showTile('bomb', '"+serial+"')"+'></div>').appendTo('#gameContainer');
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
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(frog.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 2:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(spook.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 3:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(snoop.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 4:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(kiddance.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 5:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(doge.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 6:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(sanic.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 7:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(yourmemes.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;

				case 8:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(blacknod.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
					break;
				default:
					$('<div style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#fff;text-align:center;background-image:url(pepe.gif), url(emptybox2.png);">'+number+'</div>').appendTo('#gameContainer');
			}
			$('<div id="'+serial+'" class="cover" style="width:'+tileWidth+'px;height:'+tileWidth+'px;background-color:black;position:absolute;top:'+t.y+'px;left:'+t.x+'px;color:#f00;text-align:center;background-image:url(emptybox.png);cursor:pointer;" onclick='+"showTile('bomb', '"+serial+"')"+'></div>').appendTo('#gameContainer');
		}	
		serial++;
	});

	$('.cover').mousedown(function(e){
		var left = $(this).css("left");
		left = parseInt(left.slice(0, -2));
		var top = $(this).css("top");
		top = parseInt(top.slice(0, -2));

		if(e.which === 1) //left
		{
			tiles.forEach(function(t){
				if(t.x == left && t.y == top && (!t.flagged))
				{
					$('#'+t.ser).hide(50);
					t.turned = true;
				}
			});
		}
		if(e.which === 3) //right
		{
			console.log("right-click");
			//$(this).css({"background-image":"url(flag.png)"});
			tiles.forEach(function(t){
				if(t.x == left && t.y == top)
				{
					t.flagged = !t.flagged;
					if(t.flagged)
					{
						$('#'+t.ser).css({"background-image":"url(flag.png)"});
					}
					else
					{
						$('#'+t.ser).css({"background-image":"url(emptybox.png)"});
					}
				}
			});
		}
	});

	clock();
}

function clock()
{
	if(inProg)
	{
		var hours = 0;
		var minutes = 0;
		var seconds = 0;
		var tseconds = 0;
		clockInt = setInterval(function(){
			tiles.forEach(function(l){
				/* if its a pepe that has not been counted for */
				if(l.num === 0 && !l.bomb && !l.counted && l.turned)
				{
					tiles.forEach(function(t2){
						/* top left */
						if(l.x-tileWidth == t2.x && l.y-tileWidth == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}	
						/* top middle */
						if(l.x == t2.x && l.y-tileWidth == t2.y)		
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* top right */
						if(l.x+tileWidth == t2.x && l.y-tileWidth == t2.y)	
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* middle right */
						if(l.x+tileWidth == t2.x && l.y == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* bottom right */
						if(l.x+tileWidth == t2.x && l.y+tileWidth == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* bottom middle */
						if(l.x == t2.x && l.y+tileWidth == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* bottom left */
						if(l.x-tileWidth == t2.x && l.y+tileWidth == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
						/* middle left */
						if(l.x-tileWidth == t2.x && l.y == t2.y)
						{
							$('#'+t2.ser).hide();
							t2.turned = true;
						}
					});
					l.counted = true;
				}
			});
		},100);
	}
}

function hi()
{
	if($('#bombcoord').val() !== null) bombDensity = $('#bombcoord').val();
	if(bombDensity > 100) bombDensity = 100;
	generateBoard($('#xcoord').val(),$('#ycoord').val());
}











