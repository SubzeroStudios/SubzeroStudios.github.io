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

function gameLoop()  
{
	
}




   

setInterval(gameLoop, 1000/60);