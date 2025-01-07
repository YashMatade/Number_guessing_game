const readline = require("readline");
const random_number = Math.floor(Math.random() * 100) + 1;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Static messages
const MESSAGES = {
  welcome: `
Welcome to the Number Guessing Game!

I'm thinking of a number between 1 and 100.

You have to select a difficulty level to start the game.
`,
  levels: [
    "1. Easy (10 chances)",
    "2. Medium (5 chances)",
    "3. Hard (3 chances)",
  ],
  invalidChoice: "Invalid choice! Please select a number between 1 and 3.",
  exhausted: "You've exhausted all your chances! Game over!",
  won: "Yes, you won the game! You guessed the correct number!",
};

const CHOICES = [
  { level: 1, name: "Easy", attempts: 10 },
  { level: 2, name: "Medium", attempts: 5 },
  { level: 3, name: "Hard", attempts: 3 },
];

// Display welcome message and levels
console.log(MESSAGES.welcome);
MESSAGES.levels.forEach((message) => console.log(message));

// Start the game
rl.question("\nEnter your choice: ", (input) => {
  const numInput = parseInt(input, 10);

  // Validate input
  if (isNaN(numInput) || numInput < 1 || numInput > CHOICES.length) {
    console.log(MESSAGES.invalidChoice);
    rl.close();
    return;
  }

  // Find selected level
  const selectedOption = CHOICES.find((choice) => choice.level === numInput);
  console.log(
    `\nYou selected ${selectedOption.name}. You have ${selectedOption.attempts} attempts.`
  );

  startGame(selectedOption.attempts);
});

// Game logic
function startGame(maxAttempts) {
  let attemptsLeft = maxAttempts;

  const promptUser = () => {
    rl.question("Guess the number: ", (guess) => {
      const guessedNumber = parseInt(guess, 10);

      if (isNaN(guessedNumber)) {
        console.log("Invalid input! Please enter a number.");
        promptUser();
        return;
      }

      attemptsLeft--;

      if (guessedNumber === random_number) {
        console.log(MESSAGES.won);
        rl.close();
      } else if (attemptsLeft === 0) {
        console.log(MESSAGES.exhausted);
        console.log(`The correct number was ${random_number}.`);
        rl.close();
      } else {
        const hint =
          guessedNumber > random_number
            ? `The number is less than ${guessedNumber}.`
            : `The number is greater than ${guessedNumber}.`;
        console.log(hint);
        console.log(`Remaining attempts: ${attemptsLeft}`);
        promptUser();
      }
    });
  };

  // Start the first prompt
  promptUser();
}
