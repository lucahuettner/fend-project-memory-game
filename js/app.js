/*
 * Create a list that holds all of your cards
 */

const cards = [
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-leaf',
  'fa fa-bomb',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-leaf',
  'fa fa-bomb',
  'fa fa-bicycle'
];
// variables
const fragment = document.createDocumentFragment();
const deck = document.querySelector('.deck')
const openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
window.addEventListener('DOMContentLoaded', function (){
  shuffle(cards)
  for (const card of cards){
    console.log(card);
    const newCard = document.createElement('li');
    newCard.className = 'card'
    const icon = document.createElement('i')
    icon.className = card
    newCard.appendChild(icon)
    fragment.appendChild(newCard)
    // newCard.innerHTML = '<i class=card></i>';
  }
  deck.appendChild(fragment);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function showCard (evt){
  if (evt.target.nodeName === 'LI'){
    evt.target.classList.add('show','open');
  }
};
// add card to array
function addCard(item){
  openCards.push(item)
  console.log(openCards)
};
deck.addEventListener('click', function(event){
  const currentCard = event.target.firstChild.className
  showCard(event);
  if (openCards.length < 1) {
    addCard(currentCard);
  } else if (openCards[0] === currentCard) {
    console.log('match');
    openCards.shift()
  } else {
    openCards.shift()
  }

});
