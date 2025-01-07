const readline = require("readline");
const random_number = Math.floor(Math.random() * 100) + 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(
  `\nWelcome to the Number Guessing Game! \n\nI'm thinking of a number between 1 and 100. \n\nYou have to select dificulty level to start the game.\n\n`
);

console.log("Please select the difficulty level \n");
const level = ["Easy (10 chances)", "Medium (5 chances)", "Hard (3 chances)"];

level.forEach((option, index) => {
  console.log(`${index + 1}. ${option}`);
});

const choice = [
  { run, level: 1, name: "easy", attempts: 10 },
  { run, level: 2, name: "medium", attempts: 5 },
  { run, level: 3, name: "hard", attempts: 3 },
];

rl.question("\n Enter your choice:", (input) => {
  const numInput = Number(input);
  if (numInput > choice.length) {
    console.log("Please select the number between 1 to 3");
    rl.close();
  } else {
    const selectedOtption = choice.find((level) => level.level === numInput);
    if (selectedOtption) {
      console.log(
        `You have selected level ${selectedOtption.name}, You have ${selectedOtption.attempts} attempts`
      );
      selectedOtption.run(selectedOtption.attempts);
    }
  }
});

function run(attempts) {
  let guess_count = 0;
  let max_guess_count = Number(attempts);
  function runagain() {
    rl.question("Guess the number - ", (guess) => {
      guess_count++;
      let guessed_Number = Number(guess);
      if (guess_count === max_guess_count) {
        console.log("Exhausted all chances! Over!");
        rl.close();
      } else {
        if (guessed_Number > random_number) {
          console.log(`The number is less than ${guessed_Number}`);
          console.log(`remaining guesses ${max_guess_count - guess_count}`);
          runagain();
        } else if (guessed_Number < random_number) {
          console.log(`The number is greater than ${guessed_Number}`);
          console.log(`remaining guesses ${max_guess_count - guess_count}`);
          runagain();
        } else if (guessed_Number === random_number) {
          console.log("Yes You won the game!! You guessed correct number");
          rl.close();
        }
      }
    });
  }
  runagain();
}
