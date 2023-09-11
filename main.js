
import Blackjack from "./blackjack.js";

// DOM elements
const player1HandElement = document.getElementById("player1-hand");
const player2HandElement = document.getElementById("player2-hand");
const hitButton = document.getElementById("hit-btn");
const standButton = document.getElementById("stand-btn");
const resultMessage = document.getElementById("result-message");
const newGameButton = document.getElementById("new-game-btn");

// Game variables
let deck = [];
let players = [];
let currentPlayerIndex = 0;

// Function to initialize a new game
const newGame = function () {
  // Create and shuffle the deck
  deck = Blackjack.shuffleDeck(Blackjack.createDeck());

  players = [
    { name: "Player 1", hand: [], stand: false },
    { name: "Player 2", hand: [], stand: false }
  ];
  currentPlayerIndex = 0;

  // Deal initial card to each player
  players.forEach(function(player)  {
    const [card, updatedDeck] = Blackjack.dealCard(deck);
    player.hand.push(card);
    deck = updatedDeck;
  });

  // Render the initial hands for each player
  players.forEach(function(player) {
    renderHand(
      player.hand,
      getPlayerHandElement(player.name),
      player.name + "'s Hand"
    );
  });

  // Enable buttons
  hitButton.disabled = false;
  standButton.disabled = false;
  newGameButton.disabled = false;

  // Reset result message
  resultMessage.textContent = "";
};

// Function to render a hand
const renderHand = function(hand, element, heading) {
  element.innerHTML = "";
  const headingElement = document.createElement("h2");
  headingElement.textContent = heading;
  element.appendChild(headingElement);

  const cardsElement = document.createElement("div");
  cardsElement.classList.add("cards");
  hand.forEach(function(card) {
    const cardElement = document.createElement("div");
    cardElement.textContent = `${card.rank} ${card.suit}`;
    cardsElement.appendChild(cardElement);
  });

  const scoreElement = document.createElement("div");
  scoreElement.textContent = "Score: " + Blackjack.calculateScore(hand);

  element.appendChild(cardsElement);
  element.appendChild(scoreElement);
};


// Helper function to get the player's hand element based on their name
const getPlayerHandElement = playerName => {
  if (playerName === "Player 1") {
    return player1HandElement;
  } else if (playerName === "Player 2") {
    return player2HandElement;
  }
};

// Function to handle player's hit action
const playerHit = () => {
  const currentPlayer = players[currentPlayerIndex];

  currentPlayer.hand.push(Blackjack.dealCard(deck)[0]);
  renderHand(
    currentPlayer.hand,
    getPlayerHandElement(currentPlayer.name),
    currentPlayer.name + "'s Hand"
  );
  resultMessage.textContent = currentPlayer.name + "'s turn";

  if (Blackjack.hasBusted(currentPlayer.hand)) {
    endGame(
      currentPlayer.name + " busted! " +
      getOpponentPlayer(currentPlayer).name + " wins."
    );
  } else if (Blackjack.isBlackjack(currentPlayer.hand)) {
    switchPlayer();
    if (currentPlayerIndex === 0) {
      endGame("Blackjack! " + currentPlayer.name + " wins.");
    } else {
      endGame("Blackjack! " + getOpponentPlayer(currentPlayer).name + " wins.");
    }
  }

  // Check if the current player has chosen to stand
  if (currentPlayer.stand) {
    switchPlayer();
    const nextPlayer = players[currentPlayerIndex];
    resultMessage.textContent = nextPlayer.name + "'s turn";
  }
};

// Function to handle player's stand action
const playerStand = () => {
  const currentPlayer = players[currentPlayerIndex];
  currentPlayer.stand = true;
  switchPlayer();
  const nextPlayer = players[currentPlayerIndex];
  resultMessage.textContent = nextPlayer.name + "'s turn";
};

// Function to switch between players
const switchPlayer = () => {
  currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
};

// Function to get the opponent player
const getOpponentPlayer = (player) => {
  return players.find(p => p !== player);
};

// Function to end the game
const endGame = message => {
  hitButton.disabled = true;
  standButton.disabled = true;
  newGameButton.disabled = false;
  resultMessage.textContent = message;
};

// Event listeners
hitButton.addEventListener("click", playerHit);
newGameButton.addEventListener("click", newGame);
standButton.addEventListener("click", playerStand);

// Start a new game
newGame();
