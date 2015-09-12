$(document).ready(function(){
	function submits(textData, lang)
	{
		if(!lang)translateToSpork(textData);
		else translateToEnglish(textData);
	}

	function translateToSpork(english)
	{
		var sporkLetters=["z","x","c","v","b","n","m"];
		var finalResult=[];
		var englishWords=english.split(" ");
		for(i=0;i<=englishWords.length-1;i++)
		{
			var letters = englishWords[i].split("");
			var sporkLetterToUse=0;
				for(l=0;l<=letters.length-1;l++)
				{
					finalResult.push(letters[l]+sporkLetters[sporkLetterToUse]);
					sporkLetterToUse++;
					if(sporkLetterToUse>sporkLetters.length-1)sporkLetterToUse=0;
				}
				finalResult.push(" ");
		}
		finalResult=finalResult.join("");
		document.getElementById('text2').value=finalResult.toLowerCase();
	}

	function translateToEnglish(spork)
	{
		var finalResult=[];
		var sporkWords=spork.split(" ");
		for(i=0;i<=sporkWords.length-1;i++)
		{
			var letters=sporkWords[i].split("");
			for(l=0;l<=letters.length-1;l++)
			{
				if(l%2==0)
				{
					finalResult.push(letters[l]);
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