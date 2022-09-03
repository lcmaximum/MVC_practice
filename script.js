//constants
const dealerSpace = document.getElementById("dealer-space");
const userSpace = document.getElementById("user-space");
const scoreboard = document.getElementById("score-board");
const dealerPoints = document.getElementById("dealer-points");
const userPoints = document.getElementById("user-points");
const userCard = document.getElementById("user-card");
const dealerCard = document.getElementById("dealer-card");
const dealBtn = document.getElementById("deal-btn");
const hitBtn = document.getElementById("hit-btn");
const standBtn = document.getElementById("stand-btn");
const newRoundBtn = document.getElementById("new-round-btn");

let user = {
  hand: [],
  score: 0,
  isDealer: false,
  isWinner: false,
  bust: false,
  space: userSpace,
};

let dealer = {
  hand: [],
  score: 0,
  isDealer: true,
  isWinner: false,
  bust: false,
  space: dealerSpace,
};
//state variables
let deck = [];
let push = false;

//functions
function toggleVisibility(e) {
  if (e.style.visibility === "visible") {
    e.style.visibility = "hidden";
  } else {
    e.style.visibility = "visible";
  }
}

function shuffle() {
  deck = [];
  while (deck.length < 10) {
    let num = Math.ceil(Math.random() * 10);
    if (!deck.includes(num)) {
      deck.push(num);
    }
  }

  return deck;
}

function calculateScore() {
  dealer.score = 0;
  user.score = 0;
  for (let i = 0; i < dealer.hand.length; i++) {
    dealer.score += dealer.hand[i];
  }
  for (let i = 0; i < user.hand.length; i++) {
    user.score += user.hand[i];
  }

  if (dealer.score > 15) {
    dealer.bust = true;
    user.isWinner = true;
  }
  if (user.score > 15) {
    user.bust = true;
    dealer.isWinner = true;
  }
  console.log("dealer score", dealer.score);
  console.log("user score", user.score);
}

function displayScore() {
  dealerPoints.textContent = dealer.score;
  userPoints.textContent = user.score;
}

function dealFirstRound() {
  shuffle();
  toggleVisibility(scoreboard);
  toggleVisibility(dealBtn);
  toggleVisibility(hitBtn);
  toggleVisibility(standBtn);

  let newUserCard = deck.pop();
  user.hand.push(newUserCard);
  userCard.textContent = newUserCard;

  let newDealerCard = deck.pop();
  dealer.hand.push(newDealerCard);
  dealerCard.textContent = newDealerCard;

  calculateScore();
  displayScore();

  console.log("dealer hand", dealer.hand);
  console.log("user hand", user.hand);
  console.log("deck", deck);

  return deck;
}
function chooseHit(player) {
  console.log("deck: ", deck);
  let extraCard = document.createElement("div");
  extraCard.classList.add("card");
  player.space.appendChild(extraCard);
  let newCard = deck.pop();
  player.hand.push(newCard);
  extraCard.textContent = newCard;
  calculateScore();
  displayScore();
  if (user.bust || dealer.bust) {
    determineWinner();
  }
}

function updateBoard(player) {
  scoreboard.textContent = player + "wins!";
}

function determineWinner() {
  let winner = "";
  if (user.bust || (!dealer.bust && user.score < dealer.score)) {
    winner = dealer;
  } else if (dealer.bust || (!user.bust && dealer.score < user.score)) {
    winner = user;
  } else {
    winner = push;
  }
  return updateBoard(winner);
}

function chooseStand() {
  toggleVisibility(hitBtn);
  toggleVisibility(standBtn);
  toggleVisibility(newRoundBtn);
  while (dealer.score < 12) {
    chooseHit(dealer);
  }
  determineWinner();
}

function newRound() {}

//event listeners
dealBtn.addEventListener("click", dealFirstRound);
hitBtn.addEventListener("click", chooseHit.bind(null, user));
standBtn.addEventListener("click", chooseStand);
