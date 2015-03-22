"use strict";

//Math.sign fill
Math.sign = Math.sign || function(x) {
  x = +x; // convert to a number
  if (x === 0 || isNaN(x)) {
	return x;
  }
  return x > 0 ? 1 : -1;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


//Image loader
function loadImage(path)
{
	var img = document.createElement("img");
	img.src = path;
	return img;
}

window.addEventListener("load", init, false);

function init()
{
	changeTo(0);
	
	var navButtons = document.getElementsByClassName("navButton");
	
	for(var i = 0; i < navButtons.length; i++)
	{
		navButtons[i].addEventListener("click", makeChanger(navButtons[i].dataset.target), false)
	}
}

// Menu

	function menu_init()
	{
		changeTo(1);
	}

// Game

	var gameContainer;
	
	var cardProperties = [
		["R", "G", "B"],
		["1", "2", "3"],
		["R", "T", "O"],
		["E", "S", "F"],
	];
	
	var colors = {
		"R": "#FF0000",
		"G": "#00FF00",
		"B": "#0000FF",
	};
	
	var shapes = {
		"R": loadImage("assets/card_templates/rectangle.png"),
		"O": loadImage("assets/card_templates/oval.png"),
		"T": loadImage("assets/card_templates/triangle.png")
	};
	
	var fills = {
		"R": loadImage("assets/card_templates/rectangle_fill.png"),
		"O": loadImage("assets/card_templates/oval_fill.png"),
		"T": loadImage("assets/card_templates/triangle_fill.png"),
		"S": loadImage("assets/card_templates/stripes.png")
	};
	
	var deck = [];
	
	var selectedCards = [];
	
	function game_init()
	{
		var propertyCount = 4;
		
		gameContainer = document.querySelector("#game .content");
		
		while(gameContainer.lastChild)
		{
			gameContainer.removeChild(gameContainer.lastChild);
		}
		
		for(var i = 0; i < Math.pow(3, propertyCount); i++)
		{
			var currentCard = "";
			
			for(var j = 0; j < propertyCount; j++)
			{
				currentCard += cardProperties[j][Math.floor(i / Math.pow(3, j)) % 3];
				// console.log("i: " + i + " | " + "j: " + j + " | " + Math.floor(i / Math.pow(3, j)) % 3);
			}
			
			deck.push(currentCard);
		}
		
		shuffle(deck);
		
		// setTimeout(function(){countdown(3);}, 1000);
		
		setTimeout(deal, 1000);
	}
	
	function pickCard(n)
	{
		if(deck.length < n)
		{
			console.log("not enough cards");
			return -1;
		}
		
		var cards = [];
		
		var i = 0;
		
		while(cards.length < n)
		{
			if(Math.random() < (n - cards.length) / (deck.length - i))
			{
				cards.push(deck.splice(i, 1)[0]);
			}
			
			i++;
		}
		
		return cards;
	}
	
	function deal()
	{
		var n = 4;
		
		var pickedCards = pickCard(n * 3);
		
		for(var i = 0; i < n*3; i++)
		{
			var currentCard = document.createElement("canvas");
			
			currentCard.id = i;
			currentCard.classList.add("card");
			
			currentCard.style.height = (gameContainer.clientHeight / 4) + 1 + "px";
			currentCard.style.width = (gameContainer.clientWidth / (n+1)) + "px";
			
			currentCard.dataset.properties = pickedCards[i];
			
			currentCard.addEventListener("click", cardClicked, false);
			
			gameContainer.appendChild(currentCard);
		}
		
		var cards = document.getElementsByClassName("card");
		for(var i = 0; i < cards.length; i++)
		{
			if(cards[i].dataset.drawn != true)
			{
				drawCard(cards[i]);
			}
		}
	}
	
	function drawCard(e)
	{
		var context = e.getContext("2d");
		
		var current = {
			color: e.dataset.properties[0],
			count: e.dataset.properties[1],
			shape: e.dataset.properties[2],
			fill: e.dataset.properties[3]
		}
		
		context.fillStyle = colors[current.color];
		context.fillText(current.fill, 10, 10);
		
		for(var i = 0; i < current.count; i++)
		{
			var xPos = ((i + 0.5) * (e.width / current.count)) - 25;
			
			context.fillRect(xPos, 25, 50, 100);
			context.drawImage(shapes[current.shape], xPos, 25);
			
			if(current.fill == "E")
			{context.drawImage(fills[current.shape], xPos, 25);}
			else if(current.fill == "S")
			{context.drawImage(fills["S"], xPos, 25);}
		}
		
		e.dataset.drawn = true;
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
	
	// function startGame()
	// {
	// 	// deck =
	// 	
	// 	drawCard({color:"red", count:"2", shape:"rectangle", fill:"empty"});
	// }
	
	function cardClicked(e)
	{
		if(selectedCards.indexOf(e.srcElement) == -1)
		{
			selectedCards.push(e.srcElement);
			e.srcElement.style.opacity = 0.5;
			// e.srcElement.style.backgroundColor = "#ff00ff";
		}
		else
		{
			selectedCards.splice(selectedCards.indexOf(e.srcElement), 1);
			e.srcElement.style.opacity = 1;
			// e.srcElement.style.backgroundColor = "#ffffff";
		}
		
		if(selectedCards.length == 3)
		{
			var properties = [];//{color:[], count:[], shape:[], fill:[]};
			
			while(selectedCards.length > 0)
			{
				var current = selectedCards.pop();
				
				properties.push(current.dataset.properties);
				
				current.style.opacity = 1
				// selectedCards.pop().style.backgroundColor = "#ffffff";
			}
			
			var isSET = true;
			
			for(var i = 0; i < 4 && isSET; i++)
			{
				isSET = (properties[0][i] == properties[1][i] && properties[1][i] == properties[2][i] && properties[2][i] == properties[0][i])
						||
						(properties[0][i] != properties[1][i] && properties[1][i] != properties[2][i] && properties[2][i] != properties[0][i]);
			}
			
			if(isSET)
			{
				alert("set");
			}
		}
	}

// Scoreboard

	function scoreboard_init()
	{
		
	}

// Page changing

	var inits = [];
	inits[-1] = scoreboard_init;
	inits[0] = menu_init;
	inits[1] = game_init;
	
	function makeChanger(x)
	{
		return function(){changeTo(x);}
	}
	
	function changeTo(x)
	{
		var pages = document.getElementsByClassName("page");
		
		for(var i = 0; i < pages.length; i++)
		{
			pages[i].style.left = (Math.sign(pages[i].dataset.position - x) * pages[i].clientWidth) + "px";
		}
		
		inits[x]();
	}