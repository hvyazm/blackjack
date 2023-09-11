import assert from "assert";
import Blackjack from "./blackjack.js";

describe("blackjack", function () {
  describe("createDeck()", function () {
    it("should create a deck of cards", function () {
      const deck = Blackjack.createDeck();
      assert.equal(deck.length, 52);
    });
  });

  describe("shuffleDeck()", function () {
    it("should shuffle the deck of cards", function () {
      const deck = Blackjack.createDeck();
      const shuffledDeck = Blackjack.shuffleDeck(deck);
      assert.notDeepStrictEqual(deck, shuffledDeck);
    });
  });

  describe("getCardValue()", function () {
    it("should return the correct value for Ace", function () {
      const card = { suit: "♠", rank: "Ace", image: "Ace-♠.png" };
      const value = Blackjack.getCardValue(card);
      assert.equal(value, 11);
    });

    it("should return the correct value for King, Queen, and Jack", function () {
      const card1 = { suit: "♥", rank: "King", image: "King-♥.png" };
      const card2 = { suit: "♦", rank: "Queen", image: "Queen-♦.png" };
      const card3 = { suit: "♣", rank: "Jack", image: "Jack-♣.png" };
      const value1 = Blackjack.getCardValue(card1);
      const value2 = Blackjack.getCardValue(card2);
      const value3 = Blackjack.getCardValue(card3);
      assert.equal(value1, 10);
      assert.equal(value2, 10);
      assert.equal(value3, 10);
    });

    it("should return the correct value for numeric cards", function () {
      const card = { suit: "♠", rank: "7", image: "7-♠.png" };
      const value = Blackjack.getCardValue(card);
      assert.equal(value, 7);
    });
  });

  describe("calculateScore()", function () {
    it("should calculate the score of a hand", function () {
      const hand = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "9", image: "9-♥.png" },
        { suit: "♦", rank: "King", image: "King-♦.png" }
      ];
      const score = Blackjack.calculateScore(hand);
      assert.equal(score, 20);
    });

    it("should handle a hand with Aces correctly", function () {
      const hand = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "Ace", image: "Ace-♥.png" },
        { suit: "♦", rank: "King", image: "King-♦.png" }
      ];
      const score = Blackjack.calculateScore(hand);
      assert.equal(score, 12);
    });
  });

  describe("dealCard()", function () {
    it("should deal a card from the deck", function () {
      const deck = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "9", image: "9-♥.png" },
        { suit: "♦", rank: "King", image: "King-♦.png" }
      ];
      const [card, updatedDeck] = Blackjack.dealCard(deck);
      assert.ok(card);
      assert.equal(updatedDeck.length, deck.length - 1);
    });
  });

  describe("isBlackjack()", function () {
    it("should return true for a blackjack hand", function () {
      const hand = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "King", image: "King-♥.png" }
      ];
      const result = Blackjack.isBlackjack(hand);
      assert.ok(result);
    });

    it("should return false for a non-blackjack hand", function () {
      const hand = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "9", image: "9-♥.png" }
      ];
      const result = Blackjack.isBlackjack(hand);
      assert.ok(!result);
    });
  });

  describe("hasBusted()", function () {
    it("should return true for a hand with a score over 21", function () {
      const hand = [
        { suit: "♠", rank: "King", image: "King-♠.png" },
        { suit: "♥", rank: "Queen", image: "Queen-♥.png" },
        { suit: "♦", rank: "4", image: "4-♦.png" }
      ];
      const result = Blackjack.hasBusted(hand);
      assert.ok(result);
    });

    it("should return false for a hand with a score not exceeding 21", function () {
      const hand = [
        { suit: "♠", rank: "Ace", image: "Ace-♠.png" },
        { suit: "♥", rank: "9", image: "9-♥.png" }
      ];
      const result = Blackjack.hasBusted(hand);
      assert.ok(!result);
    });
  });
});
