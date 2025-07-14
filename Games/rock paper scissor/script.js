function play(userChoice) {
  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById("user-choice").textContent = `You chose: ${userChoice}`;
  document.getElementById("computer-choice").textContent = `Computer chose: ${computerChoice}`;

  let result = "";

  if (userChoice === computerChoice) {
    result = "It's a tie!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    result = "You win! 🎉";
  } else {
    result = "You lose! 😢";
  }

  document.getElementById("winner").textContent = `Result: ${result}`;
}
