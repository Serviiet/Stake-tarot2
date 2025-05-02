const tarotDeck = [
  "Le Mat", "Le Bateleur", "La Papesse", "L’Impératrice", "L’Empereur", "Le Pape",
  "L’Amoureux", "Le Chariot", "La Justice", "L’Hermite", "La Roue de Fortune",
  "La Force", "Le Pendu", "L’Arcane sans nom", "Tempérance", "Le Diable",
  "La Maison Dieu", "L’Étoile", "La Lune", "Le Soleil", "Le Jugement", "Le Monde",
  "As de Coupe", "Roi de Coupe", "Dame de Coupe", "Valet de Coupe",
  "As d’Épée", "Roi d’Épée", "Dame d’Épée", "Valet d’Épée",
  "As de Deniers", "Roi de Deniers", "Dame de Deniers", "Valet de Deniers",
  "As de Bâtons", "Roi de Bâtons", "Dame de Bâtons", "Valet de Bâtons"
];

function play() {
  const bet = parseFloat(document.getElementById("betAmount").value);
  const crypto = document.getElementById("crypto").value;
  const cardsDisplay = document.getElementById("cardsDisplay");
  const resultDisplay = document.getElementById("resultDisplay");

  let deck = [...tarotDeck];
  let drawn = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * deck.length);
    drawn.push(deck[index]);
    deck.splice(index, 1);
  }

  cardsDisplay.innerHTML = '';
  drawn.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.textContent = card;
    cardsDisplay.appendChild(div);
  });

  let multiplier = getMultiplier(drawn);
  let gain = bet * multiplier;

  resultDisplay.innerHTML = multiplier > 0 ?
    `GAGNÉ : x${multiplier} = ${gain.toFixed(4)} ${crypto}` :
    `PERDU : -${bet.toFixed(4)} ${crypto}`;
}

function getMultiplier(cards) {
  const arcanes = cards.filter(c => tarotDeck.indexOf(c) <= 21);
  const counts = {};
  cards.forEach(c => counts[c] = (counts[c] || 0) + 1);

  if (cards.includes("Le Mat") && arcanes.length >= 2) return 15;
  if (arcanes.length === 3) return 10;
  if (arcanes.length === 2) return 5;
  if (Object.values(counts).includes(3)) return 7;
  if (Object.values(counts).includes(2)) return 2;

  return 0;
}