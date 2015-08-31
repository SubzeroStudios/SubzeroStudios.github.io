var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

var width = 750;
var height = 500;

canvas.width = width;
canvas.height = height;

/* ball data */
/* Will change to JSON eventually */
var ball = {
	x: 200,
	y: 100,
	radius: 30,
	color: '#0ab',
	dx: 0,
	dy: 4.5, 
	bounce: 0.7,
	gravity: 0.65,
	jumps: 0,
	maxJumps: 1 //specifies how many times the ball can jump without touching the ground
}

var lvl = 0;

var keys = [];

/* handle key presses */
window.addEventListener("keydown", function(e){


	keys[e.keyCode] = true;

	if((keys[38] == true) && (ball.jumps < ball.maxJumps))
	{
		ball.dy = -15;
		ball.jumps++;
	}

}, false);

window.addEventListener("keyup", function(e){
	delete keys[e.keyCode];
}, false);

function init()
{
	wallCollision = new Sound("wallCollision");
}

init();


//alert(lvl1[0].x);


function addPlat(lvl, nx, ny, nw, nh, nc)
{
	plats[lvl].push({x: nx, y: ny, w: nw, h: nh, c: nc});
}
/*addPlat(0, 20, 20, 20, 20, "#f00");*/






/*
up - 38
down - 40
left - 37
right - 39
*/


function clearCanvas() 
{
	ctx.clearRect(0, 0, width, height);
}

function update() 
{
	/*update ball */
	ball.y += ball.dy;
	ball.dy += ball.gravity;
	if(ball.dx > 0) ball.dx *= 0.99;
	if(ball.dx < 0) ball.dx *= 0.99;

	if(ball.y + ball.radius > canvas.height) //colides with bottom 
	{
		ball.y = canvas.height - ball.radius;
		ball.dy *= - ball.bounce;
		ball.dy += 1;
		ball.jumps = 0;

		if(Math.abs(ball.dy) > 0.5) wallCollision.play();
	}

	if((ball.y - ball.radius) < 0) // collides with top
	{
		ball.y = ball.radius;
		ball.dy = Math.abs(ball.dy);

		wallCollision.play();
	}

	if(ball.x + ball.radius > canvas.width) //right wall
	{
		ball.dx *= -1; //opposite direction
		ball.dx *= 0.7; // friction
		ball.x = (canvas.width - ball.radius);

		wallCollision.play();
	}

	if(ball.x - ball.radius< 0) //left wall
	{
		ball.x = ball.radius;
		ball.dx *= -1; //opposite direction
		ball.dx *= 0.7; // friction

		wallCollision.play();
	}

	ball.x += ball.dx;

	if(keys[37]) // left
	{
		/*ball.vx = -Math.abs(ball.vx);
		ball.vx -= 1;*/

		ball.dx -= 0.7;
	}

	if(keys[39]) // right
	{
		/*ball.vx = Math.abs(ball.vx);
		ball.vx += 1;*/

		ball.dx += 0.7;
	}

	if(keys[40]) //down
	{
		ball.dx  *= 0.95;
	}

	/*if(keys[32]) //space bar
	{
		ball.radius += 1;
	}*/

	/*var pulse = 0.5;
	if(ball.radius < 50)
	{
		ball.radius *= (1 + pulse);
		ball.color = "#f00";
	}
	else
	{
		ball.radius *= (1 - pulse);
		ball.color = "#00F";
	}*/

	//plat form collision

	for (i = 0; i < plats[lvl].length; i++) 
	{
		if((ball.x >= plats[lvl][i].x) && ((ball.x) <= (plats[lvl][i].x + plats[lvl][i].w))) //lines up with x
		{
			if(((ball.y + ball.radius) >= (plats[lvl][i].y - (Math.abs(ball.dy)))) && (ball.y + ball.radius) <= (plats[lvl][i].y + plats[lvl][i].h)) //is above
			{
				if(ball.dy > 0) //ball is traveling downwards
				{
					if(Math.abs(ball.dy) < 0.5)
					{
						ball.dy = 0;
					}
					else
					{
						ball.dy *= -ball.bounce;
					}

					ball.jumps = 0;
					ball.y = plats[lvl][i].y - ball.radius;
				}
			}
		}
	}











}

function draw()
{
	/* ball */
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0 ,2*Math.PI);
	ctx.fillStyle = ball.color;
	ctx.fill();

	

	

	for (i = 0; i < plats[lvl].length; i++) 
	{
		if(plats[lvl][i].c != null) //if it has a color attribute, use it
		{
			ctx.fillStyle = plats[lvl][i].c;
		}
		else //if it doesn't, set it to black by default
		{
			ctx.fillStyle = "#000";
		}

		ctx.fillRect(plats[lvl][i].x, plats[lvl][i].y, plats[lvl][i].w, plats[lvl][i].h);
	}
}

function gameLoop()
{
	clearCanvas();
	update();
	draw();
}






setInterval(gameLoop, 1000/60);