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

var game_container;

	function game_init()
	{
		game_container = document.querySelector("#game .content");
		
		while(game_container.lastChild)
		{
			game_container.removeChild(game_container.lastChild);
		}
		
		// setTimeout(function(){countdown(3);}, 1000);
		
		deal();
	}
	
	function deal()
	{
		var n = 4;
		
		for(var i = 0; i < n*3; i++)
		{
			var currentCard = document.createElement("canvas");
			
			currentCard.classList.add("card");
			currentCard.style.height = (game_container.clientHeight / 4) + 1 + "px";
			currentCard.style.width = (game_container.clientWidth / (n+1)) + "px";
			
			game_container.appendChild(currentCard);
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