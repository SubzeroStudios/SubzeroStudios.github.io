function doFirst()
{
	var x = document.getElementById('canvas');
	canvas = x.getContext('2d');
	canvas.strokeRect(10, 10, 80, 80);
}	

window.addEventListener("load", doFirst, false);