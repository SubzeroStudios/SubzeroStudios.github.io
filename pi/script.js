var l = document.getElementById("leibniz");
var ctxe = l.getContext("2d");
var e= document.getElementById("euler");
var ctxe = e.getContext("2d");

function calculate1()
{
	$("#scrollbox1 th").css({"font-size":"15px"});
	var cycles = $("#userInput1").val();

	var pi = 0;

	var d = 1;
	for (var i = 1; i <= cycles; i++)
	{
		console.log(i);
		if(i % 2 == 1)
		{
			pi += (1/d);
			$("#scrollbox1 table").append("<tr><td>"+i+"</td><td>+ 1/"+d+"</td><td> "+pi*4+"</td></tr>");
		}
		else
		{
			pi -= (1/d);
			$("#scrollbox1 table").append("<tr><td>"+i+"</td><td>- 1/"+d+"</td><td> "+pi*4+"</td></tr>");
		}


		$("#pi1").html(pi*4);
		d += 2;
	}
}

function calculate2()
{
	$("#scrollbox2 th").css({"font-size":"15px"});
	var cycles = $("#userInput2").val();

	var pi = 0;
	for (var i = 1; i <= cycles; i++)
	{
		console.log(i);
		pi += 1/(Math.pow(i, 2));
		$("#scrollbox2 table").append("<tr><td>"+i+"</td><td>+ 1/"+Math.pow(i, 2)+"</td><td> "+Math.sqrt(pi*6)+"</td></tr>");
		

		$("#pi2").html(Math.sqrt(pi*6));
	}
}