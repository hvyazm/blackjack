const Blackjack = Object.create(null);

// Define card suits and ranks
Blackjack.suits = ["♠", "♥", "♦", "♣"];
Blackjack.ranks = [
  "Ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King"];

// Function to create a deck of cards
Blackjack.createDeck = () =>
  R.chain((suit) =>
    R.map(
      (rank) => ({
        suit,
        rank,
        image: `${rank}-${suit}.png` // Add the image file name for each card
      }),
      Blackjack.ranks
    ),
    Blackjack.suits
  );


// Function to shuffle the deck of cards
Blackjack.shuffleDeck = (deck) => R.sort(() => Math.random() - 0.5, deck);


// Function to get the value of a card
Blackjack.getCardValue = function(card) {
  const { rank } = card;
  if (rank === "Ace") {
    return 11;
  }
  if (["King", "Queen", "Jack"].includes(rank)) {
    return 10;
  }
  return parseInt(rank);
};



// Function to calculate the score of a hand
Blackjack.calculateScore = function(cards) {
  const score = R.pipe(
    R.map(function(card) {
      return Blackjack.getCardValue(card);
    }),
    R.sum
  )(cards);
  const numAces = R.pipe(
    R.filter(function(card) {
      return card.rank === "Ace";
    }),
    R.length
  )(cards);
  if (score > 21 && numAces > 0) {
    const adjustedScore = score - 10;
    if (adjustedScore <= 21) {
      return adjustedScore;
    }
  }
  return score;
};



// Function to deal a card from the deck
Blackjack.dealCard = function(deck) {
  const cardIndex = Math.floor(Math.random() * deck.length);
  const card = deck[cardIndex];
  const updatedDeck = R.remove(cardIndex, 1, deck);
  return [card, updatedDeck];
};


// Function to check if a hand is a blackjack (21 with 2 cards)
Blackjack.isBlackjack = function(hand) {
  return hand.length === 2 && Blackjack.calculateScore(hand) === 21;
};

// Function to check if a hand has busted (score over 21)
Blackjack.hasBusted = function(hand) {
  return Blackjack.calculateScore(hand) > 21;
};


export default Object.freeze(Blackjack);
