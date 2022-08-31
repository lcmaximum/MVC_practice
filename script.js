//constants
const userCard = document.getElementById("user-card");
const dealerCard = document.getElementById("dealer-card");
const dealBtn = document.getElementById("deal-btn");
const hitBtn = document.getElementById("hit-btn");

//state variables
let deck = [];

//functions
function toggleVisibility(e) {
  if (e.style.visibility === "visible") {
    e.style.visibility = "hidden";
  } else {
    e.style.visibility = "visible";
  }
}

function shuffle() {
  console.log("sup");
  deck = [];
  while (deck.length < 10) {
    let num = Math.ceil(Math.random() * 10);
    if (!deck.includes(num)) {
      deck.push(num);
    }
  }
  console.log(deck);
  return deck;
}
function dealFirstRound() {
  shuffle();
  toggleVisibility(dealBtn);
  toggleVisibility(hitBtn);
  userCard.textContent = deck[0];
  dealerCard.textContent = deck[1];
}

//event listeners
dealBtn.addEventListener("click", dealFirstRound);
