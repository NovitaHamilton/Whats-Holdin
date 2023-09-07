'use strict';
let score = 20;
let highscore = 0;
const maxAttempts = 3;
let attempts = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const words = ['jug', 'crimp', 'sloper', 'pocket', 'pinch'];
const hints = [
  'Makes you feel like you can conquer the world',
  'Feels like tiny razor blades for your fingers',
  'Might look innocent, but a sly fox trying to trick you into falling off the wall',
  'Might as well pull a pulley',
  'Squeeze em tight and feel the burn',
];
let randomIndex = Math.trunc(Math.random() * words.length);

function getRandomWord() {
  return words[randomIndex];
}

// Generate random word
let secretWord = getRandomWord();
console.log(secretWord);

// Give a hint
function getHint() {
  return hints[randomIndex];
}
let hint = getHint();
console.log(hint);
document.querySelector('.hint').textContent = hint;

document.querySelector('.check').addEventListener('click', function () {
  //   const guess = Number(document.querySelector('.guess').value);
  const guess = document.querySelector('.guess').value;
  // When there's no input
  if (!guess) {
    displayMessage(
      `⛔️ No word entered! You have ${maxAttempts - attempts} attempts left.`
    );
  } else if (guess === secretWord) {
    displayMessage("That's right! 🎉");
    document.querySelector('.number').textContent = secretWord;
    document.querySelector('body').style.backgroundColor = '#648eb2';
    document.querySelector('.number').style.width = '60rem';
    document.querySelector('.message').style.color = '#eee';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretWord) {
    attempts++;
    if (score > 1 && attempts < maxAttempts) {
      displayMessage(
        `Nope! Think harder 🧐! You have ${
          maxAttempts - attempts
        } attempts left.`
      );
      document.querySelector('.message').style.color = '#f80404';
      score--;
      displayScore(score);
    } else {
      displayMessage(
        `😩 You lost the game! The correct answer is ${secretWord}.`
      );
      displayScore(0);
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  //   secretNumber = Math.trunc(Math.random() * 20) + 1;
  randomIndex = Math.trunc(Math.random() * words.length);
  secretWord = getRandomWord();
  hint = getHint();
  document.querySelector('.hint').textContent = hint;
  document.querySelector('.number').textContent = '?';
  displayMessage('Start guessing...');
  document.querySelector('.message').style.color = '#eee';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  displayScore(score);
  attempts = 0;
});
