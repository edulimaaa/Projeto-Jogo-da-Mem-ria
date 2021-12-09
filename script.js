const cardImg = document.querySelector("#cardBoard");

var conte = 0;

const images = [
  "Pikachu.png",
  "Totodile.png",
  "Squirtle.png",
  "Charmander.png",
  "Bulbasaur.png",
  "Togepi.png",
];

let cardHTML = ""; //criar as div cards

images.forEach((img) => {
  cardHTML += `
    <div class="memory-card" data-card='${img}'>
        <img class='front-face' src='image/${img}'>
        <img class='back-face' src='image/pokebola.png'>
    </div>`;
});

cardImg.innerHTML = cardHTML + cardHTML;

/*Fim redenrização */

const cards = document.querySelectorAll(".memory-card"); //selecionar todos que tiver a class memory-card

let firstCard, secondCard;

let bloquearCard = false;

function flipCard() {
  if (bloquearCard) return false;
  this.classList.add("flip");

  if (!firstCard) {
    //se não foi definida passe o this
    firstCard = this;
    return false;
  }

  secondCard = this; //defina a segunda carta

  checarCard();
}

function checarCard() {
  var container = document.querySelector(".modal-container");
  const seCorresponde = firstCard.dataset.card === secondCard.dataset.card;

  !seCorresponde ? voltarCard() : resetCard(seCorresponde);

  if (seCorresponde) conte++;
  setTimeout(() => {
    if (conte == 6) {
      container.style.display = "flex";
    }
  }, 900);
}

function voltarCard() {
  bloquearCard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetCard();
  }, 1000);
}

(function aleatorio() {
  //fazer cards ficar em ordem aleatória
  cards.forEach((card) => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
})();

function resetCard(seCorresponde = false) {
  if (seCorresponde) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }
  [firstCard, secondCard, bloquearCard] = [null, null, false];
}

cards.forEach((card) => card.addEventListener("click", flipCard));
