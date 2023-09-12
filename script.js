'use strict';
const maxScore = 20;
let score = maxScore;
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
const elementAgain = document.querySelector('.again');
const elementHint = document.querySelector('.hint');
const elementGuess = document.querySelector('.guess');

window.addEventListener('load', getSecretWordAndHint);
document.querySelector('.check').addEventListener('click', checkAnswer);
document.querySelector('.again').addEventListener('click', againButton);

function displayElementContent(elementSelector, text) {
  document.querySelector(elementSelector).textContent = text;
}

function getRandomValue() {
  const randomIndex = Math.trunc(Math.random() * value.length);
  return value[randomIndex];
}

function getSecretWordAndHint() {
  secretWord = getRandomValue().word;
  hints = getRandomValue().hint;
  elementHint.textContent = hints;
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
        `Nope! Think harder 🧐! You have ${
          maxAttempts - attempts
        } attempts left.`
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

function againButton() {
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
