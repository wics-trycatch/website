export const POOL = [
  // ---- mcq: normal trivia ----
  { id: 'mcq-html', kind: 'mcq', tier: 'easy', q: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyperlink Text Management Language', 'Home Tool Markup Language'], answer: 0 },
  { id: 'mcq-comment', kind: 'mcq', tier: 'easy', q: 'Which symbol is used for a single-line comment in JavaScript?', options: ['`<!-- -->`', '`//`', '`##`', '`**`'], answer: 1 },
  { id: 'mcq-let', kind: 'mcq', tier: 'easy', q: 'Which keyword creates a variable that can be reassigned in JavaScript?', options: ['`const`', '`let`', '`fixed`', '`varies`'], answer: 1 },
  { id: 'mcq-css', kind: 'mcq', tier: 'easy', q: 'What does CSS mainly control?', options: ['Database storage', 'Website appearance', 'Server hardware', 'User passwords'], answer: 1 },
  { id: 'mcq-boolean', kind: 'mcq', tier: 'easy', q: "Which data type represents `true` or `false`?", options: ['String', 'Number', 'Boolean', 'Array'], answer: 2 },
  { id: 'mcq-console', kind: 'mcq', tier: 'easy', q: 'Which method prints something to the browser console?', options: ['`console.log()`', '`print.console()`', '`log.console()`', '`browser.print()`'], answer: 0 },
  { id: 'mcq-browser', kind: 'mcq', tier: 'easy', q: 'Which of these is a web browser?', options: ['Chrome', 'Spreadsheet', 'Keyboard', 'Router'], answer: 0 },
  { id: 'mcq-button', kind: 'mcq', tier: 'easy', q: 'Which HTML tag is used to create a button?', options: ['`<click>`', '`<button>`', '`<btn>`', '`<input-button>`'], answer: 1 },
  { id: 'mcq-loop', kind: 'mcq', tier: 'easy', q: 'What does a loop do?', options: ['Stores an image', 'Repeats code', 'Deletes a variable', 'Creates a website'], answer: 1 },
  { id: 'mcq-www', kind: 'mcq', tier: 'easy', q: 'What does "www" stand for in a web address?', options: ['World Wide Web', 'Wide World Window', 'Web Wide Works', 'World Web Wire'], answer: 0 },
  { id: 'mcq-array', kind: 'mcq', tier: 'easy', q: 'What is an array used for?', options: ['Storing multiple values', 'Styling text', 'Creating passwords', 'Connecting to Wi-Fi'], answer: 0 },
  { id: 'mcq-lovelace', kind: 'mcq', tier: 'easy', q: 'Who is often called the first computer programmer?', options: ['Ada Lovelace', 'Thomas Edison', 'Marie Curie', 'Isaac Newton'], answer: 0 },
  // ---- task: easy (do something at the event) ----
  { id: 'task-doodle', kind: 'task', tier: 'easy', title: 'Doodle "coding"', detail: 'Doodle what you think "coding" looks like, then photograph your doodle.', proof: 'photo' },
  { id: 'task-dream-job', kind: 'task', tier: 'easy', title: 'Dream job wall', detail: 'Write your dream job on the sticky-note wall, then photograph your sticky note on the wall.', proof: 'photo' },
  { id: 'task-banner-photo', kind: 'task', tier: 'easy', title: 'Photograph the banner', detail: 'Snap a photo of the WiCS banner.', proof: 'photo' },
  { id: 'task-match-language', kind: 'task', tier: 'easy', title: 'Match the language', detail: "Find the code snippet poster, then photograph it and type which language it's written in.", proof: 'both', inputLabel: 'Which language?' },
  { id: 'task-match-logo', kind: 'task', tier: 'easy', title: 'Match the logo', detail: 'Find a tech company logo somewhere at the event, photograph it, and type which company it is.', proof: 'both', inputLabel: 'Which company?' },
  { id: 'task-pose-mascot', kind: 'task', tier: 'easy', title: 'Pose with the sign', detail: 'Find the Try/CATCH sign or poster and take a photo of yourself with it.', proof: 'photo' },

  // ---- task: social (go talk to someone) ----
  { id: 'task-meet-exec', kind: 'task', tier: 'social', title: 'Meet a WiCS exec', detail: 'Introduce yourself to a WiCS exec, take a photo together, and say what their favorite course has been.', proof: 'both', inputLabel: "What'd they say?" },
  { id: 'task-ask-organizer', kind: 'task', tier: 'social', title: 'Ask an organizer', detail: 'Ask an organizer what surprised them most about planning Try/CATCH this year, and snap a photo with them.', proof: 'both', inputLabel: "What'd they say?" },
  { id: 'task-fist-bump', kind: 'task', tier: 'social', title: 'Fist-bump an organizer', detail: 'Find an organizer or volunteer, give them a fist-bump, and photograph the moment.', proof: 'photo' },
  { id: 'task-lanyard', kind: 'task', tier: 'social', title: 'Find the lanyard', detail: 'Find the volunteer wearing a specially colored lanyard, say hi, and take a photo with them.', proof: 'both', inputLabel: 'What color was it?' },
  { id: 'task-handshake', kind: 'task', tier: 'social', title: 'Teach a handshake', detail: 'Teach a friend a handshake, then photograph yourselves mid-handshake.', proof: 'photo' },

  // ---- task: bold (actually out of your comfort zone — DRAFT, please edit) ----
  { id: 'task-meet-stranger', kind: 'task', tier: 'bold', title: 'Meet someone new', detail: "Introduce yourself to someone you've never met before, snap a photo together, and share one fun fact you learned.", proof: 'both', inputLabel: "What'd you learn?" },
  { id: 'task-ask-speaker', kind: 'task', tier: 'bold', title: 'Ask in front of others', detail: 'Go ask a speaker, panelist, or sponsor rep a question — out loud, in front of other people — then photograph the moment.', proof: 'both', inputLabel: "What'd you ask?" },
  { id: 'task-trivia-station', kind: 'task', tier: 'bold', title: 'Trivia on the mic', detail: 'Head to the trivia station, answer a question in front of the group, then get someone to photograph you up there.', proof: 'both', inputLabel: 'Your answer' },

  // ---- task: finale (only ever used on the very last square) ----
  { id: 'task-mystery-object', kind: 'task', tier: 'finale', title: 'Find the mystery object', detail: 'Somewhere at the event, there\'s a hidden "mystery object." Track it down, then photograph it to claim your prize!', proof: 'photo' },
  { id: 'task-group-photo', kind: 'task', tier: 'finale', title: 'Group photo finish', detail: 'Take a group photo with 3 people you met today to claim your prize!', proof: 'photo' },
];

export const POOL_BY_ID = new Map(POOL.map((item) => [item.id, item]));

// Snake bite puzzles. Each is tagged with a "flavor" matching the message
// shown when the snake bites: an infinite loop, a syntax error, or a bug in
// the code. One is picked at random from the matching flavor's pool.
export const SNAKE_FLAVORS = {
  loop: { emoji: '♾️', label: 'Infinite loop!' },
  syntax: { emoji: '⚠️', label: 'Syntax error!' },
  bug: { emoji: '🐛', label: 'Bug in your code!' },
};

export const CODE_CHALLENGES = [
  { id: 'infinite-loop', flavor: 'loop', prompt: 'This loop runs forever. Which block stops it?', code: 'while (true) {\n    console.log("🐍");\n    ______\n}', options: ['break;', 'continue;', 'restart;', 'stopLoop;'], answer: 0 },
  { id: 'roll-six', flavor: 'loop', prompt: 'The player rolled a 6. Which condition checks that?', code: 'let roll = 6;\n\nif (______) {\n    console.log("You climbed!");\n}', options: ['roll = 6', 'roll == 6', 'roll => 6', 'roll equals 6'], answer: 1 },
  { id: 'for-loop', flavor: 'loop', prompt: 'What goes in the blank so the loop counts up?', code: 'for (let i = 0; i < 5; ______) {\n    console.log(i);\n}', options: ['i--', 'i++', 'i = 0', 'i + 5'], answer: 1 },
  { id: 'win-check', flavor: 'loop', prompt: 'Which operator checks the position is exactly 100?', code: 'let position = 100;\n\nif (position ______ 100) {\n    console.log("You win!");\n}', options: ['=', '==', '=>', 'equals'], answer: 1 },
  { id: 'even', flavor: 'loop', prompt: 'Which condition checks that `roll` is even?', code: 'let roll = 4;\n\nif (______) {\n    console.log("Even!");\n}', options: ['roll / 2 == 0', 'roll % 2 == 0', 'roll % 2 == 1', 'roll / 2 == 1'], answer: 1 },

  { id: 'lives', flavor: 'syntax', prompt: 'Which block changes `lives` to 2?', code: 'let lives = 3;\n______\nconsole.log(lives);', options: ['lives == 2;', 'lives = 2;', 'lives === 2;', 'change lives to 2;'], answer: 1 },
  { id: 'score', flavor: 'syntax', prompt: 'Which block increases the score by 1?', code: 'let score = 10;\n______', options: ['score =+ 1;', 'score + 1;', 'score += 1;', 'score ==+ 1;'], answer: 2 },
  { id: 'call-function', flavor: 'syntax', prompt: 'Which block runs the function?', code: 'function climbLadder() {\n    console.log("Up!");\n}\n\n______', options: ['run climbLadder;', 'climbLadder();', 'function.climbLadder();', 'call = climbLadder;'], answer: 1 },
  { id: 'click', flavor: 'syntax', prompt: 'Which one runs `movePlayer` when the button is clicked?', code: 'button.addEventListener("click", ______);', options: ['movePlayer()', 'movePlayer', '"movePlayer"', 'call movePlayer'], answer: 1 },
  { id: 'return', flavor: 'syntax', prompt: 'Which block makes this print 8?', code: 'function double(x) {\n    ______\n}\n\nconsole.log(double(4));', options: ['x * 2;', 'return x * 2;', 'give x * 2;', 'console x * 2;'], answer: 1 },

  { id: 'first-player', flavor: 'bug', prompt: 'How do you get the first player?', code: 'let players = ["A", "B", "C"];\nconsole.log(______);', options: ['players[1]', 'players(0)', 'players[0]', 'players.first'], answer: 2 },
  { id: 'dice', flavor: 'bug', prompt: 'Which gives a random whole number from 1 to 6?', code: 'let roll = ______;', options: ['Math.random(1, 6)', 'Math.floor(Math.random() * 6) + 1', 'random(6)', 'Math.random() + 6'], answer: 1 },
  { id: 'inner-text', flavor: 'bug', prompt: 'Which property changes the text on the page?', code: 'document.getElementById("message").______ = "You won!";', options: ['text', 'innerText', 'changeText', 'valueText'], answer: 1 },
  { id: 'lose-life', flavor: 'bug', prompt: 'Which block removes one life?', code: 'let lives = 3;\n______', options: ['lives--;', 'lives =- 1;', 'lives - 1;', 'remove(lives);'], answer: 0 },
  { id: 'snake-lookup', flavor: 'bug', prompt: 'Which value checks if the current square has a snake?', code: 'let position = 14;\n\nif (snakes[______]) {\n    console.log("Snake!");\n}', options: ['position', '"position"', 'snake', '14 + snake'], answer: 0 },
];

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
