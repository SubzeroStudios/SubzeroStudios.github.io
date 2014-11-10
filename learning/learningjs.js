function doFirst()
{
	barSize = 600;
	myMovie=document.getElementById('myMovie');
	playButton=document.getElementById('playButton');
	bar=document.getElementById('defaultBar');
	progressBar=document.getElementById('progressBar');
	
	playButton.addEventListener('click', playOrPause();, false);
	bar.addEventListener('click', clickedBar();, false);
}

function playOrPause()
{
	if(!myMovie.paused && !myMovie.ended) /* Pause */
	{
		myMovie.pause();
		playButton.innerHTML='Play';
		window.clearInterval(updateBar);
		
	}
	
	else /* Play */
	{
		myMovie.play();
		playButton.innerHTML='Pause';
		updateBar=setInterval(update, 500);
		document.write("PLAY");
	}
}

function update()
{
	if(!myMovie.ended)
	{
		var size = parseInt(myMovie.currentTime*barSize/myMovie.duration)
		
		progressBar.style.width = size + 'px';
	}
	
	else
	{
		progressBar.style.width = '0px';
		playButton.innerHTML = 'Play';
		window.clearInterval(updateBar);
	}
}

function clickedBar(e) /* E = Position Of Mouse */
{
	if(!myMovie.ended)
	{
		var mouseX = e.pageX-bar.offsetLeft;
		var newTime = mouseX*myMovie.duration/barSize;
		myMovie.currentTime=newTime;
		progressBar.style.width=mouseX + 'px';
	}
}
window.addEventListener('load', doFirst(), false);