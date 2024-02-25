class Card {
    constructor(rank, suit) {        
        this.name = rank + " of " + suit;
        this.value = 0;
        
		switch (rank) {
			case "Ace":
			    this.value = 2;
			    break;
			case "Two":
				this.value = 3;
				break;
			case "Three":
				this.value = 4;
				break;
			case "Four":
				this.value = 5;
				break;
			case "Five":
				this.value = 6;
				break;
			case "Six":
				this.value = 7;
				break;
			case "Seven":
				this.value = 8;
				break;
			case "Eight":
				this.value = 9;
				break;
			case "Nine":
				this.value = 10;
				break;
			case "Ten":
				this.value = 11;
				break;
			case "Jack":
				this.value = 12;
				break;
			case "Queen":
				this.value = 13;
				break;
			case "King":
				this.value = 14;
				break;
		}
    }

    describe() {
		console.log(this.name);
	}
}

class Deck {
	constructor() {
		this.cards = [];
		const ranks = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King", "Ace"];
		const suits = ["Clubs", "Diamonds", "Hearts", "Spades"];

		ranks.forEach(rank => suits.forEach(suit => this.cards.push(new Card(rank, suit))));
	}

	shuffle() {
// We will apply the Fisher-Yates algorithim to shuffle the cards
		for (let i = this.cards.length - 1; i > 0; i--) {
			let randomIndex = Math.floor(Math.random() * (i + 1));
			let currentCard = this.cards[i];
			this.cards[i] = this.cards[randomIndex];
			this.cards[randomIndex] = currentCard;
		}
	}

	draw() {
		return this.cards.shift();
	}
}

class PlayerHand {
	constructor() {
		this.cards = [];
	}

	setCards(cards) {
		this.cards = cards;
	}

	flip() {
		return this.cards.shift();
	}

	describe() {
		this.cards.forEach(card => card.describe());
	}
}

class Player {
	constructor(playerName) {
		this.name = playerName;
		this.hand = new PlayerHand();
		this.score = 0;
	}

	setHand(hand) {
		this.hand.setCards(hand);
	}

	flip() {
		return this.hand.flip();
	}

	describeHand() {
		this.hand.describe();
	}

}

class Game {

	start() {

		// Let's put out a welcome message

		console.log(`Welcome to the game of War...`);

		let player1 = new Player(prompt("Wecome to the game of War.\nPlease enter the name of player 1:"));
		let player2 = new Player(prompt("Please enter the name of player 2:"));

		alert(`Okay, great! It's ${player1.name} vs ${player2.name}. Let's get started!
Follow the game's progress in the console. May the best player win.`);

		// Let's create the deck of cards and shuffle the deck.
		let deck = new Deck();

		console.log(`To start off the game between ${player1.name} and ${player2.name}, let's first shuffle the deck...`);
		deck.shuffle();

		// Now we will create an array of cards for each player and deal out the cards
		let player1Cards = [];
		let player2Cards = [];

		console.log(`The deck is shuffled. Now let's deal the cards...`);

		for (let i = 0; i < 52; i++) {
			if (i % 2 === 0) {
				player1Cards.push(deck.draw());
			}
			else {
				player2Cards.push(deck.draw());
			}
		}

		// Now let's create a hand for each player comprised of the cards that were drawn for each player
		player1.setHand(player1Cards);
		player2.setHand(player2Cards);

		// Now let's show the hand of each player
		console.log(`The cards have been dealt. Let's take a peek at what each player has...`);

		// Show player 1 cards in the console
		console.log(`\n${player1.name}'s cards:`);
		player1.describeHand();

		// Show player 2 cards in the console
		console.log(`\n${player2.name}'s cards:`);
		player2.describeHand();

		console.log(`\n\nOkay, so the players have their hands.  Let's go!`);

		/* We will now loop through 26 rounds of the game (this is the number of cards that each player has in
		   their hands). Each player will flip their card and a winner will be declared for the round. That winner will get
		   one point. If the two players each flip a card with the same value, a draw will be called and no point will be
		   awarded */

		for (let r=0; r < 26; r++) {
			console.log(`\n\nContestants, flip your cards!`);
			let player1Card = player1.flip();
			let player2Card = player2.flip();

			console.log(`\n${player1.name} has ${player1Card.name} and ${player2.name} has ${player2Card.name}.`);

			if (player1Card.value > player2Card.value) {
				player1.score++;
				console.log(`\n${player1.name} wins the round!`);				
			}
			else {
				if (player2Card.value > player1Card.value) {
					player2.score++;
					console.log(`\n${player2.name} wins the round!`);
				}
				else {
					console.log(`\nThe round is a draw.`);
				}
			}
			// If this isn't the last round, let's show the current score
			if (r < 25) {
				console.log(`\nThe score is now:`);
				console.log(`\t${player1.name}:\t${player1.score}`);
				console.log(`\t${player2.name}:\t${player2.score}`);

			} 
		}

		// Let's keep a variable that will hold the name of the game's winner.  If nobody wins, this variable will stay blank
		let winner = "";

		// Let's announce the outcome of the game and the final score.  Let's create a variable that will hold the winning
		// message

		let outcome = "The game is over and ";

		if (player1.score > player2.score) {
			outcome = outcome + player1.name + " wins the game!"
			winner = player1.name;
		}
		else {
			if (player2.score > player1.score) {
				outcome = outcome + player2.name + " wins the game!"
				winner = player2.name;
			}
			else {
				outcome = outcome + " it ends in a draw."
			}
		}

		console.log(`\n\n${outcome}`);

		console.log(`\nThe final score is:`);
		console.log(`\t${player1.name}:\t${player1.score}`);
		console.log(`\t${player2.name}:\t${player2.score}`);

		// If there was a winner, let's offer congratulations

		if (winner != "") {
			console.log(`\nCongratulations, ${winner}!`);
		}

		console.log("\n");

		alert("Goodbye!");
	}
}

// Here is where we will create an instance of the game and start it.

let game = new Game();
game.start();