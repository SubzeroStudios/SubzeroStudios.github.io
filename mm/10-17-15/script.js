$(document).ready(function(){
	/*





			TODO

			FIGURE WHERE ALL THE GODDAMNED CARDS ARE GOING FOR FUCKS SAKE
			WHY AM I NOT GETING CARDS AFTER THE FIRST THROW WTF HILLARY???
 

	*/

	var nameChoices = [
		"Ava Cadavra",
		"Misty Waters",
		"Daddy Bigbucks",
		"Giuseppi Mezzoalto",
		"Dusty Hogg",
		"Phoebe Twiddle",
		"Luthor L. Bigbucks",
		"Lottie Cash",
		"Detective Dan D. Mann",
		"Pritchard Locksley",
		"Futo Maki",
		"Ephram Earl",
		"Lily Gates",
		"Cannonball Coleman",
		"Sue Pirmova",
		"Lincoln Broadsheet",
		"Crawdad Clem",
		"Bayou Boo",
		"Maximillian Moore",
		"Bucki Brock",
		"Berkeley Clodd",
		"Gramma Hattie",
		"Pepper Pete",
		"Dr. Mauricio Keys",
		"Olde Salty",
		"Lloyd",
		"Harlan King",
		"Daschell Swank",
		"Kris Thristle",
	];

	var name1, name2;
	var bets = [[],[],[],[],[],[]];

	var cards = []
	// object array, 
	//color:o/b/g/p/r/s, 
	//number:#(if number is 0 that means its a special card), special:"none/bonko/king/rainbow"
	//location: "d"/"t"/1/2/3 (player 1 is you, 2 is the pineapple, 3 is the watermellon) t is table

	//TODO: CONDENSE INTO ONE MULTIDEMINSIONAL ARRAY
	/*var player1deck = [];
	var player2deck = [];
	var player3deck = [];*/

	var playerDeck = []; //Object array for the players cards

	var turn = "p"; //p: pineapple, c: coconut, w: watermellon
	var betsOnTable = 0;
	var cardsOnTable = [];
	var scores = [0, 0, 0];
	/*var src="images/cards/O6.png";
	$('#Obay').css('background-image', 'url('+src+')');*/

	var monkies = [1, 1, 1, 1, 1, 1]; //when a monkey is removed its position in the array becomes a 0
	var hasMadeBet = false;
	var hasdeterminedCard = true;
	var intermission = false; /* occurs when a monkey is removed and the round rest */
	var deadMonkeyAnimHasOccured = false;
	function initCards()
	{
		for(i = 0; i < 6; i++) //suit
		{
			var c;

			switch(i)
			{
				case 0:
					c = 'o';
					break;

				case 1:
					c = 'b';
					break;

				case 2:
					c = 'g';
					break;

				case 3:
					c = 'p';
					break;

				case 4:
					c = 'r';
					break;

				case 5:
					c = 's';
					break;
			}

			for(j = 1; j <= 8; j++) //number
			{
				if(j != 8) n = j;
				else
				{
					n = 'q';
				}

				cards.push({
					color: c,
					number: n,
					location: "d", /* deck */
				});
			}
		}
	}
	initCards();

	function initPlayerNames()
	{
		name1 = Math.floor((Math.random() * (nameChoices.length - 1)) + 0)
		var success = false;
		while(!success)
		{
			var name = Math.floor((Math.random() * (nameChoices.length - 1)) + 0)
			if(name != name1)
			{
				name2 = name;
				success = true;
			}
		}
		name1 = nameChoices[name1];
		name2 = nameChoices[name2];
	}

	initPlayerNames();

	function dealCards()
	{
		for(i = 0; i < 5; i++)
		{
			var success = false;
			while(!success)
			{
				var card = Math.floor((Math.random() * (cards.length - 1)) + 0);
				if(cards[card].location == 'd')
				{
					cards[card].location = 1;
					success = true;
				}
			}
		}

		for(i = 0; i < 5; i++)
		{
			var success = false;
			while(!success)
			{
				var card = Math.floor((Math.random() * (cards.length - 1)) + 0);
				if(cards[card].location == 'd')
				{
					cards[card].location = 2;
					success = true;
				}
			}
		}

		for(i = 0; i < 5; i++)
		{
			var success = false;
			while(!success)
			{
				var card = Math.floor((Math.random() * (cards.length - 1)) + 0);
				if(cards[card].location == 'd')
				{
					cards[card].location = 3;
					success = true;
				}
			}
		}

		/* sort the players cards from the others */
		var i = 0;
		cards.forEach(function(c){
			if(c.location == 1)
			{
				var tempsrc = "images/cards/"+c.color+c.number+".png";
				playerDeck[i] = {
					url: tempsrc,
					color: c.color,
					number: c.number
				};
				i++;
			}
		});
	}
	dealCards();

	function displayPlayerCards()
	{
		setTimeout(function(){
			$('#deckContainer div:nth-child(1)').css('background-image', 'url('+playerDeck[0].url+')');
		}, 250);
		setTimeout(function(){
			$('#deckContainer div:nth-child(2)').css('background-image', 'url('+playerDeck[1].url+')');
		}, 500);
		setTimeout(function(){
			$('#deckContainer div:nth-child(3)').css('background-image', 'url('+playerDeck[2].url+')');
		}, 750);
		setTimeout(function(){
			$('#deckContainer div:nth-child(4)').css('background-image', 'url('+playerDeck[3].url+')');
		}, 1000);
		setTimeout(function(){
			$('#deckContainer div:nth-child(5)').css('background-image', 'url('+playerDeck[4].url+')');
		}, 1250);
	}

	function placeBet(fruit, monkey) //places and displays bet
	{
		/*  fruit
			c: coconut
			w: watermellon
			p: pineapple

			monkey is a number 0 - 5
			input params as strings
		*/

		/* DETERMINE WHERE IN THE BET ARRAY TO PLACE THE FRUIT */
		var arrayLocation = monkey;

		/* PLACE BET */
		bets[arrayLocation].push(fruit);
	}

	function displayBet()
	{
		for(i = 0; i < bets.length; i++)
		{
			for(j = 0; j < 4; j++)
			{
				if(bets[i][j] == "c")
				{
					$('#a'+i+'box div:nth-child('+(j+1)+')').css({"background-image":"url(images/coconut.png)","background-size":"39px 39px"});
				}
				else if(bets[i][j] == "w")
				{
					$('#a'+i+'box div:nth-child('+(j+1)+')').css({"background-image":"url(images/watermellon.png)","background-size":"39px 39px"});
				}
				else if(bets[i][j] == "p")
				{
					$('#a'+i+'box div:nth-child('+(j+1)+')').css({"background-image":"url(images/pineapple.png)","background-size":"39px 39px"});
				}
			}
		}
		
	}

	function message(message)
	{
		$('#messageBoardTop').html(message);
	}

	function popupMessage(message, icon, type, time)
	{
		/* message: string of message
		   icon: "p/c/w"
		   type: 1= turn, 2= game over score */
		if(!intermission)
		{
			switch(type)
			{
				case 1:
					switch(icon)
					{
						case "c":
							$('#popupMessageContainer #icon').css({"background-image":"url(images/coconut.png)"});
							break;

						case "w":
							$('#popupMessageContainer #icon').css({"background-image":"url(images/watermellon.png)"});
							break;

						case "p":
							$('#popupMessageContainer #icon').css({"background-image":"url(images/pineapple.png)"});
							break;
					}
					break;
			}
			$('#popupMessageContainer').show();
		
			$('#popupMessageContainer #text').html(message);

			setTimeout(function(){
				$('#popupMessageContainer').hide();
			}, time);
		}
	}
	popupMessage(name1+"'s Turn", "p", 1, 1000);

	function determineBet(beginningBet)
	{
		if(!intermission)
		{
			if(intermission) alert("FUCK ALL REASON AND SANITY");
			if(beginningBet && (betsOnTable < 3))
			{
				switch(turn)
				{
					case "p": //pineapple
						placeBet("p", Math.floor((Math.random() * 6) + 0));
						scores[2]++;
						betsOnTable++;
						displayBet();
						setTimeout(function(){
							popupMessage("Your Turn", "c", 1, 1000);
							turn = "c";
						},200);
						break;

					case "c": //coconut
						$('.monkeyBoxesContainer').css({"cursor":"pointer"});
						$('.monkeyBoxesContainer').click(function(){
							if(turn == "c" && beginningBet && (betsOnTable < 3))
							{
								if(!hasMadeBet)
								{
									placeBet("c", $(this).attr('id').charAt(1));
									hasMadeBet = true;
									scores[0]++;
									betsOnTable++;
									$('.monkeyBoxesContainer').css({"cursor":"auto"});
									$(this).find('div').css({"background-image":"url(images/subboxbackrop.png)"});
									displayBet();

									setTimeout(function(){
										popupMessage(name2+"'s Turn", "w", 1, 1000);
										turn = "w";
									},200);
								}
							}
						});
						$('.monkeyBoxesContainer').on("mouseover", function(){
							if(turn == "c" && !hasMadeBet)
							{
								$(this).find('div').css({"background-image":"url(images/subboxbackrophover.png)"});
								displayBet();
							}
						});
						$('.monkeyBoxesContainer').on("mouseout", function(){
							$(this).find('div').css({"background-image":"url(images/subboxbackrop.png)"});
							displayBet();
						});
						break;

					case "w": //watermellon
						placeBet("w", Math.floor((Math.random() * 6) + 0));
							setTimeout(function(){
								scores[1]++;
								betsOnTable++;
								displayBet();
								hasMadeBet = false;
								hasdeterminedCard = true;
							}, 200);

							setTimeout(function(){
								popupMessage(name1+"'s Turn", "p", 1, 1000);
								turn = "p";
								displayPlayerCards();
							},400);
						break;
				}
			}
			else if(betsOnTable >= 3)//normal bet
			{
				switch(turn)
				{
					case "p": //pineapple
						var success = false;
						while(!success)
						{
							var ran = Math.floor((Math.random() * 6) + 0);
							if(bets[ran].length < 4 && !success)
							{	
								placeBet("p", ran);
								success = true;
							}
						}
						setTimeout(function(){
							scores[2]++;
							betsOnTable++;
							displayBet();
							hasMadeBet = true;
							hasdeterminedCard = false;
							message("Play a card");
						}, 400);
						break;

					case "c": //coconut
						$('.monkeyBoxesContainer').click(function(){
							if(turn == "c" && (bets[$(this).attr('id').charAt(1)].length < 4))
							{
								if(!hasMadeBet)
								{
									placeBet("c", $(this).attr('id').charAt(1));
									hasMadeBet = true;
									hasdeterminedCard = false;
									scores[0]++;
									betsOnTable++;
									determineCard();
									message("Play a card");
									//console.log("A normal coconut bet has been made");
								}
								$('.monkeyBoxesContainer').css({"cursor":"auto"});
								$(this).find('div').css({"background-image":"url(images/subboxbackrop.png)"});
								displayBet();

							}
						});
						$('.monkeyBoxesContainer').on("mouseover", function(){
							if(turn == "c" && !hasMadeBet && (bets[$(this).attr('id').charAt(1)].length < 4))
							{
								$('.monkeyBoxesContainer').css({"cursor":"pointer"});
								$(this).find('div').css({"background-image":"url(images/subboxbackrophover.png)"});
								displayBet();
							}
							if(bets[$(this).attr('id').charAt(1)].length >= 4)
							{
								$('.monkeyBoxesContainer').css({"cursor":"auto"});
							}
						});
						$('.monkeyBoxesContainer').on("mouseout", function(){
							$(this).find('div').css({"background-image":"url(images/subboxbackrop.png)"});
							displayBet();
						});
						break;

					case "w": //watermellon
						var success = false;
						while(!success)
						{
							var ran = Math.floor((Math.random() * 6) + 0);
							if(bets[ran].length < 4 && !success)
							{	
								placeBet("w", ran);
								success = true;
							}
						}
						setTimeout(function(){
							scores[1]++;
							betsOnTable++;
							displayBet();
							message("Play a card");
						},200);
						setTimeout(function(){
							hasMadeBet = true;
							hasdeterminedCard = false;
						},400);
						break;
				}
			}
		}
	}

	function determineCard()
	{
		if(!intermission)
		{
			switch(turn)
			{
				case "p": //pineapple
					//console.log("pineapple");
					var playerHand = [];

					//find the cards that are this players and add it to their temporary deck
					cards.forEach(function(c){
						if(c.location == 2)
						{
							playerHand.push({
								color: c.color,
								number: c.number
							});
						}
					});

					//chose a random card to play
					var chosenCard = Math.floor((Math.random() * playerHand.length) + 0);

					//change that card's location to the board
					cards.forEach(function(c){
						if(c.color == playerHand[chosenCard].color && c.number == playerHand[chosenCard].number)
						{
							c.location = "t"; //table
						}
					});

					var arrayPos;
					switch(playerHand[chosenCard].color)
					{
						case "o":
							arrayPos = 0;
							break;
						case "b":
							arrayPos = 1;
							break;
						case "g":
							arrayPos = 2;
							break;
						case "p":
							arrayPos = 3;
							break;
						case "r":
							arrayPos = 4;
							break;
						case "s":
							arrayPos = 5;
							break;
					}

					if(playerHand[chosenCard].number == "q")
					{
						cardsOnTable[arrayPos] = {
							color: playerHand[chosenCard].color,
							number: Math.floor((Math.random() * 7) + 1)
						};
					}
					else
					{
						cardsOnTable[arrayPos] = {
							color: playerHand[chosenCard].color,
							number: playerHand[chosenCard].number
						};
					}

					displayCards();

					setTimeout(function(){
						message("Place a bet");
						popupMessage("Your Turn", "c", 1, 1000);
						turn = "c";
						hasdeterminedCard = true;
						hasMadeBet = false;
					},400);

					var thereAreCardsInTheDeck = false;
					cards.forEach(function(c){
						if(c.location == "d") thereAreCardsInTheDeck = true;
					});
					if(thereAreCardsInTheDeck)
					{
						var success = false;
						while(!success)
						{
							var randomCard = Math.floor((Math.random() * cards.length) + 1);
							if(cards[randomCard].color != undefined)
							{
								if(cards[randomCard].location == "d")
								{
									cards[randomCard].location = 2;
									displayCards();
									success = true;
								}
							}
						}
					}
					break;

				case "c": //coconut
					//console.log("coconut", turn, hasMadeBet, hasdeterminedCard);

					$('.cardBayBottom').click(function(){
						if(turn == "c" && hasMadeBet)
						{
							var arrayPos;
							switch(playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].color)
							{
								case "o":
									arrayPos = 0;
									break;
								case "b":
									arrayPos = 1;
									break;
								case "g":
									arrayPos = 2;
									break;
								case "p":
									arrayPos = 3;
									break;
								case "r":
									arrayPos = 4;
									break;
								case "s":
									arrayPos = 5;
									break;
							}

							if(playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].number == "q")
							{
								playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].number = Math.floor((Math.random() * 7) + 1);
								displayCards();
							}

							cardsOnTable[arrayPos] = {
								color: playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].color,
								number: playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].number
							};

							//playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].color = null;
							//playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].number = null;

							$('#b'+parseInt($(this).attr("id").charAt(1))).animate({"height":"0px","margin-bottom":"112px"},200, function(){
								displayCards();
							});

							var thereAreCardsInTheDeck = false;
							cards.forEach(function(c){
								if(c.location == "d") thereAreCardsInTheDeck = true;
							});
							if(thereAreCardsInTheDeck)
							{
								while(!hasdeterminedCard)
								{
									var randomCard = Math.floor((Math.random() * cards.length) + 1);
									//if(cards[randomCard].color != undefined && cards[randomCard].color != null)
									//{
										if(cards[randomCard].location == "d")
										{
											cards[randomCard].location = 1;
											playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].color = cards[randomCard].color;
											playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].number = cards[randomCard].number;


											for(i = 0; i < 5; i++)
											{
												console.log(playerDeck[i]);
											}

											console.log(playerDeck);


											hasdeterminedCard = true;
											$('#b'+parseInt($(this).attr("id").charAt(1))).animate({"height":"106px","margin-bottom":"6px"}, 200, function(){
												displayCards();
											});
										}
									//}
								}
							}

							setTimeout(function(){
								message("Place a bet");
								popupMessage(name2+"'s Turn", "w", 1, 1000);
								turn = "w";
								hasMadeBet = false;
							},400);
						}
					});
					$('.cardBayBottom').on("mouseover", function(){
						if(turn == "c" && hasMadeBet && playerDeck[(parseInt($(this).attr("id").charAt(1))-1)].color != null)
						{
							$(this).css({
								"-webkit-box-shadow":"inset 0px 0px 15px -1px rgba(255,255,255,1)",
								"-moz-box-shadow":"inset 0px 0px 15px -1px rgba(255,255,255,1)",
								"box-shadow":"inset 0px 0px 15px -1px rgba(255,255,255,1)",
								"cursor":"pointer"
							});
						}
					});
					$('.cardBayBottom').on("mouseout", function(){
						$(this).css({
								"-webkit-box-shadow":"inset 0px 0px 0px 0px rgba(255,255,255,0)",
								"-moz-box-shadow":"inset 0px 0px 0px 0px rgba(255,255,255,0)",
								"box-shadow":"inset 0px 0px 0px 0px rgba(255,255,255,0)",
								"cursor":"auto"
							});
					});

					break;

				case "w": //watermellon
					var playerHand = [];

					//find the cards that are this players and add it to their temporary deck
					cards.forEach(function(c){
						if(c.location == 3)
						{
							playerHand.push({
								color: c.color,
								number: c.number
							});
						}
					});

					//chose a random card to play
					var thereAreCardsInTheDeck = false;
					cards.forEach(function(c){
						if(c.location == "d") thereAreCardsInTheDeck = true;
					});
					if(thereAreCardsInTheDeck)
					{
						var chosenCard = Math.floor((Math.random() * playerHand.length) + 0);



						//change that card's location to the board
						cards.forEach(function(c){
							if(c.color == playerHand[chosenCard].color && c.number == playerHand[chosenCard].number)
							{
								c.location = "t"; //table
							}
						});

						var arrayPos;
						switch(playerHand[chosenCard].color)
						{
							case "o":
								arrayPos = 0;
								break;
							case "b":
								arrayPos = 1;
								break;
							case "g":
								arrayPos = 2;
								break;
							case "p":
								arrayPos = 3;
								break;
							case "r":
								arrayPos = 4;
								break;
							case "s":
								arrayPos = 5;
								break;
						}
						
						if(playerHand[chosenCard].number == "q")
						{
							cardsOnTable[arrayPos] = {
								color: playerHand[chosenCard].color,
								number: Math.floor((Math.random() * 7) + 1)
							};
						}
						else
						{
							cardsOnTable[arrayPos] = {
								color: playerHand[chosenCard].color,
								number: playerHand[chosenCard].number
							};
						}
					}

					displayCards()
					hasdeterminedCard = true;
					turn = "p";
					hasMadeBet = false;
					message("Place a bet");
					popupMessage(name1+"'s' Turn", "p", 1, 1000);

					if(thereAreCardsInTheDeck)
					{
						var success = false;
						while(!success)
						{
							var randomCard = Math.floor((Math.random() * cards.length) + 1);
							if(cards[randomCard].color != undefined)
							{
								if(cards[randomCard].location == "d")
								{
									cards[randomCard].location = 3;
									displayCards();
									success = true;
								}
							}
						}
					}
					break;
			}
		}
	}

	function displayCards()
	{
		/* Display the cards */
		cardsOnTable.forEach(function(c){
			var src = c.color + c.number;
			$('#'+c.color.toUpperCase()+'bay').css('background-image', 'url(images/cards/'+src+'.png)');
		});

		for(i = 0; i < 5; i++)
		{
			$('#deckContainer div:nth-child('+(i+1)+')').css('background-image', 'url(images/cards/'+playerDeck[i].color+playerDeck[i].number+'.png)');
		}
		console.log("**call on displayCards**");
	}

	function updateScore()
	{
		$('#cscorebox').html(scores[0]);
		$('#wscorebox').html(scores[1]);
		$('#pscorebox').html(scores[2]);
	}
	updateScore();

	function checkForGameOver()
	{
		var cardNumbers = [];
		cardsOnTable.forEach(function(c){
			cardNumbers.push(c.number);
		});
		cardNumbers = cardNumbers.sort();
		var monkiesLeft = 0;
		monkies.forEach(function(m){
			if(m == 1) monkiesLeft++;
		});
		if(cardNumbers.length == monkiesLeft)
		{
			if(cardNumbers[0] != cardNumbers[1])
			{
				cardsOnTable.forEach(function(c){
					if(c.number == cardNumbers[0])
					{
						intermission = true;
						removeMonkeyAndReset(c.color);
					}
				});
			}
		}
	}

	function removeMonkeyAndReset(monkey)
	{
		if(!deadMonkeyAnimHasOccured)
		{
			deadMonkeyAnimHasOccured = true;

			switch(monkey)
			{
				case "o":
					$('#o').css({"background-image":"url(images/redx.png), url(images/orangem.png)"});
					break;

				case "b":
					$('#b').css({"background-image":"url(images/redx.png), url(images/bluem.png)"});
					break;
				
				case "g":
					$('#g').css({"background-image":"url(images/redx.png), url(images/greenm.png)"});
					break;
				
				case "p":
					$('#p').css({"background-image":"url(images/redx.png), url(images/purplem.png)"});
					break;
				
				case "r":
					$('#r').css({"background-image":"url(images/redx.png), url(images/redm.png)"});
					break;
				
				case "s":
					$('#s').css({"background-image":"url(images/redx.png), url(images/silverm.png)"});
					break;
			}
		
			setTimeout(function(){
				switch(monkey)
				{
					case "o":
						$('#o').css({"background-image":"url(images/orangem.png)"});
						break;

					case "b":
						$('#b').css({"background-image":"url(images/bluem.png)"});
						break;
					
					case "g":
						$('#g').css({"background-image":"url(images/greenm.png)"});
						break;
					
					case "p":
						$('#p').css({"background-image":"url(images/purplem.png)"});
						break;
					
					case "r":
						$('#r').css({"background-image":"url(images/redm.png)"});
						break;
					
					case "s":
						$('#s').css({"background-image":"url(images/silverm.png)"});
						break;
				}

				bets = [[],[],[],[],[],[]];
				betsOnTable = 0;
				$('.subBox').css({"background-image":"url(images/subboxbackrop.png)"});
				displayBet();
				cards = [];
				initCards();
				cardsOnTable = [[],[],[],[],[],[]];
				playerDeck = [[],[],[],[],[]];
				displayCards();
				console.log("FULL MOTHERFUCKING RESET YOU CUM DUMPSTER");
			}, 2000);
		}
	}

	function gameLoop()
	{
		if(betsOnTable < 3)
		{
			var thereAreCardsOnTable = false;
			cards.forEach(function(c){
				if(c.location == "t")
				{
					thereAreCardsOnTable = true;
				}
			});

			if(!thereAreCardsOnTable)
			{
				determineBet(1);
			}
		}

		else
		{

			//console.log(hasMadeBet, hasdeterminedCard);
			if(!hasMadeBet && hasdeterminedCard && !intermission) determineBet(0);
			if(hasMadeBet && !hasdeterminedCard && !intermission) determineCard();
			
		}
		//console.log("THE TURN IS: ", turn, hasMadeBet, hasdeterminedCard);
		/* Update Score */
		updateScore();
		checkForGameOver();
	}
	setInterval(gameLoop, 1000);
	
















	
});

