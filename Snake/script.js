var snake = [];
var fruit = [];
var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d");

var W = 700,
H = 700;
var boxSize = 35; //70

canvas.height = H; 
canvas.width = W;

var elemLeft = canvas.offsetLeft;
var elemTop = canvas.offsetTop;

var score;
var fruitEaten = false;


var direction; //0:right, 1:up, 2:left, 3:down
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);
var keys = [];
function keysPressed(e) {
    keys[e.keyCode] = true;
     
    if(keys[39] && direction != 2) //right
    {
    	direction = 0;
    }

    else if (keys[38] && direction != 3) //up 
    {
       direction = 1;
    }

    else if(keys[37] && direction != 0) //left
    {
    	direction = 2;
    }

    else if (keys[40] && direction != 1) //down
    {
    	direction = 3;
    }
}

function keysReleased(e) {
    keys[e.keyCode] = false;
}

function init()
{
	snake = [[4,1],[4,2]];
	fruit = [];
	direction = 3;
	score = 0;
	spawnFruit();
	draw();
}
init();

function update()
{
	clearCanvas(); 
	switch(direction)
	{
		case 0:
			snake.push([snake[snake.length-1][0]+1,snake[snake.length-1][1]]);
			break;

		case 1:
			snake.push([snake[snake.length-1][0],snake[snake.length-1][1]-1]);
			break;

		case 2:
			snake.push([snake[snake.length-1][0]-1,snake[snake.length-1][1]]);
			break;

		case 3:
			snake.push([snake[snake.length-1][0],snake[snake.length-1][1]+1]);
			break;
	}
	if(!fruitEaten) snake.shift();
	else if(fruitEaten) fruitEaten = false;
	draw();
	checkEatFruit();
	checkGameOver();
}

function checkEatFruit()
{
	if(snake[snake.length-1][0]*boxSize == fruit[0] && snake[snake.length-1][1]*boxSize == fruit[1])
	{
		fruitEaten = true;
		score += 10;
		spawnFruit();
	}
}

function spawnFruit()
{
	
	fruit[0] = Math.floor(Math.random() * 10)*boxSize;
	fruit[1] = Math.floor(Math.random() * 10)*boxSize;

	//if the fruit spawns on a snake block, try another block
	snake.forEach(function(e){
		if(e[0]*boxSize == fruit[0] && e[1]*boxSize == fruit[1])
		{
			spawnFruit();
		}
	});
	
}

function checkGameOver()
{
	//OUT OF BOUNDS
	if(snake[snake.length-1][0] < 0) //if OOB X
	{
		gameOver("Out of Bounds");
	}
	else if(snake[snake.length-1][0]*boxSize > (W-boxSize))
	{
		gameOver("Out of Bounds");
	}
	else if(snake[snake.length-1][1] < 0) //if OOB Y
	{
		gameOver("Out of Bounds");
	}
	else if(snake[snake.length-1][1]*boxSize > (H-boxSize))
	{
		gameOver("Out of Bounds");
	}

	//RUN INTO SELF
	for(var i = 0; i < snake.length-1; i++)
	{
		if(snake[i][0] == snake[snake.length-1][0] && snake[i][1] == snake[snake.length-1][1])
		{
			gameOver("Run Into Self");
		}
	}
}

function gameOver(reason)
{
	alert("Game Over! "+reason);
	init();
}

function draw()
{
	ctx.fillStyle = "#f00";
	ctx.fillRect(fruit[0], fruit[1], boxSize, boxSize);

	snake.forEach(function(e){
		ctx.fillStyle = "#00f";
		ctx.fillRect(e[0]*boxSize, e[1]*boxSize, boxSize, boxSize);
	});

	ctx.fillStyle = "#000";
	ctx.font = "30px Century Gothic";
	ctx.fillText("Score: "+score, 10 , 30);
}


function clearCanvas() 
{
	ctx.clearRect(0, 0, W, H);
}

setInterval(update, 1000/10);