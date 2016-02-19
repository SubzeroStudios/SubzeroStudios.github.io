var amount;
var bars;

function generate()
{
	amount = 50;
	bars = [];
	$("#sortContainer").html("");
	for(i=0;i <= amount-1;i++)
	{
		height = Math.floor((Math.random() * 355) + 5);
		margintop = 400-height;
		width = (500/amount);
		bars.push({margin: i*(500/amount), h: height, id: i});
		$('<div id="'+i+'" class="sortBox" style="height:'+height+'px; width:'+width+'px;margin-top:'+margintop+'px"></div>').appendTo("#sortContainer");
	}
}

function sort()
{
	var currentMargin;
	for(i=0;i <= amount-1;i++)
	{
		currentMargin = i*(500/amount);
		var currentID1;
		var currentID2;

		bars.forEach(function(b1){
			if(b1.id == i)
			{
				currentID1 = i; 
				currentID2 = i+1;

				bars.forEach(function(b2){
					if(b2.id == currentID2)
					{
						if(b1.h > b2.h) //left is heigher
						{
							$('#'+b2.id).animate({"height":""+b1.h+"px"},5000);
							$('#'+b1.id).animate({"height":""+b2.h+"px"},5000);
						}
						else //right is higher
						{

						}
					}
				});
			}
		});

		//console.log(currentID1, currentID2);

		//if($('#'+currentID1) > $('#'+currentID2) )
	}
}