// Content for the Snakes & Ladders game.
//
// Every non-snake square draws from POOL below instead of a fixed 1:1
// mapping — each new game shuffles a fresh square -> item assignment (see
// assignSquares in utils/pickGame.js), so replaying feels different and no
// two players necessarily get the same board.
//
// Each item is one of:
//   kind: 'task' — a real, in-person thing to go do. Honor system: player
//         does it, optionally types what they saw/wrote/heard (if
//         `proof`), then marks it done. No right/wrong.
//   kind: 'mcq'  — a normal multiple-choice trivia question about SFU WiCS,
//         Try/CATCH, networking, or women in tech. Shown as a quick trivia card;
//         continuing (and climbing any ladder) doesn't depend on getting
//         it right, it's just there for fun/immediate feedback.
//
// tier on a task is 'easy' (self-contained, low social ask), 'social'
// (go talk to someone), or 'bold' (actually out of your comfort zone).
// assignSquares guarantees at least 2 'bold' tasks land on every board, so
// everyone gets pushed a little. 'finale' is reserved for the last square
// only — the grand finish-line task.

export const POOL = [
  // ---- mcq: SFU WiCS, Try/CATCH & Women in Tech trivia ----
  {
    id: 'mcq-mascot',
    kind: 'mcq',
    tier: 'easy',
    q: 'What is the official mascot of SFU WiCS?',
    options: ['Cosmos', 'Byte', 'Sparky', 'Archie'],
    answer: 0,
  },
  {
    id: 'mcq-founded',
    kind: 'mcq',
    tier: 'easy',
    q: 'In what year was SFU WiCS founded?',
    options: ['2002', '1998', '2010', '2015'],
    answer: 0,
  },
  {
    id: 'mcq-wics-meaning',
    kind: 'mcq',
    tier: 'easy',
    q: 'What does the acronym "WiCS" stand for at Simon Fraser University?',
    options: [
      'Women in Computing Science',
      'Women in Computer Software',
      'World in Computing Systems',
      'Women in Creative Sciences',
    ],
    answer: 0,
  },
  {
    id: 'mcq-trycatch-meaning',
    kind: 'mcq',
    tier: 'easy',
    q: 'What does "Try/CATCH" stand for in the context of this conference?',
    options: [
      'Computing and Technology Conference for Her',
      'Career and Technology Community Hub',
      'Computer Algorithms and Tech Challenge for Her',
      'Creative Applied Technology Camp for High-schoolers',
    ],
    answer: 0,
  },
  {
    id: 'mcq-web-dev',
    kind: 'mcq',
    tier: 'easy',
    q: 'In the Try/CATCH 2026 Web Dev workshop, which three foundational languages are used to build interactive websites?',
    options: [
      'HTML, CSS, and JavaScript',
      'Python, Java, and C++',
      'SQL, Ruby, and PHP',
      'Swift, Kotlin, and Rust',
    ],
    answer: 0,
  },
  {
    id: 'mcq-faculty',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which faculty at SFU does the School of Computing Science belong to?',
    options: [
      'Faculty of Applied Sciences (FAS)',
      'Faculty of Science',
      'Faculty of Arts and Social Sciences',
      'Beedie School of Business',
    ],
    answer: 0,
  },
  {
    id: 'mcq-wics-values',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which four pillars represent the core mission of SFU WiCS?',
    options: [
      'Promote, Support, Challenge, Build',
      'Code, Test, Debug, Deploy',
      'Compete, Win, Conquer, Repeat',
      'Study, Memorize, Repeat, Rest',
    ],
    answer: 0,
  },
  {
    id: 'mcq-cybersecurity',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which hands-on platform do attendees explore in the Try/CATCH 2026 Cybersecurity workshop to learn ethical hacking concepts?',
    options: ['TryHackMe', 'LeetCode', 'Scratch', 'Roblox Studio'],
    answer: 0,
  },
  {
    id: 'mcq-robotics',
    kind: 'mcq',
    tier: 'easy',
    q: 'In the Try/CATCH 2026 Robot Lab workshop, how do students test their robot navigation before deploying code to physical hardware?',
    options: [
      'In an interactive 3D physics simulator',
      'By drawing blueprints on paper',
      'Using a spreadsheet calculator',
      'Through audio voice commands only',
    ],
    answer: 0,
  },
  {
    id: 'mcq-lovelace',
    kind: 'mcq',
    tier: 'easy',
    q: 'Who wrote the first computer algorithm in 1843 and is celebrated as the world\'s first computer programmer?',
    options: ['Ada Lovelace', 'Thomas Edison', 'Marie Curie', 'Isaac Newton'],
    answer: 0,
  },
  {
    id: 'mcq-grace-hopper',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which computer science pioneer popularized the term "debugging" after finding a real moth in a computer relay?',
    options: ['Grace Hopper', 'Ada Lovelace', 'Katherine Johnson', 'Hedy Lamarr'],
    answer: 0,
  },
  {
    id: 'mcq-margaret-hamilton',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which computer scientist led the MIT team that developed NASA\'s Apollo 11 flight software and popularized the term "software engineering"?',
    options: [
      'Margaret Hamilton',
      'Katherine Johnson',
      'Hedy Lamarr',
      'Adele Goldberg',
    ],
    answer: 0,
  },
  {
    id: 'mcq-hedy-lamarr',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which brilliant inventor and actress co-patented frequency-hopping spread spectrum technology, paving the way for Wi-Fi and Bluetooth?',
    options: [
      'Hedy Lamarr',
      'Radia Perlman',
      'Joan Clarke',
      'Annie Easley',
    ],
    answer: 0,
  },
  {
    id: 'mcq-katherine-johnson',
    kind: 'mcq',
    tier: 'easy',
    q: 'Which pioneering NASA mathematician calculated orbital trajectories for John Glenn and the historic Apollo 11 Moon landing mission?',
    options: [
      'Katherine Johnson',
      'Ada Lovelace',
      'Grace Hopper',
      'Mary Jackson',
    ],
    answer: 0,
  },

  // ---- task: easy (interactive & event tasks) ----
  {
    id: 'task-first-workshop',
    kind: 'task',
    tier: 'easy',
    title: 'First workshop attended',
    detail: 'What was the first workshop you attended at Try/CATCH today? Type its title below!',
    proof: 'text',
    inputLabel: 'Which workshop did you attend first?',
  },
  {
    id: 'task-fav-merch',
    kind: 'task',
    tier: 'easy',
    title: 'Favorite merch',
    detail: 'What was your favorite piece of Try/CATCH merch or swag today (stickers, tote bag, t-shirt, pins)? Tell us what you got!',
    proof: 'text',
    inputLabel: 'Your favorite merch item',
  },
  {
    id: 'task-doodle-mascot',
    kind: 'task',
    tier: 'easy',
    title: 'Doodle Cosmos',
    detail: 'Doodle Cosmos (the SFU WiCS alien astronaut mascot) or your favorite part of today, then snap a photo of your drawing!',
    proof: 'photo',
  },
  {
    id: 'task-dream-job',
    kind: 'task',
    tier: 'easy',
    title: 'Dream job wall',
    detail: 'Write your dream job on the sticky-note wall, then photograph your sticky note on the wall.',
    proof: 'photo',
  },
  {
    id: 'task-banner-photo',
    kind: 'task',
    tier: 'easy',
    title: 'Photograph the banner',
    detail: 'Snap a photo of the WiCS banner or Try/CATCH event signage.',
    proof: 'photo',
  },
  {
    id: 'task-spot-sponsor',
    kind: 'task',
    tier: 'easy',
    title: 'Spot a sponsor',
    detail: 'Find a sponsor booth at the event (e.g. Teck, Orbis, Old Spaghetti Factory, SFU CS), take a photo with the sponsor booth, and type which one it is!',
    proof: 'both',
    inputLabel: 'Which sponsor booth did you visit?',
  },
  {
    id: 'task-pose-mascot',
    kind: 'task',
    tier: 'easy',
    title: 'Pose with the sign or mascot',
    detail: 'Find the Try/CATCH backdrop, sign, or Cosmos mascot artwork and take a photo of yourself with it!',
    proof: 'photo',
  },
  {
    id: 'task-sticker-badge',
    kind: 'task',
    tier: 'easy',
    title: 'Show your badge or sticker',
    detail: 'Snap a photo of your event name badge or a cool sticker you collected today at Try/CATCH!',
    proof: 'photo',
  },
  {
    id: 'task-like-cs',
    kind: 'task',
    tier: 'easy',
    title: 'What you like about CS',
    detail: 'What do you like most about Computer Science and tech (e.g. creating games, solving puzzles, building apps, creativity)? Type your answer below!',
    proof: 'text',
    inputLabel: 'What do you like about computer science?',
  },

  // ---- task: social (networking & talking to someone) ----
  {
    id: 'task-meet-exec',
    kind: 'task',
    tier: 'social',
    title: 'Meet a WiCS exec',
    detail: 'Introduce yourself to a WiCS exec, take a photo together, and ask what their favorite thing about WiCS has been.',
    proof: 'photo',
  },
  {
    id: 'task-ask-organizer',
    kind: 'task',
    tier: 'social',
    title: 'Ask an organizer',
    detail: 'Ask an organizer what surprised them most about planning Try/CATCH this year, and snap a photo with them.',
    proof: 'photo',
  },
  {
    id: 'task-visit-sponsor',
    kind: 'task',
    tier: 'social',
    title: 'Visit a sponsor booth',
    detail: 'Head over to one of our sponsor booths (such as Teck or Orbis), say hello, take a photo with the sponsor booth, and share what you learned!',
    proof: 'both',
    inputLabel: 'Which sponsor did you talk to and what did you learn?',
  },
  {
    id: 'task-organizer-advice',
    kind: 'task',
    tier: 'social',
    title: 'Get some advice',
    detail: 'Ask an organizer or volunteer for one piece of advice about university or exploring tech, and share what they told you!',
    proof: 'text',
    inputLabel: "What'd they say?",
  },
  {
    id: 'task-volunteer-shirt',
    kind: 'task',
    tier: 'social',
    title: 'Find a volunteer',
    detail: 'Find someone wearing a volunteer t-shirt, say hi, and take a photo with them.',
    proof: 'photo',
  },
  {
    id: 'task-swap-tip',
    kind: 'task',
    tier: 'social',
    title: 'Swap a tip',
    detail: 'Ask another attendee for their best high school or study tip, then photograph the two of you.',
    proof: 'photo',
  },
  {
    id: 'task-new-friend',
    kind: 'task',
    tier: 'social',
    title: 'Make a new connection',
    detail: 'Meet someone from another school and ask what brought them to Try/CATCH today!',
    proof: 'text',
    inputLabel: 'Who did you meet and why are they here?',
  },
  {
    id: 'task-favorite-moment',
    kind: 'task',
    tier: 'social',
    title: 'Compare favorite moments',
    detail: 'Ask another attendee what the coolest thing they saw or made today was!',
    proof: 'text',
    inputLabel: 'What was their favorite moment?',
  },

  // ---- task: bold (comfort zone stretch) ----
  {
    id: 'task-meet-stranger',
    kind: 'task',
    tier: 'bold',
    title: 'Meet someone new',
    detail: "Introduce yourself to someone you've never met before and share one fun fact you learned about them!",
    proof: 'text',
    inputLabel: "What'd you learn?",
  },
  {
    id: 'task-ask-speaker',
    kind: 'task',
    tier: 'bold',
    title: 'Talk to a speaker',
    detail: 'After their talk or workshop, go up and ask a speaker or workshop lead one question, and type what you asked!',
    proof: 'text',
    inputLabel: "What'd you ask?",
  },
  {
    id: 'task-dream-project',
    kind: 'task',
    tier: 'bold',
    title: 'Dream tech project',
    detail: 'If you could build any app, game, or technology to solve a problem or bring people together, what would it be? Describe your idea below!',
    proof: 'text',
    inputLabel: 'What would you create and why?',
  },

  // ---- task: finale (only ever used on the very last square) ----
  {
    id: 'task-group-photo',
    kind: 'task',
    tier: 'finale',
    title: 'Group photo finish',
    detail: 'Take a group photo with 3 people you met today to claim your prize!',
    proof: 'photo',
  },
  {
    id: 'task-finish-selfie',
    kind: 'task',
    tier: 'finale',
    title: 'Victory finish line photo',
    detail: 'Snap a celebratory victory photo with your badge or Try/CATCH swag to claim your prize!',
    proof: 'photo',
  },
];

