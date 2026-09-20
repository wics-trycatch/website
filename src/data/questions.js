export const MCQS = {
  1: { q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyperlink Text Management Language', 'Home Tool Markup Language'], answer: 0 },
  2: { q: 'Which symbol is used for a single-line comment in JavaScript?', options: ['`<!-- -->`', '`//`', '`##`', '`**`'], answer: 1 },
  3: { q: 'Which keyword creates a variable that can be reassigned in JavaScript?', options: ['`const`', '`let`', '`fixed`', '`varies`'], answer: 1 },
  4: { q: 'What does CSS mainly control?', options: ['Database storage', 'Website appearance', 'Server hardware', 'User passwords'], answer: 1 },
  5: { q: 'Which data type represents `true` or `false`?', options: ['String', 'Number', 'Boolean', 'Array'], answer: 2 },
  6: { q: 'Which method prints something to the browser console?', options: ['`console.log()`', '`print.console()`', '`log.console()`', '`browser.print()`'], answer: 0 },
  7: { q: 'Which of these is a web browser?', options: ['Chrome', 'Spreadsheet', 'Keyboard', 'Router'], answer: 0 },
  8: { q: 'Which HTML tag is used to create a button?', options: ['`<click>`', '`<button>`', '`<btn>`', '`<input-button>`'], answer: 1 },
  9: { q: 'What does a loop do?', options: ['Stores an image', 'Repeats code', 'Deletes a variable', 'Creates a website'], answer: 1 },
  10: { q: 'What does "www" stand for in a web address?', options: ['World Wide Web', 'Wide World Window', 'Web Wide Works', 'World Web Wire'], answer: 0 },
  11: { q: 'What is an array used for?', options: ['Storing multiple values', 'Styling text', 'Creating passwords', 'Connecting to Wi-Fi'], answer: 0 },
  12: { q: 'Which keyword stops a loop immediately?', options: ['`stop`', '`exit`', '`break`', '`end`'], answer: 2 },
  13: { q: 'What does `Math.random()` give you?', options: ['A random number', 'A random letter only', 'A random HTML tag', 'A random Boolean only'], answer: 0 },
  14: { q: 'What does a function allow you to do?', options: ['Reuse a block of code', 'Delete the browser', "Change your computer's OS", 'Create electricity'], answer: 0 },
  15: { q: 'Who is often called the first computer programmer?', options: ['Ada Lovelace', 'Thomas Edison', 'Marie Curie', 'Isaac Newton'], answer: 0 },
};

export const CODE_CHALLENGES = [
  { id: 'infinite-loop', prompt: 'This loop runs forever. Which block stops it?', code: 'while (true) {\n    console.log("🐍");\n    ______\n}', options: ['break;', 'continue;', 'restart;', 'stopLoop;'], answer: 0 },
  { id: 'lives', prompt: 'Which block changes `lives` to 2?', code: 'let lives = 3;\n______\nconsole.log(lives);', options: ['lives == 2;', 'lives = 2;', 'lives === 2;', 'change lives to 2;'], answer: 1 },
  { id: 'roll-six', prompt: 'The player rolled a 6. Which condition checks that?', code: 'let roll = 6;\n\nif (______) {\n    console.log("You climbed!");\n}', options: ['roll = 6', 'roll == 6', 'roll => 6', 'roll equals 6'], answer: 1 },
  { id: 'score', prompt: 'Which block increases the score by 1?', code: 'let score = 10;\n______', options: ['score =+ 1;', 'score + 1;', 'score += 1;', 'score ==+ 1;'], answer: 2 },
  { id: 'call-function', prompt: 'Which block runs the function?', code: 'function climbLadder() {\n    console.log("Up!");\n}\n\n______', options: ['run climbLadder;', 'climbLadder();', 'function.climbLadder();', 'call = climbLadder;'], answer: 1 },
  { id: 'first-player', prompt: 'How do you get the first player?', code: 'let players = ["A", "B", "C"];\nconsole.log(______);', options: ['players[1]', 'players(0)', 'players[0]', 'players.first'], answer: 2 },
  { id: 'even', prompt: 'Which condition checks that `roll` is even?', code: 'let roll = 4;\n\nif (______) {\n    console.log("Even!");\n}', options: ['roll / 2 == 0', 'roll % 2 == 0', 'roll % 2 == 1', 'roll / 2 == 1'], answer: 1 },
  { id: 'click', prompt: 'Which one runs `movePlayer` when the button is clicked?', code: 'button.addEventListener("click", ______);', options: ['movePlayer()', 'movePlayer', '"movePlayer"', 'call movePlayer'], answer: 1 },
  { id: 'dice', prompt: 'Which gives a random whole number from 1 to 6?', code: 'let roll = ______;', options: ['Math.random(1, 6)', 'Math.floor(Math.random() * 6) + 1', 'random(6)', 'Math.random() + 6'], answer: 1 },
  { id: 'inner-text', prompt: 'Which property changes the text on the page?', code: 'document.getElementById("message").______ = "You won!";', options: ['text', 'innerText', 'changeText', 'valueText'], answer: 1 },
  { id: 'lose-life', prompt: 'Which block removes one life?', code: 'let lives = 3;\n______', options: ['lives--;', 'lives =- 1;', 'lives - 1;', 'remove(lives);'], answer: 0 },
  { id: 'for-loop', prompt: 'What goes in the blank so the loop counts up?', code: 'for (let i = 0; i < 5; ______) {\n    console.log(i);\n}', options: ['i--', 'i++', 'i = 0', 'i + 5'], answer: 1 },
  { id: 'snake-lookup', prompt: 'Which value checks if the current square has a snake?', code: 'let position = 14;\n\nif (snakes[______]) {\n    console.log("Snake!");\n}', options: ['position', '"position"', 'snake', '14 + snake'], answer: 0 },
  { id: 'return', prompt: 'Which block makes this print 8?', code: 'function double(x) {\n    ______\n}\n\nconsole.log(double(4));', options: ['x * 2;', 'return x * 2;', 'give x * 2;', 'console x * 2;'], answer: 1 },
  { id: 'win-check', prompt: 'Which operator checks the position is exactly 100?', code: 'let position = 100;\n\nif (position ______ 100) {\n    console.log("You win!");\n}', options: ['=', '==', '=>', 'equals'], answer: 1 },
];

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};