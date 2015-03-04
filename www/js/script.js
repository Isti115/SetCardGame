Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
	return x;
  }
  return x > 0 ? 1 : -1;
}

window.addEventListener("load", init, false);

function init()
{
	changeTo(0);
	
	navButtons = document.getElementsByClassName("navButton");
	
	for(var i = 0; i < navButtons.length; i++)
	{
		navButtons[i].addEventListener("click", makeChanger(navButtons[i].dataset.target), false)
	}
}

// Menu

	function menu_init()
	{
		
	}

// Game

	var gameContainer;
	
	var selectedCards = [];
	
	function game_init()
	{
		gameContainer = document.querySelector("#game .content");
		
		while(gameContainer.lastChild)
		{
			gameContainer.removeChild(gameContainer.lastChild);
		}
		
		// setTimeout(function(){countdown(3);}, 1000);
		
		setTimeout(deal, 1000);
	}
	
	function deal()
	{
		var n = 4;
		
		for(var i = 0; i < n*3; i++)
		{
			var currentCard = document.createElement("canvas");
			
			// currentCard.id = i;
			currentCard.classList.add("card");
			
			currentCard.style.height = (gameContainer.clientHeight / 4) + 1 + "px";
			currentCard.style.width = (gameContainer.clientWidth / (n+1)) + "px";
			
			currentCard.addEventListener("click", cardClicked, false);
			
			gameContainer.appendChild(currentCard);
		}
	}
	
	function countdown(x)
	{
		if(x > 1)
		{
			setTimeout(function(){countdown(x - 1);}, 1000);
		}
		
		else
		{
			startGame()
		}
	}
	
	function startGame()
	{
		// deck =
		
		drawCard({color:"red", count:"2", shape:"rectangle", fill:"empty"});
	}
	
	colors = {
		"red": "#FF0000",
		"green": "#00FF00",
		"blue": "#0000FF",
	};
	
	function cardClicked(e)
	{
		if(selectedCards.indexOf(e.srcElement) == -1)
		{
			selectedCards.push(e.srcElement);
			e.srcElement.style.backgroundColor = "#ff00ff";
		}
		else
		{
			selectedCards.splice(selectedCards.indexOf(e.srcElement), 1);
			e.srcElement.style.backgroundColor = "#ffffff";
		}
		
		
		if(selectedCards.length == 3)
		{
			while(selectedCards.length > 0)
			{
				selectedCards.pop().style.backgroundColor = "#ffffff";
			}
		}
	}

// Scoreboard

	function scoreboard_init()
	{
		
	}

// Page changing

	inits = []
	inits[-1] = scoreboard_init;
	inits[0] = menu_init;
	inits[1] = game_init;
	
	function makeChanger(x)
	{
		return function(){changeTo(x);}
	}
	
	function changeTo(x)
	{
		pages = document.getElementsByClassName("page");
		
		for(var i = 0; i < pages.length; i++)
		{
			a =  (Math.sign(pages[i].dataset.position - x) * pages[i].clientWidth) + "px";
			pages[i].style.left = a;
			//pages[i].style.backgroundColor = "blue";
			//alert(a);
		}
		
		inits[x]();
	}