export const POOL_BY_ID = new Map(POOL.map((item) => [item.id, item]));

// Snake encounter trivia challenges. When the player lands on a snake square,
// answering correctly lets them escape and stay put instead of sliding down.
export const SNAKE_FLAVORS = {
  wics: { emoji: '💜', label: 'SFU WiCS Trivia!' },
  event: { emoji: '✨', label: 'Try/CATCH Trivia!' },
  history: { emoji: '🌟', label: 'Tech & Community!' },
};

export const CODE_CHALLENGES = [
  // ---- flavor: wics ----
  {
    id: 'snake-mascot',
    flavor: 'wics',
    prompt: 'SFU WiCS has a beloved mascot. What is their name?',
    options: ['Cosmos', 'Byte', 'Sparky', 'Archie'],
    answer: 0,
  },
  {
    id: 'snake-founded',
    flavor: 'wics',
    prompt: 'In what year was the SFU Women in Computing Science (WiCS) organization established?',
    options: ['2002', '1998', '2010', '2016'],
    answer: 0,
  },
  {
    id: 'snake-acronym',
    flavor: 'wics',
    prompt: 'What does "WiCS" stand for at Simon Fraser University?',
    options: [
      'Women in Computing Science',
      'Women in Computer Software',
      'World in Computing Systems',
      'Women in Creative Sciences',
    ],
    answer: 0,
  },
  {
    id: 'snake-faculty',
    flavor: 'wics',
    prompt: 'Which faculty at SFU is Computing Science a part of?',
    options: [
      'Faculty of Applied Sciences (FAS)',
      'Faculty of Science',
      'Faculty of Environment',
      'Faculty of Education',
    ],
    answer: 0,
  },
  {
    id: 'snake-values',
    flavor: 'wics',
    prompt: 'Which of the following represents one of SFU WiCS\'s four core values?',
    options: [
      'Promote & support women in tech',
      'Code all night without breaks',
      'Never share your notes',
      'Study completely alone',
    ],
    answer: 0,
  },

  // ---- flavor: event ----
  {
    id: 'snake-trycatch-acronym',
    flavor: 'event',
    prompt: 'What does the conference name Try/CATCH stand for?',
    options: [
      'Computing and Technology Conference for Her',
      'Career and Tech Community Hub',
      'Computer Algorithms & Tech Challenge',
      'Creative Applied Tech Camp for High-schoolers',
    ],
    answer: 0,
  },
  {
    id: 'snake-web-dev',
    flavor: 'event',
    prompt: 'Which three core building blocks are taught in the Try/CATCH 2026 Web Development workshop?',
    options: [
      'HTML, CSS, and JavaScript',
      'Python, Java, and C++',
      'SQL, Ruby, and PHP',
      'Swift, Kotlin, and Rust',
    ],
    answer: 0,
  },
  {
    id: 'snake-tryhackme',
    flavor: 'event',
    prompt: 'Which interactive platform is used in the Try/CATCH 2026 Cybersecurity workshop to explore security challenges?',
    options: ['TryHackMe', 'LeetCode', 'Scratch', 'Roblox Studio'],
    answer: 0,
  },
  {
    id: 'snake-godot',
    flavor: 'event',
    prompt: 'Which beginner-friendly game engine is featured in the 2026 Game Dev workshop?',
    options: ['Godot', 'Unreal Engine 5', 'Roblox Studio', 'CryEngine'],
    answer: 0,
  },
  {
    id: 'snake-figma',
    flavor: 'event',
    prompt: 'Which design tool is used in the Try/CATCH 2026 design workshop to create covers?',
    options: ['Figma', 'Microsoft Paint', 'Notepad', 'Excel'],
    answer: 0,
  },

  // ---- flavor: history ----
  {
    id: 'snake-lovelace',
    flavor: 'history',
    prompt: 'Who is celebrated as the world\'s very first computer programmer for publishing the first algorithm?',
    options: ['Ada Lovelace', 'Grace Hopper', 'Katherine Johnson', 'Hedy Lamarr'],
    answer: 0,
  },
  {
    id: 'snake-grace-hopper',
    flavor: 'history',
    prompt: 'Who popularized the term "debugging" after an actual moth caused a computer glitch?',
    options: ['Grace Hopper', 'Ada Lovelace', 'Margaret Hamilton', 'Joan Clarke'],
    answer: 0,
  },
  {
    id: 'snake-margaret-hamilton',
    flavor: 'history',
    prompt: 'Who led the MIT team developing the Apollo 11 guidance software and popularized the term "software engineering"?',
    options: [
      'Margaret Hamilton',
      'Grace Hopper',
      'Katherine Johnson',
      'Ada Lovelace',
    ],
    answer: 0,
  },
  {
    id: 'snake-wics-community',
    flavor: 'history',
    prompt: 'What kind of community does SFU WiCS strive to create for students?',
    options: [
      'A welcoming, supportive, and inclusive community for everyone in tech',
      'A cutthroat competition where students never help each other',
      'A silent study hall where asking questions is discouraged',
      'An exclusive club only for expert programmers',
    ],
    answer: 0,
  },
  {
    id: 'snake-get-started',
    flavor: 'history',
    prompt: 'What is the best way to get started with coding and technology?',
    options: [
      'Curiosity, hands-on workshops, and building fun projects with friends!',
      'Waiting until you know everything before writing a single line of code',
      'Reading an entire dictionary of computer terms alone',
      'Only practicing if you get 100% on math tests',
    ],
    answer: 0,
  },
];

export const SNAKE_CHALLENGES = CODE_CHALLENGES;

export const shuffle = (list) => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};