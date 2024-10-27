const container = document.querySelector(".container");
let selectedCards = [];
const numberOfCards = 16;
let correctCards = 0;

// 1. render 16 cards with data-pair attribute
// 2. flip card on click
// 3. save the first card and the second card in an array
// 4. check if the first card and the second card are the same (with data-pair)
// 5. if the first card and the second card are the same, remove the cards from the DOM
// 6. if the first card and the second card are not the same, flip the cards back

// Generate 16 cards with data-pair attribute
function generateCards() {
  const keys = "AABBCCDDEEFFGGHH";
  const shuffledKeys = shuffleString(keys);
  shuffledKeys.split("").forEach((key) => {
    const card = document.createElement("div");
    card.dataset.pair = key;
    card.onclick = cardClickHandler;
    card.classList.add("card");
    card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">${key}</div>
        </div>
    `;
    container.appendChild(card);
    return card;
  });
}

function cardClickHandler(e) {
  const card = e.currentTarget;
  card.classList.toggle("card--selected");

  if (selectedCards[0] === card) {
    // if the card is already selected
    card.classList.remove("card--selected");
    selectedCards = [];
  } else {
    card.classList.add("card--selected");
    selectedCards.push(card);
  }

  if (selectedCards.length === 2) {
    const [card1, card2] = selectedCards;

    if (card1.dataset.pair === card2.dataset.pair) {
      matchedCardsHandler(card1, card2);
    } else {
      setTimeout(() => {
        card1.classList.remove("card--selected");
        card2.classList.remove("card--selected");
      }, 1000);
      selectedCards = [];
    }
  }
}

function matchedCardsHandler(card1, card2) {
  card1.classList.add("card--matched");
  card2.classList.add("card--matched");
  selectedCards = [];
  correctCards += 2;

  if (correctCards === numberOfCards) {
    alert("You won!");
  }
}

generateCards();

function shuffleString(str) {
  const array = str.split("");
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join("");
}
