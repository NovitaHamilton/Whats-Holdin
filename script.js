'use strict';

const maxScore = 20;
let score = 20;
let highscore = 0;
const maxAttempts = 3;
let attempts = 0;
let secretWord;
let hints;
const value = [
  { word: 'jug', hint: 'Makes you feel like you can conquer the world' },
  { word: 'crimp', hint: 'Feels like tiny razor blades for your fingers' },
  {
    word: 'sloper',
    hint: 'Might look innocent, but a sly fox trying to trick you into falling off the wall',
  },
  { word: 'pocket', hint: 'Might as well pull a pulley' },
  { word: 'pinch', hint: 'Squeeze em tight and feel the burn' },
];

const elementNumber = document.querySelector('.number');
const elementBody = document.querySelector('body');
const elementMessage = document.querySelector('.message');
const elementHighscore = document.querySelector('.highscore');
const elementReset = document.querySelector('.reset');
const elementHint = document.querySelector('.hint');
const elementGuess = document.querySelector('.guess');
const elementCheck = document.querySelector('.check');

window.addEventListener('load', getSecretWordAndHint);
elementCheck.addEventListener('click', checkAnswer);
elementGuess.addEventListener('keydown', checkAnswerOnEnter);
elementReset.addEventListener('click', resetButton);

elementReset.addEventListener('keydown', function (event) {
  console.log(event.key);
});

function resetButton() {
  score = maxScore;
  getSecretWordAndHint();
  elementNumber.textContent = '?';
  displayElementContent('.message', 'Start guessing...');
  elementMessage.style.color = '#eee';
  elementGuess.value = '';
  elementBody.style.backgroundColor = '#222';
  elementNumber.style.width = '15rem';
  displayElementContent('.score', score);
  attempts = 0;
}

function checkAnswer() {
  const guess = document.querySelector('.guess').value;
  // When there's no input
  if (!guess) {
    displayElementContent(
      '.message',
      `⛔️ No word entered! You have ${maxAttempts - attempts} attempts left.`
    );
  } else if (guess === secretWord) {
    displayElementContent('.message', "That's right! 🎉");
    elementNumber.textContent = secretWord;
    elementBody.style.backgroundColor = '#648eb2';
    elementNumber.style.width = '60rem';
    elementMessage.style.color = '#eee';
    if (score > highscore) {
      highscore = score;
      elementHighscore.textContent = highscore;
    }
  } else if (guess !== secretWord) {
    attempts++;
    if (score > 1 && attempts < maxAttempts) {
      displayElementContent(
        '.message',
        `Nope, think harder 🧐!
        You have ${maxAttempts - attempts} attempts left.`
      );
      elementMessage.style.color = '#f80404';
      score--;
      displayElementContent('.score', score);
    } else {
      displayElementContent(
        '.message',
        `😩 You lost the game! The correct answer is ${secretWord}.`
      );
      displayElementContent('.score', 0);
    }
  }
}

function checkAnswerOnEnter(event) {
  if (event.key === 'Enter') {
    checkAnswer();
  }
}

function displayElementContent(elementSelector, text) {
  document.querySelector(elementSelector).textContent = text;
}

function getRandomValue() {
  const randomIndex = Math.trunc(Math.random() * value.length);
  return value[randomIndex];
}

function getSecretWordAndHint() {
  const randomValue = getRandomValue();
  secretWord = randomValue.word;
  hints = randomValue.hint;
  elementHint.textContent = hints;
}
