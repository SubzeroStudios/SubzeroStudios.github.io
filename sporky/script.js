$(document).ready(function(){
	function submits(textData)
	{
		translateToSpork(textData);
	}

	function translateToSpork(english)
	{
		var sporkLetters = ["z","x","c","v","b","n","m","z","x","c","v","b","n","m"];
		var finalResult = [];
		var englishWords = english.split(" ");

		for(i = 0; i <= englishWords.length-1; i++)
		{
			var letters = englishWords[i].split("");
				for(l = 0; l <= letters.length-1; l++)
				{
					finalResult.push(letters[l]+""+sporkLetters[l]);
					//console.log(letters);
				}
				finalResult.push(" ");
		}
		//document.getElementById("text2").value = "abc";
		document.getElementById('text2').value = finalResult.join("");
	}


	$("#text").keyup(function(){
            submits($(this).val())
     });
});