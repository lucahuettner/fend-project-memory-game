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
const deck = document.querySelector('.deck');
const stars = document.querySelectorAll('.fa-star');
let openCards = [];
let count = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function createDeck (){
  shuffle(cards);
  for (const card of cards){
    console.log(card);
    const newCard = document.createElement('li');
    newCard.className = 'card';
    const icon = document.createElement('i');
    icon.className = card;
    newCard.appendChild(icon);
    fragment.appendChild(newCard);
  }
  deck.appendChild(fragment);
}
// create Deck on page load
window.addEventListener('DOMContentLoaded', createDeck());

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

// Timer from https://stackoverflow.com/a/5517836 (modified with start and stop)
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
let timerOn = false;
let timerEvent;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

function startTimer(){
  timerEvent = setInterval(setTime, 1000);
  timerOn = true;
}
function stopTimer(){
  clearInterval(timerEvent);
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
  evt.target.classList.add('show','open');
}
// add card to array
function addCard(item){
  openCards.push(item);
  console.log(openCards);
}
function match(item){
  console.log(item);
  console.log(document.getElementsByClassName(openCards[0]));
  // change card look from open to matched
  const open = document.getElementsByClassName(openCards[0]);
  open[0].parentElement.classList.add('match');
  open[0].parentElement.classList.remove('show','open');
  open[1].parentElement.classList.add('match');
  open[1].parentElement.classList.remove('show','open');
  openCards.shift();
  winCheck();
}
function winCheck(){
  // check if all cards are matched
  if (document.querySelectorAll('.match').length == 16){
    console.log('finished');
    // stop Time
    stopTimer();
    // add final time to modal
    document.getElementById('finalTime').innerText = pad(parseInt(totalSeconds / 60)) + ':' + pad(totalSeconds % 60);
    // add final stars to modal
    const finalStars = document.getElementById('finalStars');
    if (count < 10){
      finalStars.innerText = '3 Stars!';
    } else if (count >= 10 && count < 20) {
      finalStars.innerText = '2 Stars!';
    } else {
      finalStars.innerText = '1 Star!';
    }
    // open modal
    modal.style.display = "block";
  }
}
function resetCard(){
  setTimeout(function(){
    document.getElementsByClassName('show open')[0].classList.remove('show','open');
    document.getElementsByClassName('show open')[0].classList.remove('show','open');
    openCards.shift();
  }, 400)
}
function increment(){
  count++;
  checkStar();
  if (count === 1){
    document.querySelector('.moves').innerText = count + ' Move';
  } else {
    document.querySelector('.moves').innerText = count + ' Moves';
  }
}
// remove a star every 10 moves
function checkStar(){
  console.log('star');

  if (count === 10){
    stars[0].classList.toggle('hide');
  } else if (count === 20) {
        stars[1].classList.toggle('hide');
  }
}
// Card is clicked
deck.addEventListener('click', function(event){
if (event.target.nodeName === 'LI' && event.target.className !== 'card show open') {
  const currentCard = event.target.firstChild.className;
  showCard(event);
  timerOn ? "" : startTimer();
  if (openCards.length < 1) {
    addCard(currentCard);
  } else if (openCards[0] === currentCard) {
    match(currentCard);
    increment();
  } else {
    resetCard();
    increment();
  }
}
})
// restart Game
document.querySelector('.restart').addEventListener('click', function(){
  console.log('restart');
  // remove deck
  while (deck.firstChild) {
    deck.removeChild(deck.firstChild);
  }
  stopTimer();
  // reset Timer
  timerOn = false;
  totalSeconds = 0;
  secondsLabel.innerHTML = '00';
  minutesLabel.innerHTML = '00';
  // add new Deck
  createDeck();
  openCards = [];
  // reset moves
  if (count >= 10 && count < 20) {
    stars[0].classList.toggle('hide');
  } else if (count >= 20) {
    stars[1].classList.toggle('hide');
    stars[0].classList.toggle('hide');
  }
  count = 0;
  document.querySelector('.moves').innerText = count + ' Moves';
})
// Modal from https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
