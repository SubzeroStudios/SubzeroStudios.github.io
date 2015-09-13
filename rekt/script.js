$(document).ready(function(){
	function submits(textData, lang)
	{
		if(!lang)translateTorekt(textData);
		else translateToEnglish(textData);
	}

	function translateTorekt(english)
	{
		var finalResult = [];
		var rektWords = english.split(" ");
		var filler = ["q", "s", "c", "w", "d", "v", "e", "f", "b", "r", "g", "n" ,"t", "h", "m", "y", "j", "u" ,"k" , "i", "l", "o", "p"];
		for(i=0;i<=rektWords.length-1;i++)
		{
			var letters=rektWords[i].split("");
			if((((i+1)*3)-3) > filler.length) fillerLetter = 0;
			else fillerLetter = (((i+1)*3)-3);

			for(l=0;l<=letters.length-1;l++)
			{
				finalResult.push(letters[l]);
				if(l % 2 == 0)
				{
					for(k=0;k<=2;k++)
					{
						finalResult.push(filler[fillerLetter]);
						fillerLetter++;
						if(fillerLetter > filler.length-1) fillerLetter = 0;
					}
				}
				else
				{
					for(k=0;k<=1;k++)
					{
						finalResult.push(filler[fillerLetter]);
						fillerLetter++;
						if(fillerLetter > filler.length-1) fillerLetter = 0;
					}
				}

			}
			finalResult.push(" ");
		}

		finalResult=finalResult.join("");
		document.getElementById('text2').value=finalResult.toLowerCase();
	}

	function translateToEnglish(rekt)
	{
		var finalResult=[];
		var rektWords=rekt.split(" ");
		for(i=0;i<=rektWords.length-1;i++)
		{
			var letters=rektWords[i].split("");
			console.log(letters);
			var a = 1;
			for(l=0;l<=letters.length-1;l++)
			{
				if(a)
				{
					finalResult.push(letters[l]);
					l+=3;
					a = 0;
				}
				else
				{
					finalResult.push(letters[l]);
					l+=2;
					a = 1;
				}
			}
			finalResult.push(" ");
		}
		finalResult=finalResult.join("");
		document.getElementById('text').value=finalResult.toLowerCase();
	}

	$("#text").keyup(function(){
        submits($(this).val(),0)
     });
	$("#text2").keyup(function(){
        submits($(this).val(),1)
     });
});


/*
	







*/